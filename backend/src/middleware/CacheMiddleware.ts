import { NextFunction, Request } from "express";
import { redisClient } from "../index";

export const cacheMiddleware = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const userId = (req as any).userId;
  try {
    const cachedData = await redisClient.get(userId);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
    next();
  } catch (err) {
    console.error("Error checking Redis cache:", err);
    next();
  }
};
