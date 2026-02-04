import clsx from "clsx";

type FiltersPanelProps = {
    genres: string[];
    selectedGenres: string[];
    onGenreSelect: (genre: string) => void;
    dates: { d: string; day: string; w: string; isToday: boolean }[];
    selectedDate: string | null;
    setSelectedDate: (date: string | null) => void;
};

export const FiltersPanel = ({
                                 genres,
                                 selectedGenres,
                                 onGenreSelect,
                                 dates,
                                 selectedDate,
                                 setSelectedDate,
                             }: FiltersPanelProps) => {
    return (
        <div
            className={clsx(
                "mb-6 rounded-2xl border p-4 sm:p-5",
                "bg-primary-dark/5 border-primary-light/10",
                "dark:bg-primary-dark/10 dark:border-primary-dark/10"
            )}
        >
            {/* Genres */}
            <div className="mb-4">
                <div
                    className={clsx(
                        "text-xs mb-2",
                        "text-description-light",
                        "dark:text-description-dark"
                    )}
                >
                    Жанри
                </div>

                <div className="flex flex-wrap gap-2">
                    {genres.map((g) => {
                        const isActive =
                            g === "Всі" ? selectedGenres.length === 0 : selectedGenres.includes(g);

                        return (
                            <button
                                key={g}
                                onClick={() => onGenreSelect(g)}
                                className={clsx(
                                    "px-3 py-1.5 rounded-full text-xs border transition",
                                    isActive
                                        ? clsx(
                                            "bg-secondary-light text-white border-secondary-light/60",
                                            "shadow-sm shadow-secondary-light/20"
                                        )

                                        : clsx(
                                            "bg-transparent",
                                            "border-primary-light/10 text-description-light hover:text-primary-light hover:border-primary-light/20",
                                            "dark:border-primary-dark/10 dark:text-description-dark dark:hover:text-primary-dark dark:hover:border-primary-dark/20"

                                        )
                                )}>

                                {g}
                            </button>
                        );
                    })}
                </div>
            </div>


            {/* Dates */}
            <div>
                <div
                    className={clsx(
                        "text-xs mb-2",
                        "text-primary-light",
                        "text-primary-dark"
                    )}
                >
                    Дата
                </div>


                <div className="flex gap-2 overflow-x-auto pb-1">
                    {dates.map((x) => {
                        const isActive = selectedDate === x.d;

                        return (
                            <button
                                key={x.d}
                                onClick={() => setSelectedDate(x.d)}
                                className={clsx(
                                    "min-w-[52px] px-2 py-2 rounded-xl border text-center transition",
                                    isActive
                                        ? clsx(
                                            "border-accent-red bg-accent-light/5 text-black",
                                            "dark:border-accent-dark_second bg-accent-light/10 dark:text-white"
                                        )

                                        : clsx(
                                            "bg-transparent",
                                            "border-black/10 text-black/70 hover:text-black hover:border-black/20",
                                            "dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:hover:border-white/20"
                                        )
                                )}>
                                <div className="text-base font-semibold">{x.day}</div>
                                <div className={clsx("text-[10px] uppercase", "opacity-70")}>{x.w}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
