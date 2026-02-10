import { Link } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { truncate } from "string-truncate";
import clsx from "clsx";

interface ProfileDropdownProps {
    onClose: () => void;
}

export const ProfileDropdown = ({ onClose }: ProfileDropdownProps) => {
    const { user, logout } = useAuth();
    const isAdmin = user?.roles?.includes("Admin");

    return (
        <div className="absolute top-full right-0 mt-2 w-[300px] bg-white dark:bg-[#1A1A1F] border border-gray-200 dark:border-[#2A2A2F] rounded-2xl shadow-2xl z-[100] overflow-hidden font-sans">
            <div className="p-6 flex items-center gap-5 bg-gray-50 dark:bg-[#232328]/30">
                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center border-2 border-accent-red/60 bg-accent-red/10">
                    <span className="text-gray-800 dark:text-white font-bold text-2xl uppercase">
                        {user?.firstName?.charAt(0) || "U"}
                    </span>
                </div>

                <div className="flex flex-col">
                    <span className="text-primary-light dark:text-primary-dark text-xl font-semibold tracking-tight leading-tight">
                        {user ? `${user.firstName} ${user.lastName}` : "Гість"}
                    </span>
                    <span className="text-description-light dark:text-description-dark text-sm font-light tracking-wider mt-1">
                        {truncate(user?.email || "email@cinema.com", 25)}
                    </span>
                </div>
            </div>

            <div className="h-[1px] bg-gray-200 dark:bg-gray-800/50 w-full" />


            <div className="p-2">
                {isAdmin && (
                    <Link
                        to="/admin"
                        onClick={onClose}
                        className={clsx(
                            "w-full flex items-center gap-4 px-5 py-4",
                            "text-accent-red bg-accent-red/5 hover:bg-accent-red/10",
                            "transition-all rounded-xl group text-left",
                            "border border-accent-red/10 mb-1"
                        )}
                    >
                        <div className="w-7 h-7 flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/>
                            </svg>
                        </div>
                        <span className="text-base font-bold uppercase tracking-tight">Адмін панель</span>
                    </Link>
                )}


                <Link
                    to="/profile"
                    onClick={onClose}
                    className={clsx(
                        "w-full flex items-center gap-4 px-5 py-4",
                        "text-description-light dark:text-description-dark",
                        "hover:text-primary-light dark:hover:text-primary-dark",
                        "hover:bg-gray-100 dark:hover:bg-white/5",
                        "transition-all rounded-xl group text-left"
                    )}
                >
                    <svg className="w-5 h-5 opacity-90" viewBox="0 0 24 24" aria-hidden="true">
                        <image href="/person.svg" width="24" height="24"/>
                    </svg>
                    <span className="text-base font-normal">Особистий кабінет</span>
                </Link>


                <Link
                    to="/tickets"
                    onClick={onClose}
                    className={clsx(
                        "w-full flex items-center gap-4 px-5 py-4",
                        "text-description-light dark:text-description-dark",
                        "hover:text-primary-light dark:hover:text-primary-dark",
                        "hover:bg-gray-100 dark:hover:bg-white/5",
                        "transition-all rounded-xl group text-left"
                    )}
                >
                    <div
                        className="w-7 h-7 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 opacity-90" viewBox="0 0 24 24" aria-hidden="true">
                            <image href="/ticket.svg" width="24" height="24"/>
                        </svg>
                    </div>
                    <span className="text-base font-normal">Мої квитки</span>
                </Link>


                <Link
                    to="/favorites"
                    onClick={onClose}
                    className={clsx(
                        "w-full flex items-center gap-4 px-5 py-4",
                        "text-description-light dark:text-description-dark",
                        "hover:text-primary-light dark:hover:text-primary-dark",
                        "hover:bg-gray-100 dark:hover:bg-white/5",
                        "transition-all rounded-xl group text-left"
                    )}
                >
                    <div
                        className="w-7 h-7 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 opacity-90" viewBox="0 0 24 24" aria-hidden="true">
                            <image href="/heart.svg" width="24" height="24"/>
                        </svg>
                    </div>
                    <span className="text-base font-normal">Обране</span>
                </Link>
            </div>


            <div className="p-2 border-t border-gray-200 dark:border-gray-800/50">
                <button
                    onClick={() => {
                        logout();
                        onClose();
                    }}
                    className={clsx(
                        "w-full flex items-center gap-4 px-5 py-4",
                        "text-accent-red/80 hover:text-accent-red",
                        "hover:bg-accent-red/5 transition-all rounded-xl group text-left"
                    )}
                >
                    <div className="w-7 h-7 flex items-center justify-center font-bold text-2xl group-hover:-translate-x-1 transition-transform text-accent-red">
                        ←
                    </div>
                    <span className="text-base font-medium">Вийти</span>
                </button>
            </div>
        </div>
    );
};