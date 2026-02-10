import { useState } from "react";

export const TimeModal = ({ onClose, onSave }: any) => {
    const [hours, setHours] = useState(10);
    const [minutes, setMinutes] = useState(0);

    const handleSave = () => {
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        onSave(formattedTime);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
            <div className="bg-black border border-gray-800 w-[450px] rounded-2xl p-8 shadow-2xl font-montserrat">
                <h3 className="text-white text-2xl font-bold mb-10 tracking-tight text-center uppercase">Встановити час</h3>

                <div className="flex flex-col items-center mb-10">
                    <div className="flex gap-12 text-gray-800 text-2xl mb-4 font-light select-none">
                        <span>{hours - 1}</span><span>{minutes === 0 ? 59 : minutes - 1}</span>
                    </div>
                    <div className="flex items-center gap-6 text-white text-6xl font-bold border-y border-gray-800/50 py-8 w-full justify-center">
                        <div className="flex flex-col items-center">
                            <button onClick={() => setHours(prev => (prev + 1) % 24)} className="text-xs text-gray-600 mb-2 hover:text-[#D1A11F]">▲</button>
                            <span>{hours.toString().padStart(2, '0')}</span>
                            <button onClick={() => setHours(prev => (prev - 1 + 24) % 24)} className="text-xs text-gray-600 mt-2 hover:text-[#D1A11F]">▼</button>
                        </div>

                        <span className="text-gray-600 mb-2">:</span>

                        <div className="flex flex-col items-center">
                            <button onClick={() => setMinutes(prev => (prev + 1) % 60)} className="text-xs text-gray-600 mb-2 hover:text-[#D1A11F]">▲</button>
                            <span>{minutes.toString().padStart(2, '0')}</span>
                            <button onClick={() => setMinutes(prev => (prev - 1 + 60) % 60)} className="text-xs text-gray-600 mt-2 hover:text-[#D1A11F]">▼</button>
                        </div>

                        <span className="ml-4 text-xl uppercase tracking-[0.2em] text-[#D1A11F] font-light">
                            {hours >= 12 ? 'PM' : 'AM'}
                        </span>
                    </div>
                    <div className="flex gap-12 text-gray-800 text-2xl mt-4 font-light select-none">
                        <span>{hours + 1}</span><span>{minutes + 1}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-4 bg-[#D1A11F]/10 border border-[#D1A11F]/50 rounded-xl text-[#D1A11F] font-bold hover:bg-[#D1A11F]/20 transition-all shadow-[0_0_15px_rgba(209,161,31,0.1)]"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};