import { api } from "@/shared/api/Axios";
import type { MovieDetailsDto } from "../types";

export async function getMovieById(id: string) {
    const { data } = await api.get<MovieDetailsDto>(`/v1/movies/${id}`);
    return data;
}
