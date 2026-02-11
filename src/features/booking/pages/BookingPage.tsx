import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/shared/api/Axios";
import { CinemaHall } from "../components/CinemaHall";
import { rowsConfig } from "../constants";
import { BookingSummary } from "../components/BookingSummary";
import { PaymentModal } from "../components/PaymentModal";

interface SessionInfo {
    title: string;
    time: string;
    hall: string;
}

const BookingPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
    const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPageData = async () => {
            try {
                setIsLoading(true);
                const [seatsRes, sessionRes] = await Promise.all([
                    api.get<string[]>(`/bookings/occupied-seats/${id}`),
                    api.get<SessionInfo>(`/sessions/${id}`)
                ]);

                setOccupiedSeats(seatsRes.data);
                setSessionInfo(sessionRes.data);
            } catch (error) {
                console.error("Помилка завантаження:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) loadPageData();
    }, [id]);

    const handleSeatClick = (seatId: string) => {
        setSelectedSeats(prev => prev.includes(seatId)
            ? prev.filter(id => id !== seatId)
            : [...prev, seatId]
        );
    };

    const totalPrice = selectedSeats.reduce((sum, seatId) => {
        const rowId = seatId.split("-")[0];
        const row = rowsConfig.find((r) => r.id === rowId);
        return sum + (row ? row.price : 0);
    }, 0);

    const handleBookingConfirm = async () => {
        try {
            await api.post("/bookings/reserve", {
                showtimeId: id,
                seats: selectedSeats
            });

            setOccupiedSeats(prev => [...prev, ...selectedSeats]);
            setSelectedSeats([]);
            setPaymentOpen(false);
            alert("Місця успішно заброньовано!");
        } catch (error) {
            console.error("Помилка бронювання:", error);
            alert("Сталася помилка. Можливо, ці місця вже хтось забронював.");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0F] dark:text-white font-montserrat">
                <p className="animate-pulse">Синхронізація з сервером...</p>
            </div>
        );
    }

    if (!sessionInfo) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0F] dark:text-white">
                <p className="text-xl mb-4">Сеанс не знайдено </p>
                <button onClick={() => navigate(-1)} className="text-red-600 underline">Повернутися назад</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0F] text-gray-900 dark:text-white flex flex-col relative pb-32 transition-colors duration-300 font-montserrat">
            {}
            <div className="p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors"
                >
                    <span>‹ Назад до розкладу</span>
                </button>
            </div>

            {}
            <div className="text-center mt-4 mb-2">
                <h1 className="text-2xl font-bold mb-2">{sessionInfo.title}</h1>
                <p className="text-gray-500 text-sm">
                    {sessionInfo.time} · 2D · {sessionInfo.hall}
                </p>
            </div>

            {}
            <CinemaHall
                selectedSeats={selectedSeats}
                occupiedSeats={occupiedSeats}
                onSeatClick={handleSeatClick}
            />

            {}
            <BookingSummary
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
                onBuyClick={() => setPaymentOpen(true)}
            />

            {}
            {isPaymentOpen && (
                <PaymentModal
                    isOpen={isPaymentOpen}
                    onClose={() => setPaymentOpen(false)}
                    totalPrice={totalPrice}
                    movieTitle={sessionInfo.title}
                    seats={selectedSeats}
                    onSuccess={handleBookingConfirm}
                />
            )}
        </div>
    );
};

export default BookingPage;