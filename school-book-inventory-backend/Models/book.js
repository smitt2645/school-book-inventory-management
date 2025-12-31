const { DataTypes } = require("sequelize");
const sequelize = require("../Db/database");

const Book = sequelize.define("book", {
  book_name: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  publisher: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Book;
