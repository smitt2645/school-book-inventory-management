const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("school_inventory", "root", "", {
  host: "localhost",
  port: "3308",
  dialect: "mysql",
});

module.exports = sequelize;
