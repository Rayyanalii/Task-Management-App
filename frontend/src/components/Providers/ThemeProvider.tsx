import { Theme } from "@radix-ui/themes";
import App from "../../App";
import { useEffect, useState } from "react";

export const ThemeProvider = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("darkmode") === "true" ? "dark" : "light"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("darkmode") === "true" ? "dark" : "light");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Theme appearance={theme}>
      <App />
    </Theme>
  );
};
