import { Budget } from "../models/index.js";

export const setBudget = async (req, res) => {
  const { month, amount } = req.body;
  const [budget] = await Budget.upsert({ month, amount, UserId: req.userId });
  res.json(budget);
};

export const getBudget = async (req, res) => {
  const { month } = req.query;
  const budget = await Budget.findOne({ where: { month, UserId: req.userId } });
  res.json(budget);
};
