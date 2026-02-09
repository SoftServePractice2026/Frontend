import { api } from "@/shared/api/Axios";

export type FavoriteMovieDto = {
    favoriteId: string;
    movieId: string;
    userId: string;
    addedAt: string;
};

export async function getMyFavorites(): Promise<FavoriteMovieDto[]> {
    const { data } = await api.get<FavoriteMovieDto[]>("/v1/favorite");
    return data;
}
