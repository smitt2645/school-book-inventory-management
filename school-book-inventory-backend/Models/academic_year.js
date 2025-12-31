const { DataTypes } = require("sequelize");
const sequelize = require("../Db/database");

const AcademicYear = sequelize.define("academic_year", {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = AcademicYear;
