// routes/summary.routes.js
import express from "express";
import { getSummary } from "../controllers/summary.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.use(authenticate);
router.get("/", getSummary);
export default router;
