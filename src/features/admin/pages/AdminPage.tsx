import { useEffect, useState } from "react";
import clsx from 'clsx';
import { useNavigate } from "react-router-dom";
import { api } from "@/shared/api/base.ts";
import { format, addDays, startOfToday } from 'date-fns';
import { uk } from 'date-fns/locale'; // Для української мови

interface HallDetailsDto {
    id: string;
    name: string;
    isActive: boolean;
    hallSize: number;
}

const AdminPage = () => {
    const navigate = useNavigate();

    const [halls, setHalls] = useState<HallDetailsDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [activeTab, setActiveTab] = useState<'today' | 'tomorrow' | 'custom'>('today');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());

    const getHallSizeLabel = (size: number) => {
        const sizes = ["Small", "Medium", "Large"];
        return sizes[size] || "Unknown";
    };

    useEffect(() => {
        const fetchHalls = async () => {
            setIsLoading(true);
            try {
                const dateParam = format(selectedDate, 'yyyy-MM-dd');
                const response = await api.get(`/halls?date=${dateParam}`);
                setHalls(response.data);
            } catch (error) {
                console.error("Помилка завантаження залів:", error);
                const mockHalls: HallDetailsDto[] = [
                    { id: "1", name: "Зал A", isActive: true, hallSize: 1 },
                    { id: "2", name: "Зал B", isActive: true, hallSize: 2 },
                    { id: "3", name: "IMAX VIP", isActive: false, hallSize: 0 },
                ]
                setHalls(mockHalls);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHalls();
    }, [selectedDate]);

    return (
        <div className="max-w-4xl mx-auto relative">
            <div className="flex items-center gap-10 mb-8 border-b border-gray-800 relative">
                <div className="relative pb-4">
                    <button
                        onClick={() => {
                            setActiveTab('today');
                            setSelectedDate(startOfToday());
                        }}
                        className={clsx(
                            "text-xl font-medium transition-colors",
                            activeTab === 'today' ? "text-[#E12E2E]" : "text-gray-400 hover:text-white"
                        )}
                    >
                        Сьогодні
                    </button>
                    {activeTab === 'today' && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E12E2E]" />
                    )}
                </div>

                <div className="relative pb-4">
                    <button
                        onClick={() => {
                            setActiveTab('tomorrow');
                            setSelectedDate(addDays(startOfToday(), 1));
                        }}
                        className={clsx(
                            "text-xl font-medium transition-colors",
                            activeTab === 'tomorrow' ? "text-[#E12E2E]" : "text-gray-400 hover:text-white"
                        )}
                    >
                        Завтра
                    </button>
                    {activeTab === 'tomorrow' && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E12E2E]" />
                    )}
                </div>

                <div className="pb-4 ml-2">
                    <button
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className={clsx(
                            "transition-all",
                            isCalendarOpen ? "text-[#E12E2E]" : "text-white hover:opacity-80"
                        )}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {isCalendarOpen && (
                    <div className="absolute top-full left-[180px] mt-4 z-50 bg-[#1A1A1F] border border-gray-800 rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[320px] backdrop-blur-md">
                        <div className="flex justify-between items-center mb-6 px-2 text-white font-semibold capitalize">
                            <span>{format(selectedDate, 'LLLL yyyy', { locale: uk })}</span>
                        </div>
                        <div className="grid grid-cols-7 mb-4">
                            {['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map(day => (
                                <span key={day} className="text-[10px] text-gray-600 font-bold text-center">{day}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-1">
                            {Array.from({ length: 28 }, (_, i) => i + 1).map(date => (
                                <div key={date} className="flex justify-center items-center">
                                    <button
                                        onClick={() => {
                                            const newDate = new Date(2026, 1, date);
                                            setSelectedDate(newDate);
                                            setActiveTab('custom');
                                            setIsCalendarOpen(false);
                                        }}
                                        className={clsx(
                                            "h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all",
                                            selectedDate.getDate() === date ? "bg-[#E12E2E] text-white font-bold shadow-[0_0_20px_rgba(225,46,46,0.3)]" : "text-gray-400 hover:bg-white/10"
                                        )}
                                    >
                                        {date}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <h2 className="text-gray-400 text-sm font-light capitalize">
                    {format(selectedDate, 'd MMMM, eeee', { locale: uk })}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {halls.map((hall) => (
                    <div
                        key={hall.id}
                        onClick={() => navigate(`/admin/hall/${hall.id}`)}
                        className="bg-[#1A1A1F] border border-gray-800 hover:border-[#E12E2E]/50 p-6 rounded-[24px] flex justify-between items-center cursor-pointer transition-all duration-300 group shadow-lg"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-bold text-white group-hover:text-[#E12E2E] transition-colors">
                                    {hall.name}
                                </span>
                                <span className={clsx(
                                    "w-2 h-2 rounded-full",
                                    hall.isActive ? "bg-green-500 animate-pulse" : "bg-gray-600"
                                )}></span>
                            </div>
                            <div className="flex gap-4 text-xs text-gray-500 font-medium">
                                <span>Тип: {getHallSizeLabel(hall.hallSize)}</span>
                                <span>•</span>
                                <span className="text-gray-600">ID: {hall.id}</span>
                            </div>
                        </div>
                        <div className="bg-[#232328] w-10 h-10 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-[#E12E2E] group-hover:text-white transition-all shadow-inner">
                            <span className="text-2xl font-light mb-1">›</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;