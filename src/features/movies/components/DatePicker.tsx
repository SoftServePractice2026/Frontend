import clsx from "clsx";
import type { DateOption } from "../types";

interface DatePickerProps {
  dates: DateOption[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const DatePicker = ({ dates, selectedDate, onDateSelect }: DatePickerProps) => {
  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-1">
      {dates.map((date) => {
        const isActive = selectedDate === date.value;
        return (
          <button
            key={date.value}
            onClick={() => onDateSelect(date.value)}
            className={clsx(
              "flex flex-col items-center py-3.5 w-[72px] shrink-0",
              "rounded-xl border-[1.5px] cursor-pointer",
              "transition-all duration-200 font-montserrat",
              isActive
                ? "bg-secondary-dark/10 border-secondary-dark"
                : [
                    "bg-transparent",
                    "border-primary-light/15 dark:border-primary-dark/15",
                    "hover:border-primary-light/30 dark:hover:border-primary-dark/30",
                  ],
            )}
          >
            <span
              className={clsx(
                "text-xs font-bold uppercase mb-1",
                isActive
                  ? "text-secondary-dark"
                  : "text-description-light dark:text-description-dark",
              )}
            >
              {date.day}
            </span>
            <span
              className={clsx(
                "text-[26px] font-extrabold leading-none",
                isActive
                  ? "text-secondary-dark"
                  : "text-primary-light dark:text-primary-dark",
              )}
            >
              {date.date}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DatePicker;
