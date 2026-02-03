import { useMemo, useState } from "react";
import clsx from "clsx";
import { MovieCard } from "../components/MovieCard";
import { SearchBar } from "../components/SearchBar";
import { FiltersPanel } from "../components/FiltersPanel";
import {
    mockMovies,
} from "../mockData";


const GENRES = [
    "Всі", "Екшн", "Комедія", "Драма", "Фантастика",
    "Анімація", "Пригоди", "Біографія", "Історія", "Фентезі"
];



const generateDates = () => {
    const dates = [];
    const today = new Date();
    const ukrainianDays = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push({
            d: date.toISOString().split('T')[0],
            day: date.getDate().toString(),
            w: ukrainianDays[date.getDay()],
            isToday: i === 0
        });
    }
    return dates;
};

export const DATES = generateDates();

export default function AfishaPage() {
    const [query, setQuery] = useState("");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(DATES[0]?.d ?? null);

    const handleGenreSelect = (genre: string) => {
        if (genre === "Всі") {
            setSelectedGenres([]);
            return;
        }
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const movies = useMemo(() => {
        const q = query.trim().toLowerCase();
        return mockMovies.filter((m) => {
            const matchesQuery = !q || m.title.toLowerCase().includes(q);
            return matchesQuery;
        });
    }, [query, selectedGenres, selectedDate]);


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

                <div className={clsx("grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5")}>
                    {movies.map((m) => (
                        <MovieCard key={m.id} {...m} />
                    ))}
                </div>
            </div>
        </div>
    );
}