// routes/category.routes.js
import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.use(authenticate);
router.post("/", createCategory);
router.get("/", getCategories);
export default router;
