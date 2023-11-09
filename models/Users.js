const connection = require("../db/connection");
const sequelize = require("sequelize");

const Student = connection.define(
	"Users",
	{
		id: {
			type: sequelize.INTEGER(10),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		role: sequelize.STRING(10),
		email: sequelize.STRING(30),
		password: sequelize.STRING(15),
		createdAt: sequelize.DATE(),
		updatedAt: sequelize.DATE(),
	},
	{
		timestamps:false
	},
	{
		tableName: "users",
		
	}
);

module.exports = Student;
