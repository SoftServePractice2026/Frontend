import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const Input = ({
    id,
    label,
    placeholder,
    labelClassName,
    inputClassName,
    error,
    ...props
}: InputProps) => {
    return (
        <>
            <div className="flex flex-col">
                {/* { Label } */}
                {label && (
                    <label htmlFor={id} className={clsx(
                        "text-primary-light/50 dark:text-primary-dark/50",
                        "font-montserrat font-normal text-base md:text-xl tracking-tight mb-1",
                        labelClassName
                    )}>{label}</label>
                )}

                {/* { Input } */}
                <input
                    id={id}
                    placeholder={placeholder}
                    className={clsx(
                        "rounded-xl bg-primary-light/5 dark:bg-primary-dark/5", 
                        "h-[39px] py-[10px] pl-[10px]",
                        "font-montserrat font-normal text-base tracking-tight",
                        "min-w-[200px]",
                        "text-primary-light dark:text-primary-dark/40",
                        "placeholder:text-primary-light dark:placeholder:text-primary-dark/40",
                        inputClassName
                    )}
                    {...props}
                />

                {/* { Error } */}
                {error && (
                    <span className={clsx(
                        "font-montserrat tracking-tight",
                        "text-secondary-light/80 dark:text-secondary-dark/80"
                    )}>{error}</span>
                )}
            </div>
        </>
    );
}

export default Input;