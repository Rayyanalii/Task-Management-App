import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Dashboard from "../components/Tasks/Dashboard";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const AppRoutes = () => {
  const { token } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={token ? <Dashboard /> : <Login />} />
      <Route path="/login" element={token ? <Dashboard /> : <Login />} />
      <Route path="/register" element={token ? <Dashboard /> : <Register />} />
    </Routes>
  );
};

export default AppRoutes;
