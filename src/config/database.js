// choose MySQL or SQLite based on env
const { Sequelize } = require("sequelize");
require("dotenv").config();

if (process.env.DB_DIALECT === "mysql") {
  module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
  });
} else {
  // default to sqlite for quick dev
  module.exports = new Sequelize({
    dialect: "sqlite",
    storage: process.env.SQLITE_PATH || "database.sqlite",
    logging: false,
  });
}
