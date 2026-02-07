import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MovieCard } from "../components/MovieCard";
import { SearchBar } from "../components/SearchBar";
import { FiltersPanel } from "../components/FiltersPanel";
import { getMovies } from "../api/moviesApi";
import { mapMovieToCard } from "../mappers/mapMovieToCard";
import type { MovieListItemDto } from "../api/moviesApi";


const GENRES = [
    "Всі", "Екшн", "Комедія", "Драма", "Фантастика",
    "Анімація", "Пригоди", "Біографія", "Історія", "Фентезі",
];


const pad2 = (n: number) => String(n).padStart(2, "0");
const toLocalYmd = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const generateDates = () => {
    const dates: { d: string; day: string; w: string; isToday: boolean }[] = [];
    const today = new Date();
    const ukrainianDays = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push({
            d: toLocalYmd(date),
            day: String(date.getDate()),
            w: ukrainianDays[date.getDay()],
            isToday: i === 0,
        });
    }
    return dates;
};

export const DATES = generateDates();
const isoDay = (x?: string | null) => (x ? x.slice(0, 10) : undefined);


export default function AfishaPage() {
    const [query, setQuery] = useState("");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(DATES[0]?.d ?? null);
    const [apiMovies, setApiMovies] = useState<MovieListItemDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setIsLoading(true);
                setLoadError(null);

                const data = await getMovies({
                    pageNumber: 1,
                    pageSize: 20,
                    searchQuery: query.trim() ? query.trim() : undefined,
                });
                console.log("movies raw:", data);
                console.log("isArray:", Array.isArray(data), "len:", Array.isArray(data) ? data.length : "n/a");

                if (!mounted) return;
                setApiMovies(data);
            } catch {
                if (!mounted) return;
                setLoadError("Не вдалося завантажити афішу");
            } finally {
                if (mounted) setIsLoading(false);
            }
        })();

        return () => {mounted = false;};
    }, [query]);


    const handleGenreSelect = (genre: string) => {
        if (genre === "Всі") {
            setSelectedGenres([]);
            return;
        }
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]);
    };


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
                return matchesQuery && matchesDay;
            })
            .map(mapMovieToCard);
    }, [apiMovies, query, selectedDate]);


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
                        dates={DATES}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                )}


                {isLoading ? <div className="py-6">Loading...</div> : null}
                {loadError ? <div className="py-6">{loadError}</div> : null}


                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>


            </div>
        </div>
    );
}
