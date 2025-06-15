// models/user.model.js
import { DataTypes } from "sequelize";
export default (sequelize) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
  });
};
