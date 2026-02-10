import { useEffect, useState } from "react";
import { getMyTickets } from "../api/ticketApi";
import { type TicketListItemVm, TicketStatus } from "../types/TicketVm";
import { useAuth } from "@/app/providers/AuthProvider";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const MyTicketsPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<TicketListItemVm[]>([]);
    const [activeTab, setActiveTab] = useState<TicketStatus>(TicketStatus.Active);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            if (!user?.id) return;
            setIsLoading(true);
            try {
                const data = await getMyTickets(activeTab, user.id);
                setTickets(data);
            } catch (error) {
                console.error("Помилка завантаження квитків:", error);
                setTickets([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, [activeTab, user?.id]);

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white p-8 font-montserrat">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-[40px] font-bold mb-2 tracking-tight text-white">Мої квитки</h1>
                <p className="text-gray-500 text-lg mb-10 font-medium">Історія ваших бронювань</p>

                <div className="flex gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab(TicketStatus.Active)}
                        className={clsx(
                            "px-8 py-3 rounded-full font-bold transition-all flex items-center gap-3",
                            activeTab === TicketStatus.Active
                                ? "bg-[#E12E2E] shadow-[0_4_20px_rgba(225,46,46,0.4)] text-white"
                                : "bg-[#1A1A1F] text-gray-500 hover:bg-[#232328]"
                        )}
                    >
                        Активні
                        {tickets.length > 0 && activeTab === TicketStatus.Active && (
                            <span className="text-[12px] px-2 py-0.5 rounded-full bg-black/20 text-white">
                                {tickets.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab(TicketStatus.Archive)}
                        className={clsx(
                            "px-8 py-3 rounded-full font-bold transition-all flex items-center gap-3",
                            activeTab === TicketStatus.Archive
                                ? "bg-[#E12E2E] shadow-[0_4_20px_rgba(225,46,46,0.4)] text-white"
                                : "bg-[#1A1A1F] text-gray-500 hover:bg-[#232328]"
                        )}
                    >
                        Архів
                        {tickets.length > 0 && activeTab === TicketStatus.Archive && (
                            <span className="text-[12px] px-2 py-0.5 rounded-full bg-black/20 text-white">
                                {tickets.length}
                            </span>
                        )}
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#E12E2E]"></div>
                    </div>
                ) : tickets.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className="bg-[#121217] border border-white/5 rounded-[32px] p-6 flex items-center gap-8 hover:border-white/10 transition-all group">
                                <div className="relative w-[110px] h-[160px] rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl">
                                    <img src={ticket.posterUrl || "/placeholder.jpg"} className="w-full h-full object-cover" alt={ticket.movieTitle} />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                        <span>{ticket.sessionDate || "27-01-2026"}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1 group-hover:text-[#E12E2E] transition-colors">
                                        {ticket.movieTitle || "Назва фільму"}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-3">ID сеансу: {ticket.sessionId.substring(0, 8)}</p>
                                    <div className="bg-[#E12E2E]/10 text-[#E12E2E] text-[12px] font-bold px-3 py-1 rounded-lg w-fit border border-[#E12E2E]/20">
                                        Місця: {ticket.seats?.join(", ") || "H6, H7"}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-4 min-w-[180px]">
                                    <span className="text-3xl font-black text-white">{ticket.price} ₴</span>
                                    <button className={clsx(
                                        "w-full py-3 px-6 rounded-2xl font-bold text-sm transition-all shadow-lg uppercase tracking-wider",
                                        activeTab === TicketStatus.Active
                                            ? "bg-[#E12E2E] hover:bg-[#ff3b3b] text-white shadow-[#E12E2E]/20"
                                            : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                                    )}>
                                        {activeTab === TicketStatus.Active ? "Завантажити" : "Переглянути"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-gray-800/50 rounded-[40px] bg-[#121217]/30">
                        <div className="w-20 h-20 bg-gray-800/20 rounded-full flex items-center justify-center mb-6">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">У вас поки немає квитків</h3>
                        <p className="text-gray-500 text-center max-w-sm font-medium">
                            {activeTab === TicketStatus.Active
                                ? "Ви ще не купували квитки на майбутні сеанси. Саме час обрати цікавий фільм!"
                                : "Ваша історія переглядів поки порожня."}
                        </p>
                        <button
                            onClick={() => navigate("/afisha")}
                            className="mt-8 bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-2xl transition-all font-bold border border-white/10 uppercase text-xs tracking-widest cursor-pointer active:scale-95"
                        >
                            Перейти до афіші
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};