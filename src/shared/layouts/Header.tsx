import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import clsx from "clsx";
import Logo from "@/assets/svg/components/Logo";
import { UserMenu } from "@/features/menu/components/UserMenu";
import { useAuth } from "@/app/providers/AuthProvider";
import Avatar from "@/assets/svg/components/Avatar";
import { truncate } from "string-truncate";


const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, user, logout } = useAuth();

    console.log(user);


    const linkClassName = (path: string) => clsx(
        "flex items-center",
        "font-montserrat font-medium text-base leading-none text-center",
        "transition",
        location.pathname === path
            ? "text-secondary-light dark:text-secondary-dark"
            : "text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark"
    );

    return (
        <>
            <div className={clsx(
                "flex justify-between items-center h-[82px]",
                "px-8 md:px-24 lg:px-2 xl:px-32 2xl:px-48",
                "bg-[#1B0044]/5 dark:bg-[#12121ACC]/80",
                "border dark:border-primary-dark/10"
            )}>

                {/* { Logo } */}
                <div className="">
                    <Link to={"/"} className="flex items-center">
                        <Logo className={clsx(
                            "text-secondary-light dark:text-secondary-dark",
                            "mr-1 sm:mr-3 w-12 h-12"
                        )}/>
                        <p className={clsx(
                            "text-primary-light dark:text-primary-dark",
                            "font-bebasNeue font-normal uppercase tracking-[-0.6px] text-center leading-none",
                            "text-4xl"
                        )}
                        >cine</p>
                        <p className={clsx(
                            "text-secondary-light dark:text-secondary-dark",
                            "font-bebasNeue font-normal uppercase tracking-[-0.6px] text-center leading-none",
                            "text-4xl"
                        )}
                        >verse</p>
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
                    <Link to="/help" className={linkClassName("/help")}>Допомога і контакти</Link>
                </nav>

                {/* { Options } */}
                <div className="flex gap-2 sm:gap-4 items-center">
                    {!isAuth ? (
                        <>
                            <Button className="hidden sm:block" onClick={() => navigate("/login")}>Увійти</Button>
                            <Button className="hidden sm:block"
                                    onClick={() => navigate("/registration")}>Зареєструватися</Button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row items-center gap-1">
                                <Avatar className={clsx(
                                    "text-secondary-light dark:text-secondary-dark",
                                    "w-8 h-8"
                                )}/>
                                <p className={clsx(
                                    "text-primary-light dark:text-primary-dark",
                                    "font-montserrat"
                                )}>{truncate(user?.firstName ?? "", 8)}</p>
                            </div>
                            <Button className="hidden sm:block" onClick={() => logout()}>Вийти</Button>
                        </>
                    )}
                    <UserMenu/>
                </div>
            </div>
        </>
    );
}

export default Header;