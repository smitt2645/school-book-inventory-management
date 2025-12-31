const { DataTypes } = require("sequelize");
const sequelize = require("../Db/database");
const Board = require("./board");
const Medium = require("./medium");
const Class = require("./class");
const Year = require("./academic_year");

const BookSet = sequelize.define("bookSet", {
  set_name: { type: DataTypes.STRING, allowNull: false },
});

BookSet.belongsTo(Board, { foreignKey: "board_id" });
BookSet.belongsTo(Medium, { foreignKey: "medium_id" });
BookSet.belongsTo(Class, { foreignKey: "class_id" });
BookSet.belongsTo(Year, { foreignKey: "year_id" });

module.exports = BookSet; // only export the model here
