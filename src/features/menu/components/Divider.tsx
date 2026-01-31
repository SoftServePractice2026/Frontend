import clsx from "clsx"

interface DividerProps {
    className?: string;
}

export function Divider({ className }: DividerProps) {
    return <div className={clsx("border-t border-stone-150 dark:border-neutral-700", className)}/>
}