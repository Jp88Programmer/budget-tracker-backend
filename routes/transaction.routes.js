import express from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.use(authenticate);
router.post("/", createTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
export default router;
