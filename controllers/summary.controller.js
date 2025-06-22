import { Transaction } from "../models/index.js";
import { Op, Sequelize } from "sequelize";
import dayjs from "dayjs";

export const getMonthlySummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    let yearPattern = year || new Date().getFullYear();
    if (yearPattern < 2000 || yearPattern > new Date().getFullYear()) {
      return res.status(400).json({ error: "Invalid year" });
    }

    const paddedMonth = month.toString().padStart(2, "0");

    const startDate = dayjs(`${yearPattern}-${paddedMonth}-01`)
      .startOf("month")
      .toDate();
    const endDate = dayjs(startDate).endOf("month").toDate();

    const summary = await Transaction.findAll({
      where: {
        UserId: req.userId,
        date: { [Op.between]: [startDate, endDate] },
      },
      attributes: [
        "type",
        [Sequelize.fn("sum", Sequelize.col("amount")), "total"],
      ],
      group: ["type"],
    });

    res.status(201).json({ data: summary });
  } catch (error) {}
};

export const getYearlySummary = async (req, res) => {
  try {
    const { year } = req.query; // e.g., '2025'

    if (!year) {
      return res.status(400).json({ error: "year is required" });
    }

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
    res.json({ data: summary });
  } catch (error) {}
};

export const getCategorySummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    let yearMonth;
    if (year) yearMonth = `${year}-${month}-%`;
    else yearMonth = `${month}-%`;

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
    res.json({ data: summary });
  } catch (error) {}
};
