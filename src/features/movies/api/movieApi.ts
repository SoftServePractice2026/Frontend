import { api } from "@/shared/api/Axios";
import type { MovieDetailsDto, SessionFilterResultDto } from "../types";

export async function getMovieById(id: string) {
    const { data } = await api.get<MovieDetailsDto>(`/v1/movies/${id}`);
    return data;
}

export async function getSessionsByMovieId(movieId: string) {
    const { data } = await api.get<SessionFilterResultDto>("/v1/sessions", {
        params: { MovieId: movieId },
    });
    return data;
}
