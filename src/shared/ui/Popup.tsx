import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type PopupType = "success" | "error" | "warning";

type PopupProps = {
    open: boolean;
    type: PopupType;
    title?: string;
    message: string;
    autoCloseMs?: number;
    onClose: () => void;
    redirect?: string;
    redirectParams?: URLSearchParams;
};

export const Popup = ({
    open,
    type,
    title,
    message,
    autoCloseMs = 3000,
    onClose,
    redirect,
    redirectParams
}: PopupProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!open) return;

        const timer = setTimeout(onClose, autoCloseMs);
        return () => {
            clearTimeout(timer);
            if (redirect != null && type == "success") {
                navigate({
                    pathname: redirect,
                    search: redirectParams?.toString()
                });
            }
        };
    }, [open, autoCloseMs, onClose]);

    if (!open) return null;

    const styles = {
        success: "border-green-500 bg-green-50 text-green-800",
        error: "border-red-500 bg-red-50 text-red-800",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-800",
    };

    const icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* overlay */}
            <div
                className={clsx(
                    "absolute inset-0 bg-black/40 animate-fadeIn"
                )}
                onClick={onClose}
            />

            {/* modal */}
            <div
                className={clsx(
                    "relative z-10 w-[340px] rounded-xl border-l-4 p-5 shadow-xl",
                    "animate-popup",
                    "bg-primary-light dark:bg-primary-dark",
                    styles[type]
                )}
            >
                <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
                    <span>{icons[type]}</span>
                    <span>{title ?? type.toUpperCase()}</span>
                </div>

                <p className="text-sm">{message}</p>

                <button
                    onClick={onClose}
                    className="mt-4 w-full rounded bg-black/10 py-2 text-sm hover:bg-black/20"
                >
                    OK
                </button>
            </div>
        </div>
    );
};