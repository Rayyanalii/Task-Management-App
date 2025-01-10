import Navbar from "./components/Misc/Navbar";
import { AuthProvider } from "./components/Providers/AuthProvider";
import AppRoutes from "./config/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
