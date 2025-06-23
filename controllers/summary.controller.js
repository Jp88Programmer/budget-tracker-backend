import { Transaction } from "../models/index.js";
import { Op, Sequelize } from "sequelize";
import dayjs from "dayjs";

export const getSummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    const currentYear = new Date().getFullYear();
    const yearPattern = parseInt(year) || currentYear;

    // Validate year
    if (yearPattern < 2000 || yearPattern > currentYear) {
      return res.status(400).json({ error: "Invalid year" });
    }

    let startDate, endDate;
    if (month) {
      // If month is provided
      const paddedMonth = month.toString().padStart(2, "0");
      startDate = dayjs(`${yearPattern}-${paddedMonth}-01`)
        .startOf("month")
        .toDate();
      endDate = dayjs(startDate).endOf("month").toDate();
    } else {
      // If only year is provided
      startDate = dayjs(`${yearPattern}-01-01`).startOf("year").toDate();
      endDate = dayjs(startDate).endOf("year").toDate();
    }

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
  } catch (error) {
    console.log("🚀 ~ getSummary ~ error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
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
