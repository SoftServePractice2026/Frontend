import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "@/shared/layouts/MainLayout";
import HomePage from "@/features/home/pages/HomePage";
import NotFoundPage from "@/features/home/pages/NotFoundPage";
import RegistrationPage from "@/features/user/pages/RegistrationPage";
import LoginPage from "@/features/user/pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import UnauthorizedPage from "@/features/user/pages/UnauthorizedPage";

export const Router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    { path: "/", element: <HomePage /> },
                    { path: "/registration", element: <RegistrationPage /> },
                    { path: "/login", element: <LoginPage /> },
                    { path: "/recovery", element: <RegistrationPage /> },

                    // User path example
                    // { path: "...", element: (<ProtectedRoute requiredRoles={["User, Admin"]}>...</ProtectedRoute>)}

                    // Admin path example
                    // { path: "...", element: (<ProtectedRoute requiredRoles={["Admin"]}>...</ProtectedRoute>)}

                    { path: "/unauthorized", element: <UnauthorizedPage /> }
                ]
            }
        ]
    }
])