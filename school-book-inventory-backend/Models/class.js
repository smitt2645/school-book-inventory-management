const { DataTypes } = require("sequelize");
const sequelize = require("../Db/database");

const Class = sequelize.define("class", {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Class;
