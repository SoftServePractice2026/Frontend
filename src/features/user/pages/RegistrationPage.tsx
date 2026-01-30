import clsx from "clsx";
import RegisterForm from "../components/RegisterForm";

const RegistrationPage = () => {



    return (
        <>
            <div className={clsx(
                "flex-1 flex items-center justify-center relative",
            )}>
                {/* { Градієнти } */}
                <div className={clsx(
                    "absolute inset-0 z-0 bg-gradient-to-b",
                    "from-[#FFFFFC] via-[#F5F5F5]/50 to-[#FFFFFC]",
                    "dark:from-[#0A0A0FCC] dark:via-[#0A0A0F99] dark:to-[#0A0A0F]"
                )} />
                <div className={clsx(
                    "absolute inset-0 z-0",
                    "",
                    "dark:bg-[radial-gradient(circle_at_center,#C8102E66_0,1%,_transparent_40%,_#0A0A0F_100%)]"
                )} />
                
                <RegisterForm />
            </div>
        </>
    );
}

export default RegistrationPage;