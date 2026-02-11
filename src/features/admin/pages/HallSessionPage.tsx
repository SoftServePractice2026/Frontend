import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { SessionService } from "@/shared/api/services/session.service.ts";
import { api } from "@/shared/api/Axios";
import { getMovieById } from "@/features/movies/api/movieApi";

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
    const { id, date } = useParams();
    const navigate = useNavigate();

    const [sessions, setSessions] = useState<SessionDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [movies, setMovies] = useState<{id: string, title: string}[]>([]);

    const [newSession, setNewSession] = useState({
        movieId: "",
        startTime: date ? `${date}T12:00` : new Date().toISOString().slice(0, 16)
    });

    const fetchSessions = async () => {
        setIsLoading(true);
        try {
            if (!id || !date) return;
            const response = await api.get(`/v1/sessions?HallId=${id}&Date=${date}`);
            setSessions(response.data);
        } catch (error) {
            console.error("Помилка завантаження сеансів:", error);
            setSessions([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
        api.get("/v1/movies").then(res => setMovies(res.data));
    }, [id, date]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const movieDetails = await getMovieById(newSession.movieId);
            const start = new Date(newSession.startTime);

            const durationInMinutes = movieDetails.durationInMinutes || 120;
            const end = new Date(start.getTime() + durationInMinutes * 60 * 1000);

            const payload = {
                movieId: newSession.movieId,
                hallId: id,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                sessionStatus: 4
            };

            const response = await api.post("/v1/sessions", payload);

            if (response.status === 201 || response.status === 200) {
                alert("Сеанс створено!");
                setIsCreateOpen(false);
                fetchSessions();
            }
        } catch (error: any) {
            console.error("Деталі помилки:", error.response?.data);
            alert("Помилка 400. Перевірте консоль (Network tab).");
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) return <div className="text-white p-10 text-center font-light">Завантаження сеансів...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-light">
                    <Link to="/admin" className="hover:text-white transition-colors tracking-wide">• Назад до залів</Link>
                    <span className="text-gray-200 tracking-wide">• {sessions[0]?.hallName || `Зала ${id}`}</span>
                </div>
                {sessions.length > 0 && (
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-[#E12E2E] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#b02525] transition-all"
                    >
                        + Додати сеанс
                    </button>
                )}
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
                                <div className="grid grid-cols-10 gap-2 mb-8 scale-90 opacity-40 text-center">
                                    {[...Array(60)].map((_, i) => (
                                        <div key={i} className={clsx("w-2.5 h-2.5 rounded-[1px] border border-gray-800", i > 45 && "border-[#D1A11F]/30 bg-[#D1A11F]/5")} />
                                    ))}
                                </div>
                                <div className="w-full flex justify-between items-center px-2">
                                    <span className="text-[10px] text-[#E12E2E] uppercase font-bold tracking-widest group-hover:translate-x-1 transition-transform">Деталі ›</span>
                                    <span className="text-[9px] text-gray-600 uppercase">ID: {session.id.substring(0, 5)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 col-span-full text-center py-24 border border-dashed border-gray-900 rounded-2xl bg-[#0A0A0F]/50">
                        <p className="text-xl font-light mb-6">На цей день сеансів не знайдено</p>
                        <button
                            onClick={() => setIsCreateOpen(true)}
                            className="bg-[#E12E2E]/10 border border-[#E12E2E]/50 text-[#E12E2E] px-10 py-3 rounded-xl font-bold hover:bg-[#E12E2E] hover:text-white transition-all shadow-lg"
                        >
                            + Додати перший сеанс
                        </button>
                    </div>
                )}
            </div>

            {isCreateOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleCreate} className="bg-[#0A0A0F] border border-gray-800 p-8 rounded-[32px] w-full max-w-md shadow-2xl flex flex-col gap-6">
                        <h2 className="text-white text-xl font-bold">Новий сеанс</h2>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">Оберіть фільм</label>
                            <select
                                required
                                className="bg-[#1A1A1F] border border-gray-800 rounded-xl p-4 text-white outline-none focus:border-[#E12E2E] transition-all"
                                value={newSession.movieId}
                                onChange={e => setNewSession({...newSession, movieId: e.target.value})}
                            >
                                <option value="">Назва фільму...</option>
                                {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">Час початку</label>
                            <input
                                type="datetime-local"
                                required
                                className="bg-[#1A1A1F] border border-gray-800 rounded-xl p-4 text-white outline-none focus:border-[#E12E2E]"
                                value={newSession.startTime}
                                onChange={e => setNewSession({...newSession, startTime: e.target.value})}
                            />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <button type="button" onClick={() => setIsCreateOpen(false)} className="flex-1 text-gray-500 font-bold hover:text-white transition-colors">Скасувати</button>
                            <button type="submit" className="flex-1 bg-[#E12E2E] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#E12E2E]/20">Створити</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default HallSessionsPage;