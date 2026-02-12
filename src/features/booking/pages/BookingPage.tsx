import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/shared/api/Axios";
import { CinemaHall } from "../components/CinemaHall";
import { rowsConfig } from "../constants";
import { BookingSummary } from "../components/BookingSummary";
import { PaymentModal } from "../components/PaymentModal";

interface SessionDTO {
    id: string;
    movieTitle: string;
    hallName: string;
    hallId: string;
    startTime: string;
}

interface BackendSeat {
    id: string;
    rowNumber: number;
    seatNumber: number;
}

interface UserTicket {
    id: string;
    movieTitle: string;
    date: string;
    time: string;
    hall: string;
    seats: string;
    totalPrice: number;
    status: string;
}

const BookingPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
    const [sessionInfo, setSessionInfo] = useState<{ title: string, time: string, hall: string } | null>(null);
    const [realSeatsMap, setRealSeatsMap] = useState<BackendSeat[]>([]);

    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const STORAGE_KEY = `cached-bookings-${id}`;

    useEffect(() => {
        const loadPageData = async () => {
            try {
                setIsLoading(true);
                const { data: s } = await api.get<SessionDTO>(`/v1/sessions/${id}`);
                setSessionInfo({ title: s.movieTitle, time: s.startTime, hall: s.hallName });

                if (s.hallId) {
                    try {
                        const { data: seats } = await api.get<BackendSeat[]>(`/v1/seat/hall/${s.hallId}`);
                        setRealSeatsMap(seats);
                    } catch { /* Тиха помилка */ }
                }

                const { data: serverOcc } = await api.get<string[]>(`/v1/bookings/occupied-seats/${id}`).catch(() => ({ data: [] }));
                const localOcc = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
                setOccupiedSeats(Array.from(new Set([...serverOcc, ...localOcc])));

            } catch (error) {
                console.error("Помилка завантаження:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) void loadPageData();
    }, [id, STORAGE_KEY]);

    const totalPrice = useMemo(() => {
        return selectedSeats.reduce((sum, seatId) => {
            const row = rowsConfig.find((r) => r.id === seatId.split("-")[0]);
            return sum + (row ? row.price : 0);
        }, 0);
    }, [selectedSeats]);

    const handleBookingConfirm = async (): Promise<void> => {
        try {
            const seatsToBook = selectedSeats.map(visualSeat => {
                const [rowLetter, seatNumStr] = visualSeat.split('-');
                const rowNum = rowLetter.charCodeAt(0) - 64;
                const seatNum = parseInt(seatNumStr);
                return realSeatsMap.find(s => s.rowNumber === rowNum && s.seatNumber === seatNum)?.id || null;
            }).filter((sid): sid is string => sid !== null);

            if (seatsToBook.length > 0) {
                await api.post("/v1/bookings/reserve", { showtimeId: id, seats: seatsToBook }).catch(() => null);
            }

            const ticket: UserTicket = {
                id: Math.random().toString(36).substring(2, 10).toUpperCase(),
                movieTitle: sessionInfo?.title || "Фільм",
                date: new Date().toLocaleDateString('uk-UA'),
                time: sessionInfo?.time || "19:00",
                hall: sessionInfo?.hall || "Зал 1",
                seats: selectedSeats.join(", "),
                totalPrice: totalPrice,
                status: "Активний"
            };

            const allTickets = JSON.parse(localStorage.getItem("user_tickets") || "[]");
            localStorage.setItem("user_tickets", JSON.stringify([ticket, ...allTickets]));

            const newOcc = Array.from(new Set([...occupiedSeats, ...selectedSeats]));
            setOccupiedSeats(newOcc);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newOcc));

            setTimeout(() => setSelectedSeats([]), 3000);

        } catch (err) {
            console.error("Помилка обробки успіху:", err);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center dark:text-white">Завантаження...</div>;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0F] text-gray-900 dark:text-white flex flex-col pb-32 font-montserrat">
            <div className="p-6">
                <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-white transition-colors">‹ Назад</button>
            </div>

            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">{sessionInfo?.title}</h1>
                <p className="text-gray-500">{sessionInfo?.time} • {sessionInfo?.hall}</p>
            </div>

            <CinemaHall selectedSeats={selectedSeats} occupiedSeats={occupiedSeats} onSeatClick={(s) => setSelectedSeats(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])} />
            <BookingSummary selectedSeats={selectedSeats} totalPrice={totalPrice} onBuyClick={() => setPaymentOpen(true)} />

            {isPaymentOpen && sessionInfo && (
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