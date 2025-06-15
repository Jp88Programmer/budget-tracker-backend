import express from "express";
import { setBudget, getBudget } from "../controllers/budget.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.use(authenticate);
router.post("/", setBudget);
router.get("/", getBudget);
export default router;
