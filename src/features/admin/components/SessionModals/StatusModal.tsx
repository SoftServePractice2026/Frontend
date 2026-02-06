import clsx from "clsx";


const statusOptions = [
    {id: 4, label: "запланований" },
    {id: 1, label: "активний" },
    {id: 3, label: "завершений" },
    {id: 2, label: "скасований" },
]

interface StatusModalProps {
    onClose: () => void;
    onSelect: (status: number) => void;
    currentStatus: number;
}

export const StatusModal = ({ onClose, onSelect, currentStatus }: StatusModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-[#0A0A0F] border border-gray-800 w-full max-w-sm rounded-2xl p-8 shadow-2xl">
                <h3 className="text-white text-2xl font-bold mb-8 text-center uppercase tracking-tighter">
                    Встановити статус
                </h3>

                <div className="space-y-3 mb-10">
                    {statusOptions.map((opt) => (
                        <div
                            key={opt.id}
                            onClick={() => onSelect(opt.id)}
                            className={clsx(
                                "flex items-center gap-4 p-4 rounded-lg cursor-pointer border transition-all",
                                opt.id === currentStatus
                                    ? "border-[#D1A11F] bg-[#D1A11F]/5"
                                    : "border-transparent bg-[#1A1A1F] hover:border-gray-700"
                            )}
                        >
                            <div className={clsx(
                                "w-4 h-4 rounded-full border-2 transition-all",
                                opt.id === currentStatus ? "border-[#D1A11F] bg-[#D1A11F]" : "border-gray-600"
                            )} />
                            <span className={clsx(
                                "text-lg capitalize",
                                opt.id === currentStatus ? "text-white" : "text-gray-500"
                            )}>
                                {opt.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 border border-gray-800 rounded-xl text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 bg-[#D1A11F]/10 border border-[#D1A11F]/50 rounded-xl text-[#D1A11F] font-bold hover:bg-[#D1A11F]/20 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};