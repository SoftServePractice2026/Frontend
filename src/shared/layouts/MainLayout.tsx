import { Outlet } from "react-router-dom";
import Header from "./Header";
import clsx from "clsx";

const MainLayout = () => {
    return (
        <>
            <main className="relative min-h-dvh flex flex-col dark:bg-stone-950 bg-white">
                <Header />
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;