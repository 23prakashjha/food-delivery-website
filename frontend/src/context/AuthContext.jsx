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
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* =======================
   CONTEXT SETUP
======================= */
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

/* =======================
   PROVIDER
======================= */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =======================
     LOAD USER
  ======================= */
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
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      return { success: true };
    } catch (error) {
      console.error("Login error:", error.response || error.message);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Server error. Please try again later.",
      };
    }
  };

  /* =======================
     REGISTER
  ======================= */
  const register = async (name, email, password) => {
    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      const data = response.data;

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      return { success: true };
    } catch (error) {
      console.error("Register error:", error.response || error.message);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Server error. Please try again later.",
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
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};


