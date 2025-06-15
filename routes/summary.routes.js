// routes/summary.routes.js
import express from "express";
import { getMonthlySummary } from "../controllers/summary.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.use(authenticate);
router.get("/monthly", getMonthlySummary);
export default router;
