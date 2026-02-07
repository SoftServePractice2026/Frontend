import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MovieCard } from "@/features/poster/components/MovieCard";
import { SearchBar } from "@/features/poster/components/SearchBar";
import { FiltersPanel } from "@/features/poster/components/FiltersPanel";
import { getMovies, type MovieListItemDto } from "@/features/poster/api/moviesApi";
import { mapMovieToCard } from "@/features/poster/mappers/mapMovieToCard";


const GENRES = [
    "Всі", "Екшн", "Комедія", "Драма", "Фантастика", "Анімація", "Пригоди", "Біографія", "Історія", "Фентезі"];

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
    const start = addDays(new Date(base.getFullYear(), base.getMonth(), base.getDate()), 6);

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
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const [apiMovies, setApiMovies] = useState<MovieListItemDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const dates = useMemo(() => generateDates(), []);
    useEffect(() => {
        if (selectedDate == null) setSelectedDate(dates[0]?.d ?? null);
    }, [dates]);

    useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                setIsLoading(true);
                setLoadError(null);

                const q = query.trim();
                const data = await getMovies({
                    pageNumber: 1,
                    pageSize: 29,
                    searchQuery: q ? q : undefined,
                });
                if (!active) return;
                setApiMovies(data);
            } catch {
                if (!active) return;
                setLoadError("Could not load coming soon page");
            } finally {
                if (active) setIsLoading(false);
            }
        };
        load();
        return () => {
            active = false;
        };
    }, [query]);

    const handleGenreSelect = (genre: string) => {
        if (genre === "Всі") {
            setSelectedGenres([]);
            return;
        }
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const movies = useMemo(() => {
        const q = query.trim().toLowerCase();
        const now = new Date();
        const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const fallbackTargetIso = toLocalYmd(addDays(today0, 6));
        const targetIso = selectedDate ?? fallbackTargetIso;
        console.log("targetIso:", targetIso);
        console.log("rentalStarts:", apiMovies.map(m => m.rentalStart?.slice(0, 10)));
        return apiMovies

            .filter((m) => {
                const matchesQuery = !q || (m.title ?? "").toLowerCase().includes(q);
                const rsIso = m.rentalStart?.slice(0, 10);
                if (!rsIso) return false;

                const now = new Date();
                const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const from = addDays(today0, 6).getTime();
                const t = new Date(rsIso + "T00:00:00").getTime();
                const matchesComingSoon = t >= from;
                return matchesQuery && matchesComingSoon;
            })
            .map(mapMovieToCard)
            .filter((vm) => {
                if (selectedGenres.length === 0) return true;
                return selectedGenres.some((g) =>
                    (vm.meta ?? "").toLowerCase().includes(g.toLowerCase())
                );
            });
    }, [apiMovies, query, selectedGenres, selectedDate]);

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
                        genres={GENRES}
                        selectedGenres={selectedGenres}
                        onGenreSelect={handleGenreSelect}
                        dates={dates}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                )}

                {isLoading ? <div className="py-6">Loading...</div> : null}
                {loadError ? <div className="py-6">{loadError}</div> : null}

                {!isLoading && !loadError && movies.length === 0 ? (
                    <div className="py-6 text-sm text-black/60 dark:text-white/70">
                        Немає фільмів, що стартують через 6 днів або на обрану дату
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
