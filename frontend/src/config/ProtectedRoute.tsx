import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "./TokenExpiredChecker";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
