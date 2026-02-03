export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  rating: number;
  genre: string[];
  ageRestriction: string;
  year: number;
  duration: number;
  endDate: string;
  description: string;
  actors: string[];
  poster: string;
  formats: SessionFormat[];
}

export type SessionFormat = "2D" | "3D" | "IMAX" | "4DX";

export interface Session {
  id: number;
  movieId: number;
  time: string;
  format: SessionFormat;
  hall: number;
  price: number;
  availableSeats: number;
}

export interface DateOption {
  value: string;
  day: string;
  date: number;
}
