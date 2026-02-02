import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import clsx from "clsx";

// import dunePoster from "../../../assets/images/Dune_ Part Two.png"
// import {api} from "@/shared/api/base.ts";
import {TicketService} from "@/shared/api/services/ticket.service.ts";

const SeatDetailsPage = () => {
    const { sessionId, seatId } = useParams();
    const [ticketData, setTicketData] = useState<any>(null);
    const [seatStatus, setSeatStatus] = useState("Вільне");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchTicket = async () => {
            try{
                if (sessionId && seatId){
                    const data = await TicketService.getBySeat(sessionId, seatId);
                    setTicketData(data);
                    setSeatStatus(data.status);
                }
            }
            catch(error){
                console.error("Квиток не знайдено (місце вільне)");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchTicket();
    }, [sessionId, seatId]);

    const handleUpdateSeat = async () => {
        if (!ticketData?.ticketId) return;
        try{
            await TicketService.updateStatus(ticketData.ticketId, seatStatus);
            alert("Статус успішно оновлено!");
        } catch(error){
            alert("Не вдалося оновити статус на сервері.")
        }
    };

    const statusOptions = ["Вільне", "Заблоковане", "Заброньоване", "Оплачене"];

    if (isLoading) return <div className="text-white p-10 text-center">Синхронізація...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-[#0A0A0F] border border-gray-800 rounded-xl p-10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-800/50 pt-12">
                        <section>
                            <h3 className="text-white text-xl font-bold mb-6 tracking-tight">Інформація про квиток:</h3>
                            <div className="text-gray-400 space-y-2 text-lg font-light leading-relaxed">
                                <p>Ряд: <span className="text-white font-semibold ml-1">{seatId?.charAt(0)}</span></p>
                                <p>Місце: <span className="text-white font-semibold ml-1">{seatId?.substring(1)}</span></p>
                                <p>Ціна: <span className="text-white font-semibold ml-1">{ticketData?.price || "200"} UAH</span></p>
                            </div>
                        </section>

                        <section className={clsx("transition-all duration-500", !ticketData ? "opacity-30 grayscale" : "opacity-100")}>
                            <h3 className="text-white text-xl font-bold mb-6 tracking-tight">Інформація про клієнта:</h3>
                            <div className="text-gray-400 space-y-2 text-lg font-light leading-relaxed">
                                <p>Ім'я: <span className="text-white font-medium ml-1">
                                    {ticketData?.user?.first_name || "—"} {ticketData?.user?.last_name || ""}
                                </span></p>
                                <p className="flex flex-wrap items-center">
                                    Пошта: <span className="text-white font-medium ml-1 italic break-all">
                                        {ticketData?.user?.email || "—"}
                                    </span>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="flex flex-col bg-[#0A0A0F] border border-gray-800 rounded-xl p-10 h-fit sticky top-24 shadow-2xl">
                    <h3 className="text-white text-2xl font-bold mb-10 tracking-tight">Статус квитка:</h3>

                    <div className="flex flex-col gap-8 mb-12">
                        {statusOptions.map((opt) => (
                            <div key={opt} onClick={() => setSeatStatus(opt)} className="flex items-center gap-5 group cursor-pointer">
                                <div className={clsx(
                                    "w-4 h-4 rounded-full border-2 transition-all duration-300",
                                    seatStatus === opt ? "border-[#D1A11F] bg-[#D1A11F]" : "border-gray-700"
                                )} />
                                <span className={clsx("text-xl transition-all", seatStatus === opt ? "text-[#D1A11F]" : "text-gray-500")}>
                                    {opt}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleUpdateSeat}
                        className="w-full mt-auto border border-[#D1A11F]/40 bg-[#D1A11F]/5 p-7 rounded-xl text-[#D1A11F] text-2xl font-bold hover:bg-[#D1A11F]/10 transition-all active:scale-[0.97]"
                    >
                        Зберегти зміни
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatDetailsPage;