import { Transaction } from "../models/index.js";

export const createTransaction = async (req, res) => {
  try {
    const { title, amount, date, type, description, categoryId } = req.body;
    const transaction = await Transaction.create({
      title,
      amount,
      date,
      type,
      ...(description && { description }),
      CategoryId: categoryId,
      UserId: req.userId,
    });

    if (!transaction) {
      return res.status(400).json({ message: "Transaction creation failed" });
    } else {
      return res
        .status(201)
        .json({ success: "Transaction successfully created", transaction });
    }
  } catch (error) {
    console.error("🚀 ~ createTransaction ~ error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// TODO --
// here use the join property for type to extract into the category table
export const getTransactions = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      category,
      type,
      page = 1,
      limit = 10,
    } = req.query;
    const offset = (page - 1) * limit;

    const where = { UserId: req.userId };

    if (startDate && endDate) where.date = { $between: [startDate, endDate] };
    else if (startDate && !endDate) {
      where.date = { $gte: startDate };
    } else if (!startDate && endDate) {
      where.date = { $lte: endDate };
    }

    if (type) where.type = type;
    if (category) where.CategoryId = category;

    const transactions = await Transaction.findAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [["date", "DESC"]],
    });

    res.status(201).json({
      message: "Transactions fetched successfully",
      more: transactions.length == limit,
      page: parseInt(page),
      count: transactions.length,
      transactions:
        transactions.length == 0
          ? []
          : transactions.map(
              ({ title, amount, date, type, UserId, CategoryId }) => ({
                title,
                amount,
                date,
                type,
                userId: UserId,
                categoryId: CategoryId,
              })
            ),
    });
  } catch (error) {
    console.log("🚀 ~ getTransactions ~ error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id, UserId: req.userId } });
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("🚀 ~ deleteTransaction ~ error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, date, type, CategoryId } = req.body;

    const transaction = await Transaction.findOne({
      where: { id, UserId: req.userId },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.title = title;
    transaction.amount = amount;
    transaction.date = date;
    transaction.type = type;
    transaction.CategoryId = CategoryId;

    await transaction.save();

    if (!transaction) {
      return res.status(400).json({ message: "Transaction Update failed" });
    } else {
      return res
        .status(201)
        .json({ success: "Transaction successfully updated", transaction });
    }
  } catch (error) {
    console.error("🚀 ~ deleteTransaction ~ error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
