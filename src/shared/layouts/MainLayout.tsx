import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
    return (
        <>
            <main className="dark:bg-stone-950 bg-white h-dvh">
                <Header/>
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;