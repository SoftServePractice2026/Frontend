export type GenreDto = {
    id: string;
    name: string;
};

export async function getGenres(): Promise<GenreDto[]> {
    const res = await fetch("/api/v1/genres");
    if (!res.ok) throw new Error("Failed to load genres");
    return res.json();
}
