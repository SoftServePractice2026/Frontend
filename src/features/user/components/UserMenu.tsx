import { useRef, useState } from "react";
import clsx from "clsx";
import { ThemeDropdown } from "@/features/theme/components/ThemeDropdown";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import Button from "@/shared/ui/Button";

export function UserMenu() {

    const [isActiveMenuButton, setIsActiveMenuButton] = useState(false);
    const [open, setOpen] = useState(false);
    const refMenu = useRef<HTMLDivElement>(null);

    useClickOutside(refMenu, () => {
        setOpen(false);
        setIsActiveMenuButton(false);
    });

    const handleMenuClick = () => {
        setIsActiveMenuButton((prev) => !prev);
        setOpen((p) => !p)
    }

    return (
        <div className="relative" ref={refMenu}>
            <Button onClick={handleMenuClick} className={clsx(
                isActiveMenuButton ?
                    "text-secondary-light dark:text-secondary-dark border-secondary-light/50 dark:border-secondary-dark/50" :
                    "text-button-light dark:text-button-dark border-primary-light/20 dark:border-primary-dark/20"
            )}>Меню</Button>

            {open && (
                <div
                    className={clsx(
                        "absolute right-0 mt-2 w-40 rounded-md border shadow-lg",
                        "bg-white dark:bg-gray-900 dark:border-gray-700"
                    )}
                >
                    <ThemeDropdown />
                </div>
            )}
        </div>
    );
}