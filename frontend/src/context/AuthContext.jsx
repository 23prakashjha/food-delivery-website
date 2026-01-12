import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

/* =======================
   AXIOS INSTANCE
======================= */
const API = axios.create({
  baseURL: "https://food-delivery-website-j8y3.onrender.com/api",
  withCredentials: true, // safe even if you don't use cookies yet
  headers: {
    "Content-Type": "application/json",
  },
});

/* =======================
   CONTEXT SETUP
======================= */
const AuthContext = createContext(null);

// Hook
export const useAuth = () => useContext(AuthContext);

/* =======================
   PROVIDER
======================= */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* =======================
     LOGIN
  ======================= */
  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      };
    }
  };

  /* =======================
     REGISTER
  ======================= */
  const register = async (name, email, password) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      };
    }
  };

  /* =======================
     LOGOUT
  ======================= */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user),
        isAdmin: Boolean(user?.isAdmin),
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};



