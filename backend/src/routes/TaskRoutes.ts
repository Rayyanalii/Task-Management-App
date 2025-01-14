import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/TaskController";
import { authenticate } from "../middleware/AuthMiddleware";
import { cacheMiddleware } from "../middleware/CacheMiddleware";

const router = express.Router();

router.post("/", authenticate, createTask);
router.get("/", authenticate, cacheMiddleware, getTasks);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;
