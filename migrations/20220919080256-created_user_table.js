"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("users", {
			id: {
				type: Sequelize.INTEGER(10),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			role: Sequelize.STRING(10),
			email: Sequelize.STRING(30),
			password: Sequelize.STRING(15),
			createdAt: Sequelize.DATE(),
			updatedAt: Sequelize.DATE(),
		});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("users");
	},
};
