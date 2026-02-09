import { Link } from "react-router-dom";
import adminLogo from "../../../assets/images/logoAdmin.png";
import { useAuth } from "@/app/providers/AuthProvider";
import { truncate } from "string-truncate";

interface ProfileDropdownProps {
    onClose: () => void;
}

export const ProfileDropdown = ({ onClose }: ProfileDropdownProps) => {
    const { user, logout } = useAuth();

    const isAdmin = user?.roles?.includes("Admin");

    return (
        <div className="absolute top-full right-0 mt-2 w-[320px] bg-[#1A1A1F] border border-[#2A2A2F] rounded-2xl shadow-2xl z-[100] overflow-hidden font-sans">
            <div className="p-5 flex items-center gap-4 bg-[#232328]/30">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-[#E12E2E]/50 shadow-sm bg-[#E12E2E]/5">
                    <span className="text-white font-bold text-xl">
                        {user?.firstName?.charAt(0) || "A"}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-lg font-semibold tracking-tight leading-tight">
                        {user ? `${user.firstName} ${user.lastName}` : "Гість"}
                    </span>
                    <span className="text-gray-400 text-xs font-light tracking-wider">
                        {truncate(user?.email || "email@example.com", 25)}
                    </span>
                </div>
            </div>

            <div className="h-[1px] bg-gray-800/50 w-full" />

            <div className="p-1">
                {isAdmin && (
                    <Link
                        to="/admin"
                        onClick={onClose}
                        className="w-full flex items-center gap-4 px-5 py-4 text-[#E12E2E] bg-[#E12E2E]/5 hover:bg-[#E12E2E]/10 transition-all rounded-xl group text-left border border-[#E12E2E]/10 mb-1"
                    >
                        <div className="w-6 h-6 flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/>
                            </svg>
                        </div>
                        <span className="text-base font-bold uppercase tracking-tight">Адмін панель</span>
                    </Link>
                )}

                <Link
                    to="/profile"
                    onClick={onClose}
                    className="w-full flex items-center gap-4 px-5 py-4 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-xl group text-left"
                >
                    <div className="w-6 h-6 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                    </div>
                    <span className="text-base font-normal">Особистий кабінет</span>
                </Link>

                <Link
                    to="/"
                    onClick={onClose}
                    className="w-full flex items-center gap-4 px-5 py-4 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-xl group text-left"
                >
                    <div className="w-6 h-6 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>
                        </svg>
                    </div>
                    <span className="text-base font-normal">Головне меню</span>
                </Link>
            </div>

            <div className="p-1 border-t border-gray-800/50">
                <button
                    onClick={() => {
                        logout();
                        onClose();
                    }}
                    className="w-full flex items-center gap-4 px-5 py-4 text-[#E12E2E]/80 hover:text-[#E12E2E] hover:bg-[#E12E2E]/5 transition-all rounded-xl group text-left"
                >
                    <div className="w-6 h-6 flex items-center justify-center font-bold text-xl group-hover:-translate-x-1 transition-transform text-[#E12E2E]">
                        ←
                    </div>
                    <span className="text-base font-medium">Вийти</span>
                </button>
            </div>
        </div>
    );
};