import { createContext, Dispatch, SetStateAction } from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  setDarkMode: () => {},
});
