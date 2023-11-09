const sequelize = require("sequelize");
const connection = new sequelize("school", "root", "root", {
	host: "localhost",
	dialect: "mysql",
});

const testConnection = async () => {
	try {
		await connection.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

testConnection();
module.exports = connection;
