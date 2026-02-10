import {useEffect, useState} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { StatusModal } from "../components/SessionModals/StatusModal";
import { TimeModal } from "../components/SessionModals/TimeModal";
import {SessionService} from "@/shared/api/services/session.service.ts";


const statusLabels : Record<number, string> = {
    1: "активний",
    2: "скасований",
    3: "завершений",
    4: "запланований"
};

const SessionDetailsPage = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);


    const [isLoading, setIsLoading] = useState(true);

    const [status, setStatus] = useState<number>(4);
    const [sessionTime, setSessionTime] = useState<string>("10:00");
    const [movieTitle, setMovieTitle] = useState<string>("Завантаження...");

    useEffect(() => {
        const fetchSessionData = async () => {
            try{
                if (!sessionId) return;
                const data = await SessionService.getById(sessionId);

                setStatus(data.sessionStatus);
                setMovieTitle(data.movieTitle);

                const date = new Date(data.startTime);
                setSessionTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }catch(error){
                console.error("Помилка завантаження сеансу:", error);
            }finally{
                setIsLoading(false);
            }
        };
        fetchSessionData();
    }, [sessionId]);


    const handleSave = async () => {
       try{
           if (!sessionId) return;

           const updateData = {
               startTime: sessionTime,
               sessionStatus: status
           };

           await SessionService.update(sessionId, updateData);

           alert("Зміна успішно збережено в базі даних!")
       }catch(error){
           console.error("Помилка при збереженні:", error);
           alert("Не вдалося зберегти зміни.")
       }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-[#0A0A0F] text-white p-10 text-center font-light flex items-center justify-center">
            Синхронізація з базою даних...
        </div>;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-10 font-light">
                <Link to="/admin" className="hover:text-white transition-colors">• Назад до залів</Link>
                <span className="text-gray-200 tracking-wide">• ID сеансу: {sessionId}</span>

                <span className={clsx(
                    "ml-2 border-b border-opacity-50 transition-all duration-300 uppercase text-[10px]",
                    status === 1 && "text-blue-400 border-blue-400",
                    status === 2 && "text-red-500 border-red-500",
                    status === 3 && "text-green-500 border-green-500",
                    status === 4 && "text-yellow-500 border-yellow-500"
                )}>
                    • {statusLabels[status]}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-[#0A0A0F] border border-gray-800 rounded-xl p-10 flex flex-col items-center shadow-2xl">
                    <div className="w-full mb-10 text-left">
                        <h2 className="text-3xl font-bold text-white mb-2 font-montserrat">{movieTitle}</h2>
                        <p className="text-gray-500 tracking-[0.2em] text-sm uppercase font-light">{sessionTime} · 2D · 16+</p>
                    </div>

                    <div className="w-full flex flex-col items-center mb-16">
                        <div className="w-3/4 h-2 bg-gradient-to-b from-gray-700 to-transparent rounded-full blur-sm mb-2 opacity-50" />
                        <span className="text-[10px] text-gray-600 uppercase tracking-[0.6em] font-light">Е к р а н</span>
                    </div>

                    <div className="grid gap-3 mb-16">
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) => (
                            <div key={row} className="flex items-center gap-6">
                                <span className="text-gray-700 text-[10px] w-4 font-light text-center">{row}</span>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                                        const isVip = row === 'F' || row === 'G' || row === 'H';
                                        return (
                                            <div
                                                key={num}
                                                onClick={() => navigate(`/admin/session/${sessionId}/seat/${row}${num}`)}
                                                className={clsx(
                                                    "w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-medium transition-all cursor-pointer hover:scale-110 active:scale-90",
                                                    isVip ? "border border-[#D1A11F]/40 text-[#D1A11F] bg-[#D1A11F]/5 hover:bg-[#D1A11F]/20" : "bg-[#1A1A1F] text-gray-500 border border-transparent hover:border-gray-600"
                                                )}
                                            >
                                                {num}
                                            </div>
                                        );
                                    })}
                                </div>
                                <span className="text-gray-700 text-[10px] w-4 font-light text-center">{row}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button onClick={() => setIsTimeOpen(true)} className="w-full bg-[#1A1A1F] border border-gray-800 p-8 rounded-xl text-left hover:border-gray-600 transition-all group">
                        <span className="text-sm text-gray-500 block mb-1">Початок сеансу</span>
                        <span className="text-2xl font-medium text-gray-200 group-hover:text-white">{sessionTime}</span>
                    </button>

                    <button onClick={() => setIsStatusOpen(true)} className="w-full bg-[#1A1A1F] border border-gray-800 p-8 rounded-xl text-left hover:border-gray-600 transition-all group">
                        <span className="text-sm text-gray-500 block mb-1">Поточний статус</span>
                        <span className="text-2xl font-medium text-gray-200 group-hover:text-white capitalize">{statusLabels[status]}</span>
                    </button>

                    <div className="mt-auto">
                        <button
                            onClick={handleSave}
                            className="w-full border border-[#D1A11F]/40 bg-[#D1A11F]/5 p-8 rounded-xl text-[#D1A11F] text-2xl font-bold hover:bg-[#D1A11F]/10 transition-all active:scale-[0.98] shadow-lg shadow-[#D1A11F]/5"
                        >
                            Зберегти зміни
                        </button>
                    </div>
                </div>
            </div>

            {isStatusOpen && (
                <StatusModal
                    currentStatus={status}
                    onSelect={(newStatusId: number) => setStatus(newStatusId)}
                    onClose={() => setIsStatusOpen(false)}
                />
            )}

            {isTimeOpen && (
                <TimeModal
                    onSave={(newTime: string) => setSessionTime(newTime)}
                    onClose={() => setIsTimeOpen(false)}
                />
            )}
        </div>
    );
};

export default SessionDetailsPage;