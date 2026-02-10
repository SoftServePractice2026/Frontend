import clsx from "clsx";
import { rowsConfig } from "../constants";

interface CinemaHallProps {
    selectedSeats: string[];
    occupiedSeats: string[];
    onSeatClick: (seatId: string) => void;
}

export const CinemaHall = ({ selectedSeats, occupiedSeats, onSeatClick }: CinemaHallProps) => {
    return (
        <div className="flex flex-col items-center gap-3 px-4 w-full">
            <div className="w-full flex justify-center mb-14 overflow-hidden">
                <div className="relative w-[600px] flex justify-center">
                    <div className={clsx(
                        "w-full h-12 rounded-[50%]",
                        "bg-gradient-to-b from-gray-400/20 dark:from-white/10 to-transparent",
                        "shadow-[0_15px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_30px_rgba(255,255,255,0.1)]",
                        "border-t border-gray-200 dark:border-white/20"
                    )}></div>
                    <span className="absolute top-4 text-[10px] tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase font-bold">
                        Екран
                    </span>
                </div>
            </div>

            {rowsConfig.map((row) => (
                <div key={row.id} className="flex items-center gap-4">
                    <span className="text-gray-400 dark:text-gray-600 font-mono text-xs w-4 text-right">{row.id}</span>
                    <div className="flex gap-2">
                        {Array.from({ length: row.count }, (_, i) => i + 1).map((seatNum) => {
                            const seatId = `${row.id}-${seatNum}`;
                            const isSelected = selectedSeats.includes(seatId);
                            const isOccupied = occupiedSeats.includes(seatId);

                            return (
                                <button
                                    key={seatNum}
                                    onClick={() => onSeatClick(seatId)}
                                    disabled={isOccupied}
                                    className={clsx(
                                        "w-8 h-8 rounded-xl text-[10px] font-bold transition-all duration-200 flex items-center justify-center",
                                        isOccupied
                                            ? "bg-gray-200 dark:bg-gray-800/30 text-transparent cursor-not-allowed"
                                            : isSelected
                                                ? "bg-red-600 text-white shadow-lg scale-110"
                                                : row.isVip
                                                    ? "bg-white dark:bg-gray-900 border border-yellow-600/40 text-yellow-600 hover:border-yellow-500"
                                                    : "bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    )}
                                >
                                    {!isOccupied && seatNum}
                                </button>
                            );
                        })}
                    </div>
                    <span className="text-gray-400 dark:text-gray-600 font-mono text-xs w-4 text-left">{row.id}</span>
                </div>
            ))}
        </div>
    );
};