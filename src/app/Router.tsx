import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "@/shared/layouts/MainLayout";
import HomePage from "@/features/home/pages/HomePage";
import NotFoundPage from "@/features/home/pages/NotFoundPage";
import AdminLayout from "@/shared/layouts/AdminLayout/AdminLayout.tsx";
import AdminPage from "@/features/admin/pages/AdminPage.tsx";
import HallSessionPage from "@/features/admin/pages/HallSessionPage.tsx";
import SessionDetailsPage from "@/features/admin/pages/SessionDetailsPage.tsx";
import SeatDetailsPage from "@/features/admin/pages/SeatDetailsPage.tsx";
import ProfilePage from "@/features/admin/pages/ProfilePage.tsx";
import RegistrationPage from "@/features/user/pages/RegistrationPage";
import LoginPage from "@/features/user/pages/LoginPage";
import UnauthorizedPage from "@/features/user/pages/UnauthorizedPage";
import BookingPage from "@/features/booking/pages/BookingPage.tsx";
import ContactPage from '@/features/contacts/ContactPage'
import MovieDetailPage from "@/features/movies/pages/MovieDetailPage";
import AfishaPage from "@/features/poster/pages/AfishaPage";
import ComingSoonPage from "@/features/upcoming/pages/ComingSoonPage";
import FavoriteFilmsPage from "@/features/user/pages/FavoriteFilmsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import {MyTicketsPage} from "@/features/user/pages/MyTicketsPage.tsx";

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
                    { path: "/booking", element: <BookingPage /> },
                    { path: "/contacts", element : <ContactPage /> },
                    { path: "/movie/:id", element: <MovieDetailPage /> },
                    { path: "/afisha", element: <AfishaPage /> },
                    { path: "/coming-soon", element: <ComingSoonPage /> },
                    { path: "/profile", element: <ProfilePage /> },
                    { path: "/favorites", element: <FavoriteFilmsPage /> },

                    // User path example
                    // { path: "...", element: (<ProtectedRoute requiredRoles={["User, Admin"]}>...</ProtectedRoute>)}

                    // Admin path example
                    // { path: "...", element: (<ProtectedRoute requiredRoles={["Admin"]}>...</ProtectedRoute>)}


                    { path: "my-tickets", element: <MyTicketsPage />},

                    { path: "/unauthorized", element: <UnauthorizedPage /> }
                ]
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute requiredRoles={["Admin"]}>
                         <AdminLayout/>
                    </ProtectedRoute>
                ),
                children: [
                    { path: "", element: <AdminPage/> },

                    { path: "posters", element: <AfishaPage />},
                    { path: "coming-soon", element: < ComingSoonPage />},

                    { path: "hall/:id", element: <HallSessionPage/>},
                    { path: "session/:sessionId", element: <SessionDetailsPage/> },
                    { path: "session/:sessionId/seat/:seatId", element: <SeatDetailsPage /> },
                ]
            }
        ]
    }
])