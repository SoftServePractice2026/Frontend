import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
    return (
        <>
            <main className="bg-stone-950 h-dvh">
                <Header/>
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;