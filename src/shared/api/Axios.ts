import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { AppError } from "../types/errors";
import { mapAxiosError } from "../types/error-mapper";

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let accessToken: string | null = null;
let refreshHandler: (() => Promise<string>) | null = null;
let refreshPromise: Promise<string> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const setRefreshHandler = (
  handler: () => Promise<string>
) => {
  refreshHandler = handler;
};

// REQUEST
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// RESPONSE
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (!error.response) {
      return Promise.reject(error);
    }

    // ❗ НЕ пробуємо refresh для самого refresh endpoint
    if (originalRequest.url?.includes("/v1/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshHandler
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshHandler().finally(() => {
            refreshPromise = null;
          });
        }

        const newToken = await refreshPromise;

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Error mapper
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

export { refreshClient };