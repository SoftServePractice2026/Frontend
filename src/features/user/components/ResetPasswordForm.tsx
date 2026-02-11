import Input from "@/shared/ui/Input";
import { Popup, type PopupType } from "@/shared/ui/Popup";
import SubmitButton from "@/shared/ui/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import z from "zod";
import type { RecoveryPasswordRequest } from "../types";
import { api } from "@/shared/api/Axios";
import type { AppError } from "@/shared/types/errors";

//Validation
const resetPasswordSchema = z.object({
    password: z.string().min(6, "Мінімум 6 символів").regex(/^(?=.*[A-Z])(?=.*\d).{6,}$/, "Мінімум 1 велика літера і 1 цифра"),
})

//Type for validation schema
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const params = {
        email: searchParams.get("email"),
        token: searchParams.get("token"),
    };

    const [popup, setPopup] = useState<{
        open: boolean;
        type: PopupType;
        message: string;
    }>({
        open: false,
        type: "success",
        message: "",
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSumbit = async (data: ResetPasswordFormValues) => {
        const request: RecoveryPasswordRequest = {
            email: params.email!,
            token: params.token!,
            newPassword: data.password,
        };

        try {
            await api.post("/v1/reset-password", request)

            setPopup({
                open: true,
                type: "success",
                message: "Пароль успішно зміненно",
            });
        } catch (err) {
            const error = err as AppError;
            console.log(error);
            switch (error.kind) {
                case "validation":
                    const firstField = Object.keys(error.errors)[0];
                    const firstMessage = error.errors[firstField][0];
                    setPopup({
                        open: true,
                        type: "error",
                        message: firstMessage,
                    });
                    break;

                case "business":
                    setPopup({
                        open: true,
                        type: "error",
                        message: error.message,
                    });
                    break;

                default:
                    setPopup({
                        open: true,
                        type: "error",
                        message: "Сталася невідома помилка",
                    });
            }
        }
    }

    useEffect(() => {
        if (params.token == undefined || params.token == "" || params.token == null) {
            navigate("/");
        }

        if (params.email == undefined || params.email == "" || params.email == null) {
            navigate("/");
        }

    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSumbit)} className={clsx(
                "z-10 mt-10 mb-5",
            )}>
                <div className={clsx(
                    "p-3 sm:p-[45px] dark:bg-primary-dark/[7%]",
                    "border rounded-3xl dark:border-primary-dark/[14%] flex flex-col gap-5 sm:gap-3 md:gap-5"
                )}>
                    <h1 className={clsx(
                        "text-primary-light dark:text-primary-dark",
                        "font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl text-center"
                    )}>Відновлення паролю</h1>

                    <p className={clsx(
                        "text-[#D8D8D8] dark:text-primary-dark",
                        "max-w-[400px] text-center text-base"
                    )}>Введіть новий пароль</p>

                    <Input
                        id="email"
                        label="Пошта"
                        type="text"
                        value={params.email!}
                        disabled
                    />

                    <Input
                        id="password"
                        label="Пароль"
                        type="password"
                        placeholder="Введіть пароль..."
                        {...register("password")}
                        error={errors.password?.message}
                    />

                    <SubmitButton disabled={isSubmitting} className="text-sm font-bolder">Зберегти</SubmitButton>
                </div>
            </form>

            <Popup
                open={popup.open}
                type={popup.type}
                message={popup.message}
                autoCloseMs={5000}
                onClose={() => setPopup({ ...popup, open: false })}
                redirect="/"
            />
        </>
    );
}

export default ResetPasswordForm;