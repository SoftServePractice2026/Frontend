import Button from "@/shared/ui/Button";
import clsx from "clsx";

const HomePage = () => {

    const statisticHeaderClassName = clsx(
        "text-accent-light dark:text-accent-dark",
        "text-4xl font-bebasNeue"
    );
    const statisticDescriptionClassName = clsx(
        "text-description-light dark:text-description-dark",
        "text-sm font-montserrat"
    );

    return (
        <>
            <div className={clsx(
                "bg-[url(src/assets/images/home_background.png)] bg-cover bg-center flex-1 flex flex-col items-center justify-center relative",
                "",
            )}
            >
                {/* { Градієнти } */}
                <div className={clsx(
                    "absolute inset-0 z-0 bg-gradient-to-b",
                    "from-[#FFF2E0], via-[#FFF8F0], to-[#FFE6D2]",
                    "dark:from-[#0A0A0FCC] dark:via-[#0A0A0F99] dark:to-[#0A0A0F]"
                )} />
                <div className={clsx(
                    "absolute inset-0 z-0 bg-gradient-to-r ",
                    "from-[#FFE0C8] via-[#FFF8F000] to-[#FFE0C8]",
                    "dark:from-[#0A0A0F] dark:via-[#0A0A0F00] dark:to-[#0A0A0F80]"
                )} />

                {/* { Основний контент } */}
                <div className={clsx("flex flex-col items-center justify-center z-10")}>
                    <div className={clsx("text-center mb-16")}>
                        <h1 className={clsx("mb-7")}>
                            <span className={clsx(
                                "",
                                "text-primary-light dark:text-primary-dark uppercase",
                                "font-montserrat font-bold text-7xl"
                            )}
                            >всесвіт</span><br />
                            <span className={clsx(
                                "text-secondary-light dark:text-secondary-dark uppercase",
                                "font-montserrat font-bold text-7xl"
                            )}
                            >кінематографу</span>
                        </h1>
                        <p className={clsx("text-description-light dark:text-description-dark max-w-2xl font-montserrat font-base")}>Ми зібрали актуальну афішу, зручний розклад і швидке бронювання квитків в одному місці. Обирай фільм, знаходь зручний сеанс і насолоджуйся кіно </p>
                    </div>
                    <Button className={clsx("px-20 py-4 mb-16 font-semibold")}>Переглянути афішу</Button>
                    <div className={clsx("flex gap-16")}>
                        <p className={clsx("flex flex-col items-center")}>
                            <span className={statisticHeaderClassName}>10+</span>
                            <span className={statisticDescriptionClassName}>Фільмів</span>
                        </p>
                        <p className={clsx("flex flex-col items-center")}>
                            <span className={statisticHeaderClassName}>6</span>
                            <span className={statisticDescriptionClassName}>Різних залів</span>
                        </p>
                        <p className={clsx("flex flex-col items-center")}>
                            <span className={statisticHeaderClassName}>3D</span>
                            <span className={statisticDescriptionClassName}>Формати</span>
                        </p>
                        <p className={clsx("flex flex-col items-center")}>
                            <span className={statisticHeaderClassName}>4DX</span>
                            <span className={statisticDescriptionClassName}>Доступно</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage