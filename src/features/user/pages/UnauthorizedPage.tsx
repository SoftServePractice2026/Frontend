import Button from "@/shared/ui/Button";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    return (
        <div className={clsx(
            "flex flex-col items-center justify-center",
            "h-screen bg-gray-100 dark:bg-gray-900",
            "text-center px-4"
        )}>
            <h1 className={clsx(
                "text-6xl font-bold text-secondary-light dark:text-secondary-dark"
            )}>
                401
            </h1>
            <p className={clsx(
                "mt-4 text-xl text-gray-700 dark:text-gray-300"
            )}>
                У вас немає доступу до цієї сторінки.
            </p>
            <p className={clsx(
                "mt-2 text-gray-500 dark:text-gray-400"
            )}>
                Будь ласка, увійдіть або зверніться до адміністратора.
            </p>
            <Button
                className={clsx("mt-6")}
                onClick={() => navigate("/")}
            >
                На головну
            </Button>
        </div>
    );
};

export default UnauthorizedPage;