import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/login";
import Register from "../components/Auth/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
