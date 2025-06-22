import { Budget } from "../models/index.js";

export const setBudget = async (req, res) => {
  try {
    const { month, year: yearParams, amount } = req.body;

    let year = yearParams || new Date().getFullYear().toString();

    if (!month || !amount) {
      return res
        .status(400)
        .json({ message: "Month, year, and amount are required" });
    }

    // Validate month and year
    if (
      month < 1 ||
      month > 12 ||
      year < 2000 ||
      year > new Date().getFullYear()
    ) {
      return res.status(400).json({ message: "Invalid month or year" });
    }

    const [budget] = await Budget.upsert({
      month,
      year,
      amount,
      UserId: req.userId,
    });

    if (!budget) {
      return res.status(400).json({ message: "Budget creation failed" });
    } else {
      return res.status(201).json({ message: "Budget successfully set" });
    }
  } catch (error) {
    console.error("🚀 ~ setBudget ~ error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getBudget = async (req, res) => {
  try {
    const { month, year: yearParams } = req.query;

    let year = yearParams || new Date().getFullYear().toString();

    const budget = await Budget.findOne({
      where: { month, year, UserId: req.userId },
    });

    if (!budget) {
      return res
        .status(201)
        .json({ message: "Budget not found for this month" });
    }

    res.json({ month: budget.month, year: budget.year, budget: budget.amount });
  } catch (error) {
    console.error("🚀 ~ getBudget ~ error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
