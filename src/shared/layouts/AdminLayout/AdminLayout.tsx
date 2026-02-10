import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { ProfileDropdown } from "@/features/admin/components/ProfileDropdown.tsx";
import { useAuth } from "@/app/providers/AuthProvider";
import adminLogo from "../../../assets/images/logoAdmin.png";
import Logo from "@/assets/svg/components/Logo";

const AdminLayout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navItems = [
        {
            label: "Сеанси",
            path: "/admin",
            active: pathname === "/admin" || pathname.startsWith("/admin/hall") || pathname.startsWith("/admin/session")
        },
        { label: "Афіша", path: "/admin/posters", active: pathname === "/admin/posters" },
        { label: "Скоро у кіно", path: "/admin/coming-soon", active: pathname === "/admin/coming-soon" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#0A0A0F] text-white font-sans">
            <header className="h-20 border-b border-gray-800 flex items-center justify-between px-8 bg-[#0A0A0F] z-[60] sticky top-0">

                <div className="">
                    <Link to={"/"} className="flex items-center group">
                        <Logo className={clsx(
                            "text-secondary-light dark:text-secondary-dark",
                            "mr-1 sm:mr-3 w-12 h-12 transition-transform group-hover:scale-110"
                        )} />
                        <p className="text-primary-light dark:text-primary-dark font-bebasNeue font-normal uppercase tracking-[-0.6px] text-4xl">cine</p>
                        <p className="text-secondary-light dark:text-secondary-dark font-bebasNeue font-normal uppercase tracking-[-0.6px] text-4xl">verse</p>
                    </Link>
                </div>

                <div className="relative">
                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={clsx(
                            "w-10 h-10 rounded-full border-2 overflow-hidden flex items-center justify-center cursor-pointer transition-all",
                            isProfileOpen ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-[#E12E2E] hover:border-white/50"
                        )}
                    >
                        <img
                            src={adminLogo}
                            alt="Admin"
                            className="w-full h-full object-cover shadow-inner"
                        />
                    </div>
                    {isProfileOpen && (
                        <div className="absolute top-full right-0 mt-2 z-[70]">
                            <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-1">
                <aside className="w-64 border-r border-gray-800 flex flex-col justify-between py-8 bg-[#0A0A0F] sticky top-20 h-[calc(100vh-80px)]">
                    <nav className="flex flex-col">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "px-8 py-4 text-lg transition-all relative group",
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
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-[#E12E2E] hover:opacity-80 transition-opacity group"
                        >
                            <div className="w-8 h-8 border border-[#E12E2E] rounded flex items-center justify-center group-hover:bg-[#E12E2E]/10 transition-colors">
                                <span className="text-sm font-bold text-center pl-0.5">←</span>
                            </div>
                            <span className="text-lg font-medium">Вийти</span>
                        </button>
                    </div>
                </aside>

                <main className="flex-1 p-10 bg-[#07070A] overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;