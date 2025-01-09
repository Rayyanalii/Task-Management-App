import Navbar from "./components/Misc/Navbar";
import { AuthProvider } from "./components/Providers/AuthProvider";
import { DarkModeProvider } from "./components/Providers/DarkModeProvider";
import AppRoutes from "./config/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </DarkModeProvider>
    </AuthProvider>
  );
};

export default App;
