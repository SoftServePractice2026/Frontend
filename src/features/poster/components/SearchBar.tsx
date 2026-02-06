import clsx from "clsx";
import Button from "@/shared/ui/Button.tsx";


type SearchBarProps = {
    query: string;
    setQuery: (value: string) => void;
    isFiltersOpen: boolean;
    setIsFiltersOpen: (value: boolean) => void;
};


const wrap = "flex items-center gap-3 mb-4";

const btn = "px-3 py-3 rounded-xl flex items-center";



export const SearchBar = ({ query, setQuery, isFiltersOpen, setIsFiltersOpen }: SearchBarProps) => {
    return (
        <div className={wrap}>
            <div
                className={clsx(
                    "flex-1 rounded-xl border px-4 py-3 flex items-center gap-3",
                    "bg-black/5 border-black/10",
                    "dark:bg-white/5 dark:border-white/10"
                )}
            >
                <img src="/search.svg" alt="Search" className="w-5 h-5 opacity-90"/>


                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Пошук фільму"
                    className={clsx(
                        "w-full bg-transparent outline-none",
                        "text-black placeholder:text-black/40 caret-black",
                        "dark:text-white dark:placeholder:text-white/40 dark:caret-white"
                    )}
                />
            </div>


            <Button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={clsx(btn, isFiltersOpen && "ring-1 ring-white/20")}>

                <img src="/filter.svg" alt="Filter" className="w-5 h-5 opacity-60 mr-2"/>
                Фільтри
            </Button>

        </div>
    );
};
