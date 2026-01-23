import clsx from "clsx";
import { useTheme } from "@/app/providers/ThemeProvider";
import type { Theme } from "../types";

const themes: Theme[] = ["light", "dark"];

export function ThemeMenu({ onBack }: { onBack: () => void }) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex items-center gap-2 px-3 py-2 border-b dark:border-neutral-700">
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Назад
        </button>
        <span className="text-sm font-medium dark:text-primary-dark">Тема</span>
      </div>

      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={clsx(
            "w-full px-3 py-2 text-left text-sm capitalize",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            theme === t
              ? "font-semibold text-accent-light dark:text-accent-dark"
              : "dark:text-primary-dark"
          )}
        >
          {t}
        </button>
      ))}
    </>
  );
}