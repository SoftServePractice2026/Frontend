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
                "dark:text-button-dark",
                "dark:hover:text-secondary-dark dark:hover:border-secondary-dark/50",
                "dark:bg-primary-dark/10",
                "border dark:border-primary-dark/20",
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