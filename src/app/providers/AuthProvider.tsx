import type { AuthResponse, IdentityDetailsDto, LoginRequest } from "@/features/user/types";
import { api } from "@/shared/api/Axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuth: boolean;
  user: IdentityDetailsDto | null;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<IdentityDetailsDto | null>(null);

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

  useEffect(() => {
    api.get<IdentityDetailsDto>("/v1/me")
      .then(res => {
        setUser(res.data);
        setIsAuth(true);
      })
      .catch(() => {
        setUser(null);
        setIsAuth(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);