const sequelize = require("../config/database");

const User = require("./user");
const Project = require("./project");
const DPR = require("./dpr");

// Associations
User.hasMany(Project, { foreignKey: "createdBy", onDelete: "CASCADE" });
Project.belongsTo(User, { as: "creator", foreignKey: "createdBy" });

Project.hasMany(DPR, { foreignKey: "projectId", onDelete: "CASCADE" });
DPR.belongsTo(Project, { foreignKey: "projectId" });

User.hasMany(DPR, { foreignKey: "userId", onDelete: "CASCADE" });
DPR.belongsTo(User, { foreignKey: "userId" });

const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, User, Project, DPR, syncDB };
