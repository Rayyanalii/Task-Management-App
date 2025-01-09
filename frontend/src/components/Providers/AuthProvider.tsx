import React, { useState, ReactNode } from "react";
import { setAuthToken } from "../../config/api";
import { AuthContext } from "../../contexts/AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleSetToken = (token: string | null) => {
    setToken(token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  setAuthToken(token);

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
};
