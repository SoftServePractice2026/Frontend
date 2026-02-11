import { useState } from "react";
import type { FormEvent } from "react";
import { PaymentForm } from "./payment-parts/PaymentForm";
import { PaymentProcessing, PaymentSuccess } from "./payment-parts/PaymentStatus";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalPrice: number;
    movieTitle: string;
    seats: string[];
    onSuccess: () => void;
}

export const PaymentModal = ({ isOpen, onClose, totalPrice, movieTitle, seats, onSuccess }: PaymentModalProps) => {
    const [status, setStatus] = useState<'form' | 'processing' | 'success'>('form');

    if (!isOpen) return null;

    const handlePay = (e: FormEvent) => {
        e.preventDefault();
        setStatus('processing');

        setTimeout(() => {
            setStatus('success');
            onSuccess();
            setTimeout(() => onClose(), 3000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-white dark:bg-[#121217] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-colors duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                    <span className="text-xl font-bold">✕</span>
                </button>

                {status === 'form' && <PaymentForm onSubmit={handlePay} totalPrice={totalPrice} movieTitle={movieTitle} seats={seats} />}
                {status === 'processing' && <PaymentProcessing totalPrice={totalPrice} movieTitle={movieTitle} seats={seats} />}
                {status === 'success' && <PaymentSuccess totalPrice={totalPrice} movieTitle={movieTitle} seats={seats} />}
            </div>
        </div>
    );
};