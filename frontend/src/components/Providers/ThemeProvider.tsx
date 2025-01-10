import { Theme } from "@radix-ui/themes";
import App from "../../App";
import { useContext } from "react";
import { DarkModeContext } from "../../contexts/DarkModeContext";

export const ThemeProvider = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  const theme = isDarkMode ? "dark" : "light";

  return (
    <Theme appearance={theme}>
      <App />
    </Theme>
  );
};
