import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { SessionService } from "@/shared/api/services/session.service.ts";

interface SessionDto {
    id: string;
    movieTitle: string;
    movieId: string;
    hallName: string;
    hallId: string;
    startTime: string;
    endTime: string;
    sessionStatus: number;
}

const HallSessionsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sessions, setSessions] = useState<SessionDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                if (!id) return;
                const data = await SessionService.getByHallId(id);
                setSessions(data);
            } catch (error) {
                console.error("Помилка завантаження сеансів:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSessions();
    }, [id]);

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) return <div className="text-white p-10 text-center font-light">Завантаження сеансів...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-10 font-light">
                <Link to="/admin" className="hover:text-white transition-colors tracking-wide">• Назад до залів</Link>
                <span className="text-gray-200 tracking-wide">• {sessions[0]?.hallName || `Зала ${id}`}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {sessions.length > 0 ? (
                    sessions.map((session) => (
                        <div
                            key={session.id}
                            onClick={() => navigate(`/admin/session/${session.id}`)}
                            className="relative bg-[#0A0A0F] border border-[#E12E2E]/50 hover:border-[#E12E2E] rounded-xl overflow-hidden flex flex-col group cursor-pointer transition-all"
                        >
                            <div className="p-5 border-b border-[#E12E2E]/20">
                                <h3 className="text-white font-bold text-lg mb-1 truncate">{session.movieTitle}</h3>
                                <p className="text-gray-400 text-sm font-light uppercase tracking-tighter">
                                    {formatTime(session.startTime)} — {formatTime(session.endTime)} · 2D
                                </p>
                            </div>

                            <div className="p-6 flex flex-col items-center bg-gradient-to-b from-[#1A1A1F] to-[#0A0A0F]">
                                <div className="w-full flex flex-col items-center mb-8">
                                    <div className="w-2/3 h-1 bg-gray-800 rounded-full blur-[1px] mb-1" />
                                    <span className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">Е к р а н</span>
                                </div>

                                <div className="grid grid-cols-10 gap-2 mb-8 scale-90 opacity-40">
                                    {[...Array(60)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={clsx(
                                                "w-2.5 h-2.5 rounded-[1px] border border-gray-800 bg-transparent",
                                                i > 45 && "border-[#D1A11F]/30 bg-[#D1A11F]/5"
                                            )}
                                        />
                                    ))}
                                </div>

                                <div className="w-full flex justify-between items-center px-2">
                                    <span className="text-[10px] text-[#E12E2E] uppercase font-bold tracking-widest group-hover:translate-x-1 transition-transform">
                                        Деталі сеансу ›
                                    </span>
                                    <span className="text-[9px] text-gray-600 uppercase">ID: {session.id.substring(0, 5)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 col-span-full text-center py-24 border border-dashed border-gray-900 rounded-2xl">
                        <p className="text-xl font-light">На сьогодні сеансів не знайдено</p>
                        <p className="text-sm mt-2 opacity-50">Спробуйте обрати іншу залу або дату</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HallSessionsPage;