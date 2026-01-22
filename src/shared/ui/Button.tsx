import clsx from "clsx";
import type { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => {
    return (
        <button type="button" className={clsx(
            "dark:text-button-dark",
            "dark:hover:text-secondary-dark dark:hover:border-secondary-dark/50",
            "dark:bg-primary-dark/10",
            "border dark:border-primary-dark/20",
            "rounded-xl p-[10px]",
            "transition transition-color",
            "font-montserrat font-normal"
        )}>
            {children}
        </button>
    );
}

export default Button;