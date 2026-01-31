import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
    children,
    onClick,
    className,
}: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                "text-button-light dark:text-button-dark",
                "hover:text-secondary-light dark:hover:text-secondary-dark", 
                "hover:border-secondary-light/50 dark:hover:border-secondary-dark/50",
                "bg-primary-dark/25 dark:bg-primary-dark/10",
                "border border-primary-light/20 dark:border-primary-dark/20",
                "rounded-xl p-[10px]",
                "transition transition-colors",
                "font-montserrat font-normal",
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;