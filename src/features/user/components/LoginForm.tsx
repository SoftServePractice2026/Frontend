import { useAuth } from "@/app/providers/AuthProvider";
import Input from "@/shared/ui/Input";
import { Popup, type PopupType } from "@/shared/ui/Popup";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z, { email } from "zod";
import type { LoginRequest } from "../types";
import type { AppError } from "@/shared/types/errors";
import SubmitButton from "@/shared/ui/SubmitButton";
import { Link } from "react-router-dom";

//Validation
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

//Type for validation schema
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {

    const [popup, setPopup] = useState<{
        open: boolean;
        type: PopupType;
        message: string;
    }>({
        open: false,
        type: "success",
        message: "",
    });

    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const onSumbit = async (data: LoginFormValues) => {
        const request: LoginRequest = {
            email: data.email,
            password: data.password,
        }

        try {
            await login(request);
            setPopup({
                open: true,
                type: "success",
                message: "Дані успішно збережено",
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
                    )}>Вхід</h1>

                    <Input
                        id="email"
                        label="Пошта"
                        type="text"
                        placeholder="Напр: your_email@gmail.com"
                        {...register("email")}
                        error={errors.email?.message}
                    />

                    <Input
                        id="password"
                        label="Пароль"
                        type="password"
                        placeholder="Введіть пароль..."
                        {...register("password")}
                        error={errors.password?.message}
                    />

                    <div className={clsx(
                        "flex gap-[20px] sm:gap-[80px]"
                    )}>
                        <Link to="/recovery" className={clsx(
                            "text-secondary-light dark:text-secondary-dark"
                        )}>Забули пароль?</Link>
                        <Link to="/registration" className={clsx(
                            "text-primary-light dark:text-primary-dark",
                            "font-montserrat font-medium"
                        )}>Створити акаунт</Link>
                    </div>

                    <SubmitButton disabled={isSubmitting}>Увійти</SubmitButton>
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
export default LoginForm;