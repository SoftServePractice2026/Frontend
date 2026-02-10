import clsx from "clsx";
import type { SessionListItemDto } from "../types";

interface SessionCardProps {
  session: SessionListItemDto;
  onClick: (session: SessionListItemDto) => void;
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
};

const SessionCard = ({ session, onClick }: SessionCardProps) => {
  return (
    <button
      onClick={() => onClick(session)}
      className={clsx(
        "flex flex-col items-center py-6 px-4",
        "bg-primary-light/[0.03] dark:bg-primary-dark/[0.03]",
        "border border-primary-light/10 dark:border-primary-dark/10",
        "rounded-2xl cursor-pointer font-montserrat",
        "transition-all duration-200",
        "hover:border-primary-light/20 dark:hover:border-primary-dark/20",
        "hover:-translate-y-0.5",
      )}
    >
      <span className="text-[28px] font-extrabold text-primary-light dark:text-primary-dark leading-none">
        {formatTime(session.startTime)}
      </span>
      <span className="text-[13px] text-description-light dark:text-description-dark mt-2">
        {formatTime(session.endTime)}
      </span>
      <span className="text-sm font-bold mt-2 text-accent-dark_second">
        {session.hallName}
      </span>
    </button>
  );
};

export default SessionCard;
