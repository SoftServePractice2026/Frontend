export type MovieCardVm = {
    id: string;
    title: string;
    posterUrl: string;
    ageBadge?: string;
    rating?: number;
    meta?: string;
};


export const mockMovies: MovieCardVm[] = [
    {
        id: "1",
        title: "Зоотрополіс 2",
        posterUrl: "https://cdn.planetakino.ua/4621_zootopia-2_2025/Media/Posters/vertical/opt_1a8a0efc-ad72-4c8d-941e-deb74fed9fed.webp",
        ageBadge: "PG",
        rating: 8.9,
        meta: "115 хв · Анімація, Комедія",
    },
    {
        id: "2",
        title: "Бійцівський клуб",
        posterUrl: "https://www.kinofilms.ua/images/movies/big/77_ua.jpg",
        ageBadge: "R",
        rating: 8.8,
        meta: "139 хв · Драма, Трилер",
    },
    {
        id: "3",
        title: "Барбі",
        posterUrl: "https://cdn.planetakino.ua/1_barbie_2023/Media/Posters/opt_5cb4c892-5bc6-4030-939e-c350bb4cf278.jpg",
        ageBadge: "PG-13",
        rating: 7.0,
        meta: "114 хв · Комедія",
    },
    {
        id: "4",
        title: "Втеча з Шоушенка",
        posterUrl: "https://focus.ua/static/storage/originals/a/c9/9d36591c16649b2c5e179c2bdf319c9a.jpg",
        ageBadge: "R",
        rating: 9.3,
        meta: "142 хв · Драма",
    },
    {
        id: "5",
        title: "Месники: Завершення",
        posterUrl: "https://i.kinobaza.com.ua/w180/65697c188237c.jpg",
        ageBadge: "PG-13",
        rating: 8.4,
        meta: "181 хв · Екшн, Фантастика",
    },
    {
        id: "6",
        title: "Титанік",
        posterUrl: "https://upload.wikimedia.org/wikipedia/uk/archive/3/3f/20250227125726%21Tytanik_%28UKR_Poster%2C_2012%29.jpg",
        ageBadge: "PG-13",
        rating: 7.9,
        meta: "195 хв · Драма, Романтика",
    },
    {
        id: "7",
        title: "Гаррі Поттер і філософський камінь",
        posterUrl: "https://ua-images.kinorium.com/movie/1080/195927.jpg?1604310085",
        ageBadge: "PG",
        rating: 7.6,
        meta: "152 хв · Фентезі, Пригоди",
    },
    {
        id: "8",
        title: "Мікки 17",
        posterUrl: "https://cdn.planetakino.ua/13812_ov-miki-17_2025/Media/Posters/vertical/opt_46f239db-1037-4588-90e5-d15e6835749e.jpg",
        ageBadge: "PG-13",
        rating: 8.2,
        meta: "139 хв · Фантастика, Драма",
    },
    {
        id: "9",
        title: "Джокер",
        posterUrl: "https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%94%D0%B6%D0%BE%D0%BA%D0%B5%D1%80_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC_%D0%A2%D0%BE%D0%B4%D0%B4%D0%B0_%D0%A4%D0%B8%D0%BB%D0%BB%D0%B8%D0%BF%D1%81%D0%B0%29.jpg",
        ageBadge: "R",
        rating: 8.4,
        meta: "122 хв · Драма, Трилер",
    },
    {
        id: "10",
        title: "Формула 1",
        posterUrl: "https://cdn.planetakino.ua/727_f1_2025/Media/Posters/vertical/opt_e9a1beca-4216-4702-9772-bcb5f210bcf3.webp",
        ageBadge: "PG-13",
        rating: 8.7,
        meta: "138 хв · Спорт, Драма",
    },
];

