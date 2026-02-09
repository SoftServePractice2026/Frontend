import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MovieCard } from "@/features/poster/components/MovieCard";
import { getMyFavorites } from "@/features/user/api/favoritesApi";
import { getMovieById } from "@/features/user/api/movieByIdApi";
import type { MovieListItemDto } from "@/features/poster/api/moviesApi";
import { mapMovieToCard } from "@/features/poster/mappers/mapMovieToCard";

export default function FavoriteFilmsPage() {
    const [query] = useState("");
    const [apiMovies, setApiMovies] = useState<MovieListItemDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setIsLoading(true);
                setLoadError(null);
                const favorites = await getMyFavorites();
                const ids = favorites.map((f) => f.movieId);

                if (ids.length === 0) {
                    if (mounted) setApiMovies([]);
                    return;
                }

                const loaded = await Promise.all(ids.map((id) => getMovieById(id)));
                if (!mounted) return;
                setApiMovies(loaded);
            } catch (e) {
                console.error("favorites load error", e);
                if (!mounted) return;
                setLoadError("Не вдалося завантажити улюблені фільми");
            } finally {
                if (mounted) setIsLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);
    const movies = useMemo(() => {
        const q = query.trim().toLowerCase();

        return apiMovies
            .filter((m) => !q || (m.title ?? "").toLowerCase().includes(q))
            .map(mapMovieToCard);
    }, [apiMovies, query]);


    return (
        <div className={clsx("h-full overflow-y-auto")}>
            <div className={clsx("w-full px-4 sm:px-8 py-6 sm:py-8 max-w-6xl mx-auto")}>

                <div className="py-6 text-black/60 dark:text-white/70">
                    <h1 className="text-2xl font-semibold text-primary-light dark:text-primary-dark">
                        Збережені фільми для майбутнього перегляду:
                    </h1>
                </div>

                {isLoading ? <div className="py-6">Loading...</div> : null}
                {loadError ? <div className="py-6">{loadError}</div> : null}

                {!isLoading && !loadError && movies.length === 0 ? (
                    <div className="py-6 text-sm text-black/60 dark:text-white/70">
                        У тебе ще немає збережених фільмів.
                    </div>
                ) : null}

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}
