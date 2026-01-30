import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SubmitButton = ({
    children,
    onClick,
    className,
    ...props
}: SubmitButtonProps) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className={clsx(
                "text-accent-light_second dark:text-accent-dark_second",
                "hover:text-accent-light_second/50 dark:hover:text-accent-dark_second/50",
                "hover:border-accent-light_second/50 dark:hover:border-accent-dark_second/50",
                "bg-accent-light_second/25 dark:bg-accent-dark_second/[15%]",
                "border border-accent-light_second dark:border-accent-dark_second",
                "rounded-xl p-[10px]",
                "transition transition-colors",
                "font-montserrat font-normal",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export default SubmitButton;