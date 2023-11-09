"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable("students", {
			rollNo: {
				type: Sequelize.INTEGER(10),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: Sequelize.STRING(30),
			dob: Sequelize.DATEONLY(),
			score: Sequelize.INTEGER(5),
			createdAt: Sequelize.DATE(),
			updatedAt: Sequelize.DATE(),
		});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("students");
	},
};
