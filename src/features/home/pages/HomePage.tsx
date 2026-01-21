import { ThemeToggle } from "@/features/theme";

const HomePage = () => {
    return (
        <>
            <div className="">
                <h1 className="text-3xl font-bold underline text-red-900 dark:text-lime-900">
                    Home Page
                </h1>
                <ThemeToggle />
            </div>
        </>
    );
}

export default HomePage