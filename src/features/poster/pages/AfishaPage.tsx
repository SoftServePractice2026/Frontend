import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MovieCard } from "../components/MovieCard";
import { SearchBar } from "../components/SearchBar";
import { FiltersPanel } from "../components/FiltersPanel";
import { getMovies, type MovieListItemDto } from "../api/moviesApi";
import { mapMovieToCard } from "../mappers/mapMovieToCard";
import { getGenres, type GenreDto } from "../types/genresApi";

type UiDate = { d: string; day: string; w: string; isToday: boolean };

const pad2 = (n: number) => String(n).padStart(2, "0");
const toLocalYmd = (date: Date) =>
    `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

const isoDay = (x?: string | null) => (x ? x.slice(0, 10) : undefined);

const generateDates = (): UiDate[] => {
    const today = new Date();
    const ukrainianDays = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];

    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        return {
            d: toLocalYmd(date),
            day: String(date.getDate()),
            w: ukrainianDays[date.getDay()],
            isToday: i === 0,
        };
    });
};

export const DATES = generateDates();

export default function AfishaPage() {
    const [query, setQuery] = useState("");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(DATES[0]?.d ?? null);

    const [genresFromApi, setGenresFromApi] = useState<GenreDto[]>([]);
    const [apiMovies, setApiMovies] = useState<MovieListItemDto[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const onGenreToggle = (id: string) => {
        setSelectedGenreIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const onClearGenres = () => setSelectedGenreIds([]);

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

    const movies = useMemo(() => {
        const q = query.trim().toLowerCase();
        const day = selectedDate ?? DATES[0]?.d;
        if (!day) return [];

        return apiMovies
            .filter((m) => {
                const matchesQuery = !q || (m.title ?? "").toLowerCase().includes(q);
                const start = isoDay(m.rentalStart);
                const end = isoDay(m.rentalEnd);
                const matchesDay = start && end ? start <= day && day <= end : false;

                const matchesGenres =
                    selectedGenreIds.length === 0 ||
                    (m.genreIds ?? []).some((id) => selectedGenreIds.includes(String(id)));

                return matchesQuery && matchesDay && matchesGenres;
            })
            .map(mapMovieToCard);
    }, [apiMovies, query, selectedDate, selectedGenreIds]);

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
                        onGenreToggle={onGenreToggle}
                        onClearGenres={onClearGenres}
                        dates={DATES}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                )}

                {isLoading ? <div className="py-6">Loading...</div> : null}
                {loadError ? <div className="py-6">{loadError}</div> : null}

                {!isLoading && !loadError && movies.length === 0 ? (
                    <div className="py-6 text-sm text-black/60 dark:text-white/70">
                        Немає фільмів на обрану дату з такими фільтрами.
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