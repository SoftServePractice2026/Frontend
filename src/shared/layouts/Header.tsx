import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import clsx from "clsx";
import Logo from "@/assets/svg/components/Logo";
import { useAuth } from "@/app/providers/AuthProvider";
import Avatar from "@/assets/svg/components/Avatar";
import { truncate } from "string-truncate";
import { ProfileDropdown } from "@/features/admin/components/ProfileDropdown";
import { UserMenu } from "@/features/menu/components/UserMenu";


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, user, logout } = useAuth();

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const linkClassName = (path: string) => clsx(
        "flex items-center",
        "font-montserrat font-medium text-base leading-none text-center",
        "transition",
        location.pathname === path
            ? "text-red-500 dark:text-secondary-dark"
            : "text-primary-light dark:text-primary-dark hover:text-red-500 dark:hover:text-secondary-dark"

    );

    return (
        <header className="sticky top-0 z-[100]">
            <div className={clsx(
                "flex justify-between items-center h-[82px]",
                "px-8 md:px-24 lg:px-2 xl:px-32 2xl:px-48",
                "bg-[#1B0044]/5 dark:bg-[#12121ACC]/80 backdrop-blur-md",
                "border-b dark:border-primary-dark/10"
            )}>

                {/* { Logo } */}
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

                {/* { Nav List} */}
                <nav className={clsx(
                    "hidden lg:flex",
                    "lg:gap-4 xl:gap-8",
                )}>
                    <Link to="/afisha" className={linkClassName("/afisha")}>Афіша</Link>
                    <Link to="/coming-soon" className={linkClassName("/coming-soon")}>Скоро у кіно</Link>
                    <Link to="/" className={linkClassName("/")}>Про нас</Link>
                    <Link to="/contacts" className={linkClassName("/contacts")}>Допомога і контакти</Link>
                </nav>

                {/* { Options } */}
                <div className="flex gap-2 sm:gap-4 items-center">
                    {!isAuth ? (
                        <>
                            <Button className="hidden sm:block" onClick={() => navigate("/login")}>Увійти</Button>
                            <Button className="hidden sm:block outline-button" onClick={() => navigate("/registration")}>Зареєструватися</Button>
                        </>
                    ) : (
                        <div className="relative flex items-center gap-4">
                            {/* Блок профілю, який тепер клікабельний */}
                            <div
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all p-1.5 rounded-full hover:bg-white/5"
                            >
                                <div className="relative">
                                    <Avatar className="text-secondary-light dark:text-secondary-dark w-9 h-9 border-2 border-secondary-dark rounded-full" />
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#12121A] rounded-full"></div>
                                </div>

                                <p className="text-primary-light dark:text-primary-dark font-montserrat font-semibold text-sm hidden sm:block">
                                    {truncate(user?.firstName ?? "Гість", 12)}
                                </p>
                            </div>

                            <Button
                                className="hidden sm:block !bg-transparent border border-primary-dark/20 hover:border-secondary-dark"
                                onClick={() => logout()}
                            >
                                Вийти
                            </Button>

                            {isProfileOpen && (
                                <div className="absolute top-full right-0 mt-2">
                                    <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
                                </div>
                            )}
                        </div>
                    )}
                    <UserMenu/>
                </div>
            </div>
        </header>
    );
}

export default Header;