// models/category.model.js
import { DataTypes } from "sequelize";
export default (sequelize) => {
  return sequelize.define("Category", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("income", "expense"), allowNull: false },
  });
};
