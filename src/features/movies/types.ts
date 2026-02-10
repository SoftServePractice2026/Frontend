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

export enum SessionStatus {
  Active = 1,
  Cancelled = 2,
  Finished = 3,
  Scheduled = 4,
}

export interface SessionListItemDto {
  id: string;
  movieTitle: string;
  movieId: string;
  hallName: string;
  hallId: string;
  startTime: string;
  endTime: string;
  sessionStatus: SessionStatus;
}

export interface SessionFilterResultDto {
  sessions: SessionListItemDto[];
  totalCount: number;
}

export interface DateOption {
  value: string;
  day: string;
  date: number;
}
