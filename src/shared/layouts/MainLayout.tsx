import { Outlet } from "react-router-dom";
import Header from "./Header";

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