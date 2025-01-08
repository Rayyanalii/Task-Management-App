import jwt from "jsonwebtoken";
import { Request, NextFunction } from "express";

export const authenticate = (req: Request, res: any, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "veryverysecretkey"
    );
    (req as any).userId = (decoded as any).userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
