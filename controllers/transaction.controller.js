import { Transaction } from "../models/index.js";

export const createTransaction = async (req, res) => {
  const { title, amount, date, type, categoryId } = req.body;
  const transaction = await Transaction.create({
    title,
    amount,
    date,
    type,
    CategoryId: categoryId,
    UserId: req.userId,
  });
  // 3dee3c82-52b2-49a7-81cb-cff9cc6b6a92
  res.json(transaction);
};

export const getTransactions = async (req, res) => {
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

  const transactions = await Transaction.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset,
    order: [["date", "DESC"]],
  });
  res.json(transactions);
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.destroy({ where: { id, UserId: req.userId } });
  res.json({ message: "Transaction deleted" });
};

export const updateTransaction = async (req, res) => {
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
  res.json(transaction);
};
