import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import summaryRoutes from "./routes/summary.routes.js";
import { sequelize } from "./models/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/summary", summaryRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("database sync successfully");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
