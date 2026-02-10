export interface MovieDetailsDto {
  id: string;
  title: string;
  rating: number;
  genres: string[];
  ageRating: number;
  year: number;
  duration: number;
  rentalStartDate: string;
  description: string;
  actors: string[];
  poster: string;
  formats: string[];
}

export interface Session {
  id: number;
  movieId: string;
  time: string;
  format: string;
  hall: number;
  price: number;
  availableSeats: number;
}

export interface DateOption {
  value: string;
  day: string;
  date: number;
}
