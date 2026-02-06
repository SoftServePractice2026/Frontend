import { useEffect, useState } from "react";
import { api } from "@/shared/api/base.ts";
import {useAuth} from "@/app/providers/AuthProvider.tsx";

interface IdentityDetailsDto {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    roles: string[];
    phoneNumber?: string;
    language?: string;
}

const ProfilePage = () => {
    const [userData, setUserData] = useState<IdentityDetailsDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { updateUserInfo } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/v1/me");
                console.log("Дані профілю:", response.data);
                setUserData(response.data);
            } catch (error: any) {
                console.error("Помилка завантаження:", error.response?.status, error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => {
            if (!prev) return null;
            return { ...prev, [name]: value };
        });
    };

    const handleSave = async () => {
        if (!userData) return;

        try {
            const payload = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                birthDate: userData.birthDate,
                phoneNumber: userData.phoneNumber,
            };

            const response = await api.put("/v1/update", payload);

            if (response.status === 200) {

                updateUserInfo({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                });

                alert("Дані успішно збережено!")
                setUserData(response.data);
            }
        } catch (error: any) {
            console.error("Помилка збереження:", error.response?.data || error.message);
            alert("Не вдалося зберегти дані. Перевірте консоль для деталей.");
        }
    };

    if (isLoading) return <div className="text-white p-10 text-center font-light">Синхронізація...</div>;


    if (!userData) return <div className="text-white p-10 text-center font-light">Профіль не знайдено</div>;

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="mb-10">
                <h1 className="text-white text-3xl font-bold mb-1 tracking-tight">Особистий профіль</h1>
                <p className="text-gray-500 text-sm font-light">Керуйте своїм профілем та налаштуваннями</p>
            </div>

            <div className="bg-[#16161C] border border-gray-800/40 rounded-[32px] p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-12 border-b border-gray-800/30 pb-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-[#E12E2E] rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-[#E12E2E]/20">
                            {userData.firstName?.charAt(0) || "U"}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-white text-2xl font-bold tracking-tight">
                                {userData.firstName} {userData.lastName}
                            </h2>
                            <p className="text-gray-500 text-sm italic font-light">{userData.email}</p>
                            <div className="flex gap-2 mt-2">
                                {userData.roles?.map(role => (
                                    <span key={role} className="text-[10px] bg-[#E12E2E]/10 text-[#E12E2E] px-2 py-0.5 rounded border border-[#E12E2E]/20 uppercase font-bold tracking-tighter">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="bg-[#E12E2E]/10 border border-[#E12E2E]/50 text-[#E12E2E] px-10 py-3 rounded-xl font-bold hover:bg-[#E12E2E] hover:text-white transition-all active:scale-95 shadow-lg shadow-[#E12E2E]/5"
                    >
                        Зберегти
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest text-[10px]">Ім'я</label>
                        <input
                            name="firstName"
                            value={userData.firstName || ""}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all focus:ring-1 focus:ring-[#E12E2E]/30"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest text-[10px]">Прізвище</label>
                        <input
                            name="lastName"
                            value={userData.lastName || ""}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all focus:ring-1 focus:ring-[#E12E2E]/30"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest text-[10px]">День народження</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={userData.birthDate ? userData.birthDate.split('T')[0] : ""}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest text-[10px]">Номер телефону</label>
                        <input
                            name="phoneNumber"
                            placeholder="Не вказано"
                            value={userData.phoneNumber || ""}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all placeholder:text-gray-700 font-light"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest text-[10px]">Мова</label>
                        <select
                            name="language"
                            value={userData.language || "Українська"}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] outline-none transition-all cursor-pointer appearance-none"
                        >
                            <option value="Українська">Українська</option>
                            <option value="English">English</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest text-[10px]">Пошта</label>
                        <input
                            name="email"
                            value={userData.email}
                            disabled
                            className="bg-[#232328]/50 border border-gray-800/50 rounded-xl p-4 text-gray-500 cursor-not-allowed font-light"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;