import { Transaction } from "../models/index.js";
import { Sequelize } from "sequelize";

export const getMonthlySummary = async (req, res) => {
  const { month } = req.query; // e.g., '2025-06'
  const yearMonth = `${month}-%`;
  const summary = await Transaction.findAll({
    where: {
      UserId: req.userId,
      date: { [Sequelize.Op.like]: yearMonth },
    },
    attributes: [
      "type",
      [Sequelize.fn("sum", Sequelize.col("amount")), "total"],
    ],
    group: ["type"],
  });
  res.json(summary);
};

export const getYearlySummary = async (req, res) => {
  const { year } = req.query; // e.g., '2025'
  const yearPattern = `${year}-%`;
  const summary = await Transaction.findAll({
    where: {
      UserId: req.userId,
      date: { [Sequelize.Op.like]: yearPattern },
    },
    attributes: [
      "type",
      [Sequelize.fn("sum", Sequelize.col("amount")), "total"],
    ],
    group: ["type"],
  });
  res.json(summary);
};

export const getCategorySummary = async (req, res) => {
  const { month } = req.query; // e.g., '2025-06'
  const yearMonth = `${month}-%`;
  const summary = await Transaction.findAll({
    where: {
      UserId: req.userId,
      date: { [Sequelize.Op.like]: yearMonth },
    },
    attributes: [
      "CategoryId",
      [Sequelize.fn("sum", Sequelize.col("amount")), "total"],
    ],
    group: ["CategoryId"],
  });
  res.json(summary);
};


