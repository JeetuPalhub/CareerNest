// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const res = await api.post("/v1/user/login", { email, password, role });
    if (res.data.success){
       setUser(res.data.user);
       localStorage.setItem('user', JSON.stringify(res.data.user));
   
    }
  };


  const logout = async () => {
    await api.get("/v1/user/logout");
    setUser(null);
  };


  // src/context/AuthContext.jsx
  const register = async (payload) => {
    const res = await api.post("/v1/user/register", payload);
    if (res.data.success) setUser(res.data.user);
  };



  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
