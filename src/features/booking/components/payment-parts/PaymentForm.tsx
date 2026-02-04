
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import clsx from "clsx";

interface PaymentFormProps {
    onSubmit: (e: FormEvent) => void;
    totalPrice: number;
    movieTitle: string;
    seats: string[];
}

export const PaymentForm = ({ onSubmit, totalPrice, movieTitle, seats }: PaymentFormProps) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");

    // Стан для повідомлень про помилки
    const [errors, setErrors] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        name: ""
    });

    const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 16);
        setCardNumber(value.replace(/(\d{4})(?=\d)/g, "$1 "));
        if (errors.cardNumber) setErrors({ ...errors, cardNumber: "" });
    };

    const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2);
        setExpiry(value);
        if (errors.expiry) setErrors({ ...errors, expiry: "" });
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        const newErrors = {
            cardNumber: cardNumber.length < 19 ? "Введіть 16 цифр номера картки" : "",
            expiry: expiry.length < 5 ? "Вкажіть термін (ММ/РР)" : "",
            cvv: cvv.length < 3 ? "Введіть 3 цифри" : "",
            name: name.trim().length < 2 ? "Введіть ім'я власника" : ""
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error !== "")) {
            onSubmit(e);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-montserrat">Оплата</h2>

            <div className="bg-gray-100 dark:bg-gray-800/30 p-3 rounded-lg text-xs border border-gray-200 dark:border-gray-700/50">
                <p className="text-gray-900 dark:text-white font-bold">{movieTitle}</p>
                <p className="text-yellow-600 dark:text-yellow-500 mt-1 font-mono">🎫 Місця: {seats.join(", ")}</p>
                <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-base font-montserrat">
                    <span className="text-gray-500 dark:text-gray-400">Разом:</span>
                    <span className="text-red-600 font-bold">{totalPrice} ₴</span>
                </div>
            </div>

            <div className="space-y-4">
                {/* Номер картки */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text" value={cardNumber} onChange={handleCardChange} placeholder="Номер картки"
                        className={clsx(
                            "w-full bg-gray-50 dark:bg-[#0A0A0F] border rounded-lg p-3 text-sm text-gray-900 dark:text-white outline-none transition-all",
                            errors.cardNumber ? "border-red-500 shadow-[0_0_0_1px_#ef4444]" : "border-gray-200 dark:border-gray-700 focus:border-red-600"
                        )}
                    />
                    {errors.cardNumber && <span className="text-[10px] text-red-500 px-1">{errors.cardNumber}</span>}
                </div>

                <div className="flex gap-3">
                    {/* Термін дії */}
                    <div className="w-1/2 flex flex-col gap-1">
                        <input
                            type="text" value={expiry} onChange={handleExpiryChange} placeholder="MM/RR"
                            className={clsx(
                                "w-full bg-gray-50 dark:bg-[#0A0A0F] border rounded-lg p-3 text-sm text-gray-900 dark:text-white outline-none transition-all text-center",
                                errors.expiry ? "border-red-500 shadow-[0_0_0_1px_#ef4444]" : "border-gray-200 dark:border-gray-700 focus:border-red-600"
                            )}
                        />
                        {errors.expiry && <span className="text-[10px] text-red-500 px-1">{errors.expiry}</span>}
                    </div>
                    {/* CVV */}
                    <div className="w-1/2 flex flex-col gap-1">
                        <input
                            type="password" value={cvv}
                            onChange={(e) => {
                                setCvv(e.target.value.replace(/\D/g, "").slice(0, 3));
                                if (errors.cvv) setErrors({ ...errors, cvv: "" });
                            }}
                            placeholder="CVV"
                            className={clsx(
                                "w-full bg-gray-50 dark:bg-[#0A0A0F] border rounded-lg p-3 text-sm text-gray-900 dark:text-white outline-none transition-all text-center",
                                errors.cvv ? "border-red-500 shadow-[0_0_0_1px_#ef4444]" : "border-gray-200 dark:border-gray-700 focus:border-red-600"
                            )}
                        />
                        {errors.cvv && <span className="text-[10px] text-red-500 px-1">{errors.cvv}</span>}
                    </div>
                </div>

                {/* Ім'я */}
                <div className="flex flex-col gap-1">
                    <input
                        type="text" value={name}
                        onChange={(e) => {
                            setName(e.target.value.toUpperCase());
                            if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="ІМ'Я ВЛАСНИКА"
                        className={clsx(
                            "w-full bg-gray-50 dark:bg-[#0A0A0F] border rounded-lg p-3 text-sm text-gray-900 dark:text-white outline-none transition-all uppercase",
                            errors.name ? "border-red-500 shadow-[0_0_0_1px_#ef4444]" : "border-gray-200 dark:border-gray-700 focus:border-red-600"
                        )}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 px-1">{errors.name}</span>}
                </div>
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all active:scale-95 mt-2 font-montserrat">
                Сплатити {totalPrice} ₴
            </button>
        </form>
    );
};