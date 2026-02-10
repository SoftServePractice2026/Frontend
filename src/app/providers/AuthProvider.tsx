import {createContext, useContext, useEffect, useRef, useState,} from "react";
import type {AuthResponse, IdentityDetailsDto, LoginRequest,} from "@/features/user/types";
import { api, refreshClient, setAccessToken, setRefreshHandler } from "@/shared/api/Axios";

interface AuthContextType {
  isAuth: boolean;
  user: IdentityDetailsDto | null;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUserInfo: (updatedData: Partial<IdentityDetailsDto>) => void; // Метод у інтерфейсі
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({children,}: { children: React.ReactNode; }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IdentityDetailsDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshPromise = useRef<Promise<string> | null>(null);

  const updateUserInfo = (updatedData: Partial<IdentityDetailsDto>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  const refreshAccessToken = async (): Promise<string> => {
    if (refreshPromise.current) {
      return refreshPromise.current;
    }

    refreshPromise.current = (async () => {
      try {
        const { data } = await refreshClient.post<AuthResponse>("/v1/refresh");

        setAccessToken(data.token);
        scheduleTokenRefresh(data.expiryDate);

        return data.token;
      } finally {
        refreshPromise.current = null;
      }
    })();

    return refreshPromise.current;
  };

  const scheduleTokenRefresh = (expiryDate: string) => {
    const expiresAt = new Date(expiryDate).getTime();
    const now = Date.now();

    const refreshTime = expiresAt - now - 30_000;

    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
    }

    if (refreshTime > 0) {
      refreshTimeout.current = setTimeout(async () => {
        try {
          await refreshAccessToken();
        } catch {
          await logout();
        }
      }, refreshTime);
    }
  };

  const login = async (request: LoginRequest) => {
    const { data } = await api.post<AuthResponse>("/v1/login", request);

    setAccessToken(data.token);
    scheduleTokenRefresh(data.expiryDate);

    setUser(data.userDetails);
    setIsAuth(true);
  };

  const logout = async () => {
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
    }

    setAccessToken(null);

    try {
      await api.post("/v1/logout");
    } catch { }

    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    setRefreshHandler(refreshAccessToken);

    const initAuth = async () => {
      try {
        const token = await refreshAccessToken();

        setAccessToken(token);

        const me = await api.get<IdentityDetailsDto>("/v1/me");

        setUser(me.data);
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
      <AuthContext.Provider value={{ isAuth, user, login, logout, updateUserInfo, isLoading }}>
        {!isLoading && children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);