import { useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import type { Theme } from "../model/types";
import clsx from "clsx";

const themes: Theme[] = ["light", "dark"];

export function ThemeDropdown() {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);

    const handleSelect = (theme: Theme) => {
        setTheme(theme);
        setOpen(false);
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((p) => !p)}
                className={clsx(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "dark:text-primary-dark"
                )}
            >
                <span>Тема</span>
                <span className="text-xs text-gray-500 capitalize">{theme}</span>
            </button>

            {open && (
                <div
                    className={clsx(
                        "absolute left-full top-0 ml-2 w-32 rounded-md border shadow-md",
                        "bg-white dark:bg-gray-900 dark:border-gray-700"
                    )}
                >
                    {themes.map((t) => (
                        <button
                            key={t}
                            onClick={() => { handleSelect(t) }}
                            className={clsx(
                                "w-full px-3 py-2 capitalize",
                                "text-left text-sm",
                                "hover:bg-gray-100 dark:hover:bg-gray-800",
                                theme === t ? 
                                    "font-semibold text-accent-light dark:text-accent-dark" :
                                    "dark:text-primary-dark"
                            )}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}