const { DataTypes } = require("sequelize");
const sequelize = require("../Db/database");
const Book = require("./book");
const BookSet = require("./bookSet"); // require here only

const BookSetItem = sequelize.define("bookSetItem", {
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
});

// associations
BookSetItem.belongsTo(BookSet, { foreignKey: "book_set_id", as: "bookSet" });
BookSetItem.belongsTo(Book, { foreignKey: "book_id", as: "book" });
BookSet.hasMany(BookSetItem, { foreignKey: "book_set_id", as: "bookSetItems" });

module.exports = BookSetItem;
