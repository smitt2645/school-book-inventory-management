const { DataTypes } = require("sequelize");
const sequelize = require("../Db/database");

const Board = sequelize.define("board", {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Board;
