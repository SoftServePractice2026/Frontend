import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CinemaHall } from "../components/CinemaHall";
import { rowsConfig } from "../constants";
import { BookingSummary } from "../components/BookingSummary";
import { PaymentModal } from "../components/PaymentModal";

const BookingPage = () => {
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [isPaymentOpen, setPaymentOpen] = useState(false);

    const totalPrice = selectedSeats.reduce((sum, seatId) => {
        const rowId = seatId.split("-")[0];
        const row = rowsConfig.find((r) => r.id === rowId);
        return sum + (row ? row.price : 0);
    }, 0);

    const handleSeatClick = (seatId: string) => {
        setSelectedSeats(prev => prev.includes(seatId)
            ? prev.filter(id => id !== seatId)
            : [...prev, seatId]
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0F] text-gray-900 dark:text-white flex flex-col relative pb-32 transition-colors duration-300 font-montserrat">
            <div className="p-6">
                <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors">
                    <span>‹ Назад до сеансів</span>
                </button>
            </div>

            <div className="text-center mt-4 mb-2">
                <h1 className="text-2xl font-bold mb-2">Дюна: Друга частина</h1>
                <p className="text-gray-500 text-sm">19:30 · 2D · Зал 1</p>
            </div>

            <CinemaHall selectedSeats={selectedSeats} occupiedSeats={[]} onSeatClick={handleSeatClick} />

            <BookingSummary
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
                onBuyClick={() => setPaymentOpen(true)}
            />

            {isPaymentOpen && (
                <PaymentModal
                    isOpen={isPaymentOpen}
                    onClose={() => setPaymentOpen(false)}
                    totalPrice={totalPrice}
                    movieTitle="Дюна: Друга частина"
                    seats={selectedSeats}
                />
            )}
        </div>
    );
};

export default BookingPage;