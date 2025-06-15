// routes/auth.routes.js
import express from "express";
import { login } from "../controllers/auth.controller.js";
import { register } from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
export default router;
