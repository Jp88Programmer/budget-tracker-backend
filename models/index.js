import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import UserModel from "./user.model.js";
import TransactionModel from "./transaction.model.js";
import CategoryModel from "./category.model.js";
import BudgetModel from "./budget.model.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const User = UserModel(sequelize);
const Category = CategoryModel(sequelize);
const Transaction = TransactionModel(sequelize);
const Budget = BudgetModel(sequelize);

User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasMany(Category);
Category.belongsTo(User);

Category.hasMany(Transaction);
Transaction.belongsTo(Category);

User.hasMany(Budget);
Budget.belongsTo(User);

export { sequelize, User, Transaction, Category, Budget };
