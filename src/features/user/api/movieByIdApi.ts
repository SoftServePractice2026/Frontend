import { api } from "@/shared/api/Axios";
import type { MovieListItemDto } from "@/features/poster/api/moviesApi";

export async function getMovieById(id: string) {
    const { data } = await api.get<MovieListItemDto>(`/v1/movies/${id}`);
    return data;
}