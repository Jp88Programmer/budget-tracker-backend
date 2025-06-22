// models/budget.model.js
import { DataTypes } from "sequelize";
export default (sequelize) => {
  return sequelize.define("Budget", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    month: { type: DataTypes.STRING },
    year: { type: DataTypes.STRING },
    amount: { type: DataTypes.FLOAT },
  });
};
