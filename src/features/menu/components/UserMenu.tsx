import { useRef, useState } from "react";
import clsx from "clsx";
import Button from "@/shared/ui/Button";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import type { MenuView } from "../types";
import { MainMenu } from "./MainMenu";
import { ThemeMenu } from "./ThemeMenu";

export function UserMenu() {
    const [menuView, setMenuView] = useState<MenuView>(null);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setMenuView(null));

    const itemOnMenuClassName = clsx(
        "flex w-full items-center justify-between px-3 py-2 text-sm",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "dark:text-primary-dark"
    );

    return (
        <div className="relative" ref={ref}>
            <Button onClick={() => setMenuView((v) => (v ? null : "main"))}>
                Меню
            </Button>

            {menuView && (
                <div className="absolute right-0 mt-2 w-48 border shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700">
                    {menuView === "main" && (
                        <MainMenu
                            itemOnMenuClassName={itemOnMenuClassName}
                            onThemeClick={() => setMenuView("theme")}
                        />
                    )}

                    {menuView === "theme" && (
                        <ThemeMenu onBack={() => setMenuView("main")} />
                    )}
                </div>
            )}
        </div>
    );
}