const { DataTypes } = require("sequelize");
const sequelize = require("../Db/database");

const Medium = sequelize.define("medium", {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Medium;
