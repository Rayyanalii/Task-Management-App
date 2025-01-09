import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
