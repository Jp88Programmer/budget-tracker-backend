// models/transaction.model.js
import { DataTypes } from "sequelize";
export default (sequelize) => {
  return sequelize.define("Transaction", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING, allowNull: true },
    amount: { type: DataTypes.FLOAT },
    date: { type: DataTypes.DATEONLY },
    type: { type: DataTypes.ENUM("income", "expense") },
  });
};
