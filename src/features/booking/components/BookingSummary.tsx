interface BookingSummaryProps {
    selectedSeats: string[];
    totalPrice: number;
    onBuyClick: () => void;
}

export const BookingSummary = ({ selectedSeats, totalPrice, onBuyClick }: BookingSummaryProps) => {
    if (selectedSeats.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#0A0A0F] border-t border-gray-200 dark:border-gray-800 p-6 flex justify-center z-50 transition-colors duration-300">
            <div className="w-full max-w-4xl flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">Обрані місця:</span>
                    <div className="flex gap-2 text-gray-900 dark:text-white font-bold text-lg">
                        {selectedSeats.join(", ")}
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex flex-col text-right">
                        <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider mb-1">До сплати:</span>
                        <span className="text-red-600 dark:text-white font-bold text-2xl">{totalPrice} ₴</span>
                    </div>
                    <button
                        onClick={onBuyClick}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all active:scale-95"
                    >
                        Підтвердити бронювання
                    </button>
                </div>
            </div>
        </div>
    );
};