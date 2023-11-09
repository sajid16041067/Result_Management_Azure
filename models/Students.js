const connection = require("../db/connection");
const sequelize = require("sequelize");

const Student = connection.define(
	"Students",
	{
		rollNo: {
			type: sequelize.INTEGER(10),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: sequelize.STRING(30),
		dob: sequelize.DATEONLY(),
		score: sequelize.INTEGER(5),
		createdAt: sequelize.DATE(),
		updatedAt: sequelize.DATE(),
	},
	{
		tableName: "students",
	}
);

module.exports = Student;
