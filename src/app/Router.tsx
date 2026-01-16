import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "@/shared/layouts/MainLayout";
import HomePage from "@/features/home/pages/HomePage";
import NotFoundPage from "@/features/home/pages/NotFoundPage";

export const Router = createBrowserRouter([
    {
        element: <App/>,
        errorElement: <NotFoundPage/>, 
        children: [
            {
                element: <MainLayout/>,
                children: [
                    {path: "/", element: <HomePage/>}
                ]
            }
        ]
    }
])