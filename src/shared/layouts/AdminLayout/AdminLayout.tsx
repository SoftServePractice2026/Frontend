import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { ProfileDropdown } from "@/features/admin/components/ProfileDropdown.tsx";

// 1. Імпортуємо твій логотип адміністратора
import adminLogo from "../../../assets/images/logoAdmin.png";

const AdminLayout = () => {
    const { pathname } = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navItems = [
        { label: "Сеанси", path: "/admin", active: pathname === "/admin" || pathname.includes("/admin/hall") || pathname.includes("/admin/session") },
        { label: "Афіша", path: "/admin/posters", active: pathname === "/admin/posters" },
        { label: "Скоро у кіно", path: "/admin/coming-soon", active: pathname === "/admin/coming-soon" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#0A0A0F] text-white font-sans">
            <header className="h-20 border-b border-gray-800 flex items-center justify-between px-8 bg-[#0A0A0F] z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#E12E2E] p-1.5 rounded-md flex items-center justify-center">
                        <svg width="24" height="20" viewBox="0 0 24 20" fill="white">
                            <path d="M22 0H2V4H4V2H20V4H22V0ZM2 6H0V20H24V6H22V8H20V6H4V8H2V6ZM22 18H2V10H22V18Z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold tracking-tighter uppercase">
                        CINE<span className="border border-white px-1 ml-0.5">VERSE</span>
                    </span>
                </div>
                <div className="relative">
                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={clsx(
                            "w-10 h-10 rounded-full border-2 overflow-hidden flex items-center justify-center cursor-pointer transition-all",
                            isProfileOpen ? "border-white" : "border-[#E12E2E] hover:border-white/50"
                        )}
                    >
                        <img
                            src={adminLogo}
                            alt="Admin"
                            className="w-full h-full object-cover shadow-inner"
                        />
                    </div>
                    {isProfileOpen && (
                        <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
                    )}
                </div>
            </header>

            <div className="flex flex-1">
                <aside className="w-64 border-r border-gray-800 flex flex-col justify-between py-8 bg-[#0A0A0F]">
                    <nav className="flex flex-col">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "px-8 py-4 text-lg transition-all relative",
                                    item.active
                                        ? "text-[#E12E2E] border-l-4 border-[#E12E2E] bg-gradient-to-r from-[#E12E2E]/10 to-transparent font-medium"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="px-8 mt-auto">
                        <button className="flex items-center gap-3 text-[#E12E2E] hover:opacity-80 transition-opacity group">
                            <div className="w-8 h-8 border border-[#E12E2E] rounded flex items-center justify-center group-hover:bg-[#E12E2E]/10 transition-colors">
                                <span className="text-sm font-bold text-center pl-0.5">←</span>
                            </div>
                            <span className="text-lg font-medium">Вийти</span>
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-10 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;