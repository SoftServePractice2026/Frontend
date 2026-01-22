import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    const sizeClasses = {
        sm: {
            wrapper: "w-36 h-16 p-1",
            knob: "w-14 h-14",
            knobOffset: "calc(100% - 3.5rem)",
        }
    };

    return (
        <>
            <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={clsx(
                    "relative rounded-full",
                    "transition-colors duration-700",
                    "bg-slate-950 dark:bg-slate-200",
                    sizeClasses.sm.wrapper,
                )}
            >
                {/* slider */}
                <div
                    className={clsx(
                        "relative rounded-full",
                        "transition-all duration-700",
                        isDark
                            ? "ml-0 bg-gray-100 shadow-[0_0_100px_rgba(255,255,255,1)]"
                            : `ml-[${sizeClasses.sm.knobOffset}] bg-yellow-300 shadow-[0_0_100px_rgba(249,240,104,1)]`,
                        sizeClasses.sm.knob,
                    )}
                >
                    {/* moon craters */}
                    <div
                        className={clsx(
                            "absolute bg-gray-300/50 rounded-full transition-opacity duration-500",
                            isDark ? "opacity-100" : "opacity-0",
                            "top-12 left-5 h-3 w-3"
                        )}
                    />
                    <div
                        className={clsx(
                            "absolute bg-gray-300/50 rounded-full transition-opacity duration-500",
                            isDark ? "opacity-100" : "opacity-0",
                            "top-14 left-10 h-3 w-3"
                        )}
                    />
                    <div
                        className={clsx(
                            "absolute bg-gray-300/50 rounded-full transition-opacity duration-500",
                            isDark ? "opacity-100" : "opacity-0",
                            "top-6 left-10 h-5 w-5"
                        )}
                    />
                </div>
            </button>
        </>);
}
