import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import clsx from "clsx";
import Logo from "@/assets/svg/components/Logo";
import { UserMenu } from "@/features/menu/components/UserMenu";
import { useAuth } from "@/app/providers/AuthProvider";

const Header = () => {

    const navigate = useNavigate();
    const { isAuth, user, logout } = useAuth();

    const linkClassName = clsx(
        "flex items-center",
        "text-primary-light dark:text-primary-dark",
        "hover:text-secondary-light dark:hover:text-secondary-dark",
        "font-montserrat font-medium text-base leading-none text-center",
        "transition"
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
                        )} />
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
                    <Link to={"/"} className={linkClassName}>Афіша</Link>
                    <Link to={"/"} className={linkClassName}>Скоро у кіно</Link>
                    <Link to={"/"} className={linkClassName}>Про нас</Link>
                    <Link to={"/"} className={linkClassName}>Допомога і контакти</Link>
                </nav>

                {/* { Options } */}
                <div className="flex gap-2 sm:gap-4">
                    {!isAuth ? (
                        <>
                            <Button className="hidden sm:block" onClick={() => navigate("/login")}>Увійти</Button>
                            <Button className="hidden sm:block" onClick={() => navigate("/registration")}>Зареєструватися</Button>
                        </>
                    ) : (
                        <>
                            <Button className="hidden sm:block" onClick={() => logout()}>Logout</Button>
                        </>
                    )}
                    <UserMenu />
                </div>
            </div>
        </>
    );
}

export default Header;