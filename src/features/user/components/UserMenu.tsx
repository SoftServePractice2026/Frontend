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
                    "dark:text-secondary-dark dark:border-secondary-dark/50" :
                    "dark:text-button-dark dark:border-primary-dark/20"
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