import { Link } from "react-router-dom";
import clsx from "clsx";
import Button from "@/shared/ui/Button";

const NotFoundPage = () => {
    return (

        <div className={clsx(
            "min-h-screen",
            "flex flex-col items-center justify-center",
            "px-4",
            "bg-primary-dark",
            "dark:bg-primary-light"
            )}>

                <div className="text-center max-w-md">
                    <h1 className={clsx(
                        "text-[120px] sm:text-[150px] md:text-[180px] font-bold",
                        "text-gray-900 dark:text-primary-dark",
                    "mb-2"
                )}>
                    404

                </h1>

                <Link to="/">
                    <Button className={clsx(
                        "text-[20px] font-bold",
                        "px-12 py-6 rounded-lg",
                    )}>
                        Повернутися на головну
                    </Button>
                </Link>

            </div>
        </div>
    );
};

export default NotFoundPage;