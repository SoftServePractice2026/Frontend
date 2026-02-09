import { useEffect, useMemo, useState, useCallback } from "react";
import clsx from "clsx";
import { MovieCard } from "@/features/poster/components/MovieCard";
import { SearchBar } from "@/features/poster/components/SearchBar";
import { FiltersPanel } from "@/features/poster/components/FiltersPanel";
import { getMovies, type MovieListItemDto } from "@/features/poster/api/moviesApi";
import { mapMovieToCard } from "@/features/poster/mappers/mapMovieToCard";
import { getGenres, type GenreDto } from "@/features/poster/types/genresApi";


type UiDate = { d: string; day: string; w: string; isToday: boolean };

const pad2 = (n: number) => String(n).padStart(2, "0");
const toLocalYmd = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const addDays = (d: Date, days: number) => {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
};

const generateDates = (base = new Date()): UiDate[] => {
    const ukrainianDays = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];
    const dates: UiDate[] = [];
    const start = addDays(base, 6);
    for (let i = 0; i < 7; i++) {
        const date = addDays(start, i);
        dates.push({
            d: toLocalYmd(date),
            day: String(date.getDate()),
            w: ukrainianDays[date.getDay()],
            isToday: i === 0,
        });
    }
    return dates;
};

export default function ComingSoonPage() {
    const [query, setQuery] = useState("");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [genresFromApi, setGenresFromApi] = useState<GenreDto[]>([]);
    const [apiMovies, setApiMovies] = useState<MovieListItemDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const dates = useMemo(() => generateDates(), []);

    useEffect(() => {
        if (selectedDate === null && dates[0]?.d) {
            setSelectedDate(dates[0].d);
        }
    }, [dates, selectedDate]);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const data = await getGenres();
                if (!mounted) return;
                setGenresFromApi(data);
            } catch (e) {
                console.error("genres load error", e);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);


    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setIsLoading(true);
                setLoadError(null);

                const data = await getMovies({
                    pageNumber: 1,
                    pageSize: 29,
                    searchQuery: query.trim() ? query.trim() : undefined,
                });

                if (!mounted) return;
                setApiMovies(data);
            } catch (e) {
                console.error("movies load error", e);
                if (!mounted) return;
                setLoadError("Не вдалося завантажити афішу");
            } finally {
                if (mounted) setIsLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [query]);


    const handleGenreToggle = useCallback((id: string) => {
        setSelectedGenreIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    }, []);

    const handleClearGenres = useCallback(() => {
        setSelectedGenreIds([]);
    }, []);

    const movies = useMemo(() => {
        const q = query.trim().toLowerCase();
        const targetIso = selectedDate ?? dates[0]?.d;

        if (!targetIso) return [];

        console.log("Обрана дата для фільтрації:", targetIso);
        console.log("Доступні дати початку прокату:", apiMovies.map(m => m.rentalStart?.slice(0, 10)));

        return apiMovies
            .filter((m) => {
                const matchesQuery = !q || (m.title ?? "").toLowerCase().includes(q);
                const rentalStartDate = m.rentalStart?.slice(0, 10);
                if (!rentalStartDate) return false;
                const movieStartDate = new Date(rentalStartDate + "T00:00:00");

                if (selectedDate) {
                    return matchesQuery && rentalStartDate === selectedDate;
                }

                const today = new Date();
                const sixDaysFromNow = addDays(today, 6);
                sixDaysFromNow.setHours(0, 0, 0, 0);

                return matchesQuery && movieStartDate >= sixDaysFromNow;
            })
            .filter((m) => {
                if (selectedGenreIds.length === 0) return true;

                return (m.genreIds ?? []).some((id) =>
                    selectedGenreIds.includes(String(id))
                );
            })
            .map(mapMovieToCard);
    }, [apiMovies, query, selectedGenreIds, selectedDate, dates]);

    return (
        <div className={clsx("h-full overflow-y-auto")}>
            <div className={clsx("w-full px-4 sm:px-8 py-6 sm:py-8 max-w-6xl mx-auto")}>
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    isFiltersOpen={isFiltersOpen}
                    setIsFiltersOpen={setIsFiltersOpen}
                />

                {isFiltersOpen && (
                    <FiltersPanel
                        genres={genresFromApi}
                        selectedGenreIds={selectedGenreIds}
                        onGenreToggle={handleGenreToggle}
                        onClearGenres={handleClearGenres}
                        dates={dates}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                )}

                {isLoading ? <div className="py-6">Loading...</div> : null}
                {loadError ? <div className="py-6">{loadError}</div> : null}

                {!isLoading && !loadError && movies.length === 0 ? (
                    <div className="py-6 text-sm text-black/60 dark:text-white/70">
                        {selectedDate
                            ? `Немає фільмів, що стартують ${selectedDate}`
                            : "Немає фільмів, що стартують через 6 днів"
                        }
                    </div>
                ) : null}

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}