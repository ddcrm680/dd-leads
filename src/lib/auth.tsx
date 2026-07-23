import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { User, LoginPayload } from "../types/auth.type";

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (data: LoginPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "John Doe",
    email: "jondoe@gmail.com",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      // API Call

      // const res = await api.get("/auth/me");
      // setUser(res.data);

      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(data: LoginPayload) {
    // API Call

    // const res = await api.post("/auth/login", data);

    const user = {
      id: "1",
      name: "John Doe",
      email: data.email,
    };

    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
