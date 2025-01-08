import express from "express";
import { register } from "../controllers/AuthController";

const router = express.Router();

router.post("/register", register);
// router.post("/login", login);

export default router;
