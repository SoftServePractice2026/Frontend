import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { ThemeToggle } from "@/features/theme";
import clsx from "clsx";
import Logo from "@/assets/svg/components/Logo";

const Header = () => {

    const linkDefaultClassName = clsx(
        "dark:text-primary-dark dark:hover:text-secondary-dark",
        "font-montserrat font-medium text-base leading-none",
        "transition"
    );

    return (
        <>
            <div className={clsx(
                "flex justify-between items-center px-48 h-[82px]",
                "dark:bg-[#12121ACC]/80",
                "border dark:border-primary-dark/10"
            )}>
                <div className="">
                    <Link to={"/"} className="flex items-center">
                        <Logo className="mr-3"/>
                        <p className="dark:text-primary-dark font-bebasNeue font-normal text-4xl uppercase tracking-[-0.6px] text-center leading-none">cine</p>
                        <p className="dark:text-secondary-dark font-bebasNeue font-normal text-4xl uppercase tracking-[-0.6px] text-center leading-none">verse</p>
                    </Link>
                </div>
                <nav className="flex gap-8">
                    <Link to={"/"} className={linkDefaultClassName}>Афіша</Link>
                    <Link to={"/"} className={linkDefaultClassName}>Скоро у кіно</Link>
                    <Link to={"/"} className={linkDefaultClassName}>Про нас</Link>
                    <Link to={"/"} className={linkDefaultClassName}>Допомога і контакти</Link>
                </nav>
                <div className="flex gap-4">
                    <Button>Увійти</Button>
                    <Button>Зареєструватися</Button>
                </div>
            </div>
        </>
    );
}

export default Header;