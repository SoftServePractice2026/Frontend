import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";
import MovieInfo from "../components/MovieInfo";
import DatePicker from "../components/DatePicker";
import SessionCard from "../components/SessionCard";
import type { MovieDetailsDto, SessionListItemDto, DateOption } from "../types";
import { SessionStatus } from "../types";
import { getMovieById, getSessionsByMovieId } from "../api/movieApi";
import { api } from "@/shared/api/Axios";

const DAYS = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

const getDates = (): DateOption[] => {
  const dates: DateOption[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      value: d.toISOString().split("T")[0],
      day: DAYS[d.getDay()],
      date: d.getDate(),
    });
  }
  return dates;
};

const ChevronLeftIcon = () => (
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const backBtnClass = clsx(
  "inline-flex items-center gap-2 px-5 py-3",
  "bg-primary-light/5 dark:bg-primary-dark/5",
  "border border-primary-light/10 dark:border-primary-dark/10",
  "rounded-lg text-primary-light dark:text-primary-dark",
  "text-sm font-medium font-montserrat cursor-pointer",
  "transition-all duration-200",
  "hover:border-primary-light/20 dark:hover:border-primary-dark/20",
);

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetailsDto | null>(null);
  const [sessions, setSessions] = useState<SessionListItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const dates = useMemo(() => getDates(), []);
  const [selectedDate, setSelectedDate] = useState(dates[0]?.value ?? "");
  const [isFavorite, setIsFavorite] = useState(false);

  const OnFavoriteClick = async () => {
    await api.post(`/v1/favorite/${id}`);
    setIsFavorite((prev) => !prev);
  }

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    (async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const [movieData, sessionsData] = await Promise.all([
          getMovieById(id),
          getSessionsByMovieId(id),
        ]);
        if (!mounted) return;
        setMovie(movieData);
        const list = Array.isArray(sessionsData)
          ? sessionsData
          : (sessionsData.sessions ?? []);
        setSessions(list);
      } catch (e) {
        console.error("movie load error", e);
        if (!mounted) return;
        setLoadError("Не вдалося завантажити фільм");
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-description-light dark:text-description-dark text-lg font-montserrat">
          Завантаження...
        </p>
      </div>
    );
  }

  if (loadError || !movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h2 className="text-2xl font-bold text-primary-light dark:text-primary-dark font-montserrat">
          {loadError ?? "Фільм не знайдено"}
        </h2>
        <button onClick={() => navigate("/")} className={backBtnClass}>
          <ChevronLeftIcon />
          На головну
        </button>
      </div>
    );
  }

  const filteredSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.startTime).toISOString().split("T")[0];
    return (
      sessionDate === selectedDate &&
      s.sessionStatus !== SessionStatus.Cancelled &&
      s.sessionStatus !== SessionStatus.Finished
    );
  });

  const handleSessionClick = (session: SessionListItemDto) => {
    navigate(`/booking/${session.id}`);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 pt-6 pb-8">
        <button onClick={() => navigate(-1)} className={backBtnClass}>
          <ChevronLeftIcon />
          Назад до афіші
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <MovieInfo
          movie={movie}
          isFavorite={isFavorite}
          onToggleFavorite={OnFavoriteClick}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 mt-14 sm:mt-16">
        <h2
          className={clsx(
            "font-montserrat font-bold mb-7",
            "text-xl sm:text-2xl",
            "text-primary-light dark:text-primary-dark",
          )}
        >
          Обрати сеанс
        </h2>

        <DatePicker
          dates={dates}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onClick={handleSessionClick}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-description-light dark:text-description-dark text-[15px] py-10 font-montserrat">
              Немає сеансів на обрану дату
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
