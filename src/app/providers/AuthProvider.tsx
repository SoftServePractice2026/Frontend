import type { AuthResponse, IdentityDetailsDto, LoginRequest } from "@/features/user/types";
import { api } from "@/shared/api/Axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuth: boolean;
  user: IdentityDetailsDto | null;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
  updateUserInfo: (newData: Partial<IdentityDetailsDto>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IdentityDetailsDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (request: LoginRequest) => {
    const { data } = await api.post<AuthResponse>("/v1/login", request);
    localStorage.setItem("token", data.token);

    const me = await api.get<IdentityDetailsDto>("/v1/me");
    setUser(me.data);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
  };

  const updateUserInfo = (newData: Partial<IdentityDetailsDto>) => {
    setUser(prev => prev ? {...prev, ...newData} : null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token){
      setIsLoading(false);
      return;
    }
    api.get<IdentityDetailsDto>("/v1/me")
        .then(res => {
          setUser(res.data);
          setIsAuth(true);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, isLoading, updateUserInfo }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);