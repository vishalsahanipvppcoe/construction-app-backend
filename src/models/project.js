const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define("Project", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startDate: { type: DataTypes.DATEONLY },
  endDate: { type: DataTypes.DATEONLY },
  status: {
    type: DataTypes.ENUM("planned","active","completed"),
    defaultValue: "planned",
  },
  createdBy: { type: DataTypes.INTEGER },
}, { timestamps: true });

module.exports = Project;
