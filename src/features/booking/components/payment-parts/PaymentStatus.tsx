const TicketSummary = ({ title, seats, price }: { title: string, seats: string[], price: number }) => (
    <div className="w-full bg-gray-100 dark:bg-gray-800/30 p-4 rounded-lg border border-gray-200 dark:border-gray-700/50 mb-6 transition-colors">
        <p className="text-gray-900 dark:text-white font-bold text-sm mb-1">{title}</p>
        <p className="text-yellow-600 dark:text-yellow-500 text-xs font-mono mb-3">🎫 Місця: {seats.join(", ")}</p>
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2">
            <span className="text-gray-500 dark:text-gray-400 text-xs">До сплати:</span>
            <span className="text-red-600 dark:text-red-500 font-bold text-lg">{price} ₴</span>
        </div>
    </div>
);

interface StatusProps {
    totalPrice: number;
    movieTitle: string;
    seats: string[];
}

export const PaymentProcessing = ({ totalPrice, movieTitle, seats }: StatusProps) => (
    <div className="flex flex-col items-center py-4 w-full text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 self-start">Обробка...</h2>
        <TicketSummary title={movieTitle} seats={seats} price={totalPrice} />
        <div className="flex gap-2 mt-4">
            {[0, 0.2, 0.4].map((delay) => (
                <div key={delay} className="w-3 h-3 bg-gray-400 dark:bg-white rounded-full animate-bounce" style={{ animationDelay: `${delay}s` }}></div>
            ))}
        </div>
    </div>
);

export const PaymentSuccess = ({ totalPrice, movieTitle, seats }: StatusProps) => (
    <div className="flex flex-col items-center py-4 w-full text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 self-start">Успішно!</h2>
        <TicketSummary title={movieTitle} seats={seats} price={totalPrice} />
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <span className="text-4xl font-bold text-white">✓</span>
        </div>
        <p className="text-gray-900 dark:text-white font-bold text-lg">Оплата успішна!</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Переходьте до квитків...</p>
    </div>
);