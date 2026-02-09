import clsx from "clsx";
import type { MovieDetailsDto } from "../types";

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "#C8102E" : "none"}
    stroke={filled ? "#C8102E" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

interface MovieInfoProps {
  movie: MovieDetailsDto;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieInfo = ({ movie, isFavorite, onToggleFavorite }: MovieInfoProps) => {
  const rentalStartFormatted = new Date(movie.rentalStartDate).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-12 items-start">
      <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:sticky md:top-24 max-w-[240px] mx-auto md:max-w-none">
        <img src={movie.poster} alt={movie.title} className="w-full block" />
      </div>

      <div className="min-w-0">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 mb-2">
          <div>
            <h1
              className={clsx(
                "font-montserrat font-extrabold leading-tight",
                "text-2xl sm:text-3xl lg:text-4xl",
                "text-primary-light dark:text-primary-dark",
              )}
            >
              {movie.title}
            </h1>
          </div>

          <button
            onClick={onToggleFavorite}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-lg border shrink-0",
              "font-montserrat text-sm font-medium transition-all duration-200 cursor-pointer",
              isFavorite
                ? "bg-secondary-dark/10 border-secondary-dark/40 text-secondary-dark"
                : [
                    "bg-transparent",
                    "border-primary-light/15 dark:border-primary-dark/15",
                    "text-description-light dark:text-description-dark",
                    "hover:border-primary-light/30 dark:hover:border-primary-dark/30",
                  ],
            )}
          >
            <HeartIcon filled={isFavorite} />
            {isFavorite ? "В обраному" : "Додати в обране"}
          </button>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 my-6 flex-wrap">
          <div className="flex items-center gap-1.5">
            <StarIcon />
            <span className="text-accent-dark_second font-bold text-base font-montserrat">
              {movie.rating}
            </span>
          </div>

          <span
            className={clsx(
              "px-3 py-1 rounded-md text-sm font-bold font-montserrat",
              "bg-primary-light/5 dark:bg-primary-dark/10",
              "border border-primary-light/10 dark:border-primary-dark/10",
              "text-primary-light dark:text-primary-dark",
            )}
          >
            {movie.ageRating}+
          </span>

          <div className="flex items-center gap-1.5 text-description-light dark:text-description-dark">
            <ClockIcon />
            <span className="text-[15px] font-medium font-montserrat">
              {movie.duration} хв
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-description-light dark:text-description-dark">
            <CalendarIcon />
            <span className="text-[15px] font-medium font-montserrat">
              {movie.year}
            </span>
          </div>
        </div>

        <div className="flex gap-2.5 mb-8 flex-wrap">
          {movie.genres.map((g) => (
            <span
              key={g}
              className={clsx(
                "px-5 py-2 rounded-full text-sm font-semibold font-montserrat",
                "bg-accent-dark_second/10 border border-accent-dark_second/25 text-accent-dark_second",
              )}
            >
              {g}
            </span>
          ))}
        </div>

        <div className="mb-7">
          <h3 className="text-[13px] font-bold text-description-light dark:text-description-dark uppercase tracking-[1.5px] mb-3 font-montserrat">
            ОПИС
          </h3>
          <p className="text-[15px] leading-7 font-montserrat text-primary-light/75 dark:text-primary-dark/75">
            {movie.description}
          </p>
        </div>

        <div className="mb-7">
          <h3 className="text-[13px] font-bold text-description-light dark:text-description-dark uppercase tracking-[1.5px] mb-3 font-montserrat">
            АКТОРИ
          </h3>
          <div className="flex flex-wrap gap-2">
            {movie.actors.map((actor) => (
              <span
                key={actor}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium font-montserrat",
                  "bg-primary-light/5 dark:bg-primary-dark/5",
                  "border border-primary-light/10 dark:border-primary-dark/10",
                  "text-primary-light dark:text-primary-dark",
                )}
              >
                {actor}
              </span>
            ))}
          </div>
        </div>

        <div
          className={clsx(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg",
            "bg-primary-light/5 dark:bg-primary-dark/5",
            "border border-primary-light/10 dark:border-primary-dark/10",
            "text-description-light dark:text-description-dark",
            "text-[13px] font-medium font-montserrat",
          )}
        >
          <CalendarIcon />У прокаті з {rentalStartFormatted}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
