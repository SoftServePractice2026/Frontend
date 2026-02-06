import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "@/shared/layouts/MainLayout";
import HomePage from "@/features/home/pages/HomePage";
import NotFoundPage from "@/features/home/pages/NotFoundPage";
import RegistrationPage from "@/features/user/pages/RegistrationPage";
import LoginPage from "@/features/user/pages/LoginPage";
import UnauthorizedPage from "@/features/user/pages/UnauthorizedPage";
import ContactPage from '@/features/contacts/ContactPage'
import MovieDetailPage from "@/features/movies/pages/MovieDetailPage";
import AfishaPage from "@/features/poster/pages/AfishaPage";
import ComingSoonPage from "@/features/upcoming/pages/ComingSoonPage";

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
                    { path: "/contacts", element : <ContactPage /> },
                    { path: "/movie/:id", element: <MovieDetailPage /> },
                    { path: "/afisha", element: <AfishaPage /> },
                    { path: "/coming-soon", element: <ComingSoonPage /> },

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