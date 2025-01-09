import React, { useState, ReactNode } from "react";
import { DarkModeContext } from "./../../contexts/DarkModeContext";

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkmode") == "true"
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
