import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("userToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

