import axios from "axios";
import type { AppError } from "../types/errors";
import { mapAxiosError } from "../types/error-mapper";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // network error (no response)
    if (!error.response) {
      const appError: AppError = {
        kind: "unknown",
        message: "Network error. Please try again later.",
      };
      return Promise.reject(appError);
    }

    const { data, status } = error.response;
    const appError = mapAxiosError(data, status);

    return Promise.reject(appError);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});