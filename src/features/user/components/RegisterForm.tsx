import Input from "@/shared/ui/Input";
import type { RegisterRequest } from "../types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import SubmitButton from "@/shared/ui/SubmitButton";
import { Link } from "react-router-dom";

//Validation schema
const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Мінімум 6 символів").regex(/^(?=.*[A-Z])(?=.*\d).{6,}$/, "Мінімум 1 велика літера і 1 цифра"),
    birthDate: z.string().min(1, "Birth date is required"),
})

//Type for validation schema
type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    })

    const onSumbit = (data: RegisterFormValues) => {
        console.log("Register data: ", data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSumbit)} className={clsx(
                "z-10 mt-10 mb-5",
            )}>
                <div className={clsx(
                    "p-3 sm:p-[30px] dark:bg-primary-dark/[7%]",
                    "border rounded-3xl dark:border-primary-dark/[14%] flex flex-col gap-5 sm:gap-3 md:gap-5"
                )}>
                    <h1 className={clsx(
                        "text-primary-light dark:text-primary-dark",
                        "font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl text-center"
                    )}>Зареєструватися</h1>

                    <div className={clsx("flex gap-5 flex-col sm:gap-3 md:flex-row md:gap-12")}>
                        <Input
                            id="firstName"
                            label="Ім'я"
                            type="text"
                            placeholder="Напр: Олександр"
                            {...register("firstName")}
                            error={errors.firstName?.message}
                        />
                        <Input
                            id="lastName"
                            label="Призвіще"
                            type="text"
                            placeholder="Напр: Мельник"
                            {...register("lastName")}
                            error={errors.lastName?.message}
                        />
                    </div>

                    <Input
                        id="email"
                        label="Пошта"
                        type="text"
                        placeholder="Напр: your_email@gmail.com"
                        {...register("email")}
                        error={errors.email?.message}
                    />

                    <Input
                        id="birthDate"
                        label="Дата народження"
                        type="date"
                        placeholder="01.01.2001"
                        {...register("birthDate")}
                        error={errors.birthDate?.message}
                    />

                    <Input
                        id="password"
                        label="Пароль"
                        type="password"
                        placeholder="Придумайте надійний пароль"
                        {...register("password")}
                        error={errors.password?.message}
                    />

                    <SubmitButton disabled={isSubmitting}>Зареєструватися</SubmitButton>

                    <p className={clsx(
                        "font-bebasNeue text-primary-light dark:text-primary-dark text-center tracking-[0,02px]",
                    )}>Потрібна допомога? <Link to={"/"} className={clsx(
                        "text-accent-light_second dark:text-accent-dark_second"
                    )}>Напишіть нам</Link></p>
                </div>
            </form>
        </>
    );
}

export default RegisterForm;