import type { MovieCardVm } from "../types/MovieCardVm";
import type { MovieListItemDto } from "../api/moviesApi";

const FALLBACK = "https://via.placeholder.com/300x450";

export function mapMovieToCard(m: MovieListItemDto): MovieCardVm {
    return {
        id: m.id,
        title: m.title,
        posterUrl: m.poster ?? FALLBACK,
        ageBadge: m.ageRating ? `${m.ageRating}+` : undefined,
        rating: m.rating ?? undefined,
        meta: m.duration ? `${m.duration} хв` : undefined,
    };
}