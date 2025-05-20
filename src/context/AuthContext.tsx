import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface AuthContextType {
  userId: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (userId: string, accessToken: string, expiresIn: number) => void;
  logout: () => void;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<number | null>(
    null
  );
  const API_BASE_URL = "http://backend:9090";

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedExpiry = localStorage.getItem("accessTokenExpiry");

    if (storedUserId && storedAccessToken && storedExpiry) {
      setUserId(storedUserId);
      setAccessToken(storedAccessToken);
      setAccessTokenExpiry(Number(storedExpiry));
    }
  }, []);

  const login = useCallback((id: string, token: string, expiresIn: number) => {
    const expiry = Date.now() + expiresIn * 1000;
    setUserId(id);
    setAccessToken(token);
    setAccessTokenExpiry(expiry);
    localStorage.setItem("userId", id);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("accessTokenExpiry", expiry.toString());
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setAccessToken(null);
    setAccessTokenExpiry(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiry");
  }, []);

  const getAccessToken = async (): Promise<string | null> => {
    if (!userId) return null;

    if (accessToken && accessTokenExpiry && Date.now() < accessTokenExpiry) {
      return accessToken;
    }
    //token expirado
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/access-token?userId=${userId}`
      );

      const newToken = response.data.access_token;
      const expiresIn = response.data.expires_in;

      if (newToken) {
        login(userId, newToken, expiresIn);
        return newToken;
      } else {
        logout();
        return null;
      }
    } catch (error) {
      console.error("Error al renovar el token", error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        accessToken,
        isAuthenticated: !!userId && !!accessToken,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
