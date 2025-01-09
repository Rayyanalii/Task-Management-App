import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "./components/Providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider />
  </StrictMode>
);
