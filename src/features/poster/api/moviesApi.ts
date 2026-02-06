import { api } from "@/shared/api/Axios";

export type MovieListItemDto = {
    id: string;
    title: string;
    poster: string | null;
    duration: number;
    ageRating: number;
    rating: number;
    genreIds: string[];
};

export type MoviesQuery = {
    pageNumber?: number;
    pageSize?: number;
    searchQuery?: string;
};

export async function getMovies(params: MoviesQuery) {
    const { data } = await api.get<MovieListItemDto[]>("/v1/movies", { params });
    return data;
}