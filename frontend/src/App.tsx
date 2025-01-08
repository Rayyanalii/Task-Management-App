import { AuthProvider } from "./config/AuthProvider";
import AppRoutes from "./config/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
