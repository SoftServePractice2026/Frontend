import { useEffect, useState } from "react";
import { api } from "@/shared/api/base.ts";

// Твоя DTO: IdentityDetailsDto(Guid Id, string Name, string Email, IEnumerable<string> Roles)
interface IdentityDetailsDto {
    id: string;
    name: string;
    email: string;
    roles: string[];
    // Додаткові поля для форми (можуть бути null на бекенді)
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
    birthDate?: string;
    language?: string;
}

const ProfilePage = () => {
    const [userData, setUserData] = useState<IdentityDetailsDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/auth/me");
                setUserData(response.data);
            } catch (error) {
                console.error("Помилка завантаження:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData((prev: IdentityDetailsDto | null) => {
            if (!prev) return null;
            return { ...prev, [name]: value };
        });
    };

    const handleSave = async () => {
        try {
            await api.put("/auth/me", userData);
            alert("Дані успішно збережено!");
        } catch (error) {
            console.error("Помилка збереження:", error);
            alert("Не вдалося зберегти дані.");
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
                        <div className="w-20 h-20 bg-[#E12E2E] rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-[#E12E2E]/10">
                            {userData.name?.charAt(0) || userData.firstName?.charAt(0)}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-white text-2xl font-bold tracking-tight">
                                {userData.name || `${userData.firstName} ${userData.lastName}`}
                            </h2>
                            <p className="text-gray-500 text-sm italic font-light">{userData.email}</p>
                            {/* Відображення ролей з твого IdentityDetailsDto */}
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
                        className="bg-[#E12E2E]/10 border border-[#E12E2E]/50 text-[#E12E2E] px-10 py-3 rounded-xl font-bold hover:bg-[#E12E2E] hover:text-white transition-all active:scale-95"
                    >
                        Зберегти
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest">Ім'я</label>
                        <input
                            name="firstName"
                            value={userData.firstName || ""}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest">Номер телефону</label>
                        <input
                            name="phone"
                            placeholder="Не вказано"
                            value={userData.phone || ""}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all placeholder:text-gray-700"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest">Пароль</label>
                        <input
                            type="password"
                            placeholder="********"
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest">Прізвище</label>
                        <input
                            name="lastName"
                            value={userData.lastName || ""}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest">День народження</label>
                        <input
                            name="birthDate"
                            placeholder="Не вказано"
                            value={userData.birthDate || ""}
                            onChange={handleChange}
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-white focus:border-[#E12E2E] focus:outline-none transition-all placeholder:text-gray-700"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest">Пошта</label>
                        <input
                            name="email"
                            value={userData.email}
                            disabled
                            className="bg-[#232328] border border-gray-800 rounded-xl p-4 text-gray-500 cursor-not-allowed opacity-60 font-light"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-xs font-semibold ml-1 uppercase tracking-widest">Мова</label>
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
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;