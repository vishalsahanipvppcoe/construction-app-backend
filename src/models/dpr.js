const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DPR = sequelize.define("DPR", {
  projectId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  workDescription: { type: DataTypes.TEXT },
  weather: { type: DataTypes.STRING },
  workerCount: { type: DataTypes.INTEGER },
}, { timestamps: true });

module.exports = DPR;
