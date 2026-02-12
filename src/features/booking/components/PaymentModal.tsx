import { useState } from "react";
import { PaymentForm } from "./payment-parts/PaymentForm";
import { PaymentProcessing, PaymentSuccess } from "./payment-parts/PaymentStatus";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalPrice: number;
    movieTitle: string;
    seats: string[];
    onSuccess: () => Promise<void>;
}

export const PaymentModal = ({ isOpen, onClose, totalPrice, movieTitle, seats, onSuccess }: PaymentModalProps) => {
    const [status, setStatus] = useState<'form' | 'processing' | 'success'>('form');

    const currentData = { totalPrice, movieTitle, seats };

    if (!isOpen) return null;

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('processing');

        try {
            await onSuccess();
            setStatus('success');

            setTimeout(() => {
                onClose();
            }, 4000);
        } catch {
            setStatus('form');
            alert("Оплата не пройшла. Спробуйте ще раз.");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-md bg-white dark:bg-[#121217] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl relative transition-all duration-300">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                    <span className="text-2xl font-light">✕</span>
                </button>

                <div className="mt-2">
                    {status === 'form' && (
                        <PaymentForm onSubmit={handlePay} totalPrice={currentData.totalPrice} movieTitle={currentData.movieTitle} seats={currentData.seats} />
                    )}

                    {status === 'processing' && (
                        <PaymentProcessing totalPrice={currentData.totalPrice} movieTitle={currentData.movieTitle} seats={currentData.seats} />
                    )}

                    {status === 'success' && (
                        <div className="animate-in zoom-in-95 duration-500">
                            <PaymentSuccess totalPrice={currentData.totalPrice} movieTitle={currentData.movieTitle} seats={currentData.seats} />
                            <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                                <p className="text-green-400 text-sm font-medium">Квиток додано в особистий кабінет!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};