'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'createdAt', {
		type: Sequelize.DATE,
		defaultValue: new Date()
	  });
	  await queryInterface.changeColumn('Users', 'updatedAt', {
		type: Sequelize.DATE,
		defaultValue: new Date()
	  });
  },

  async down (queryInterface, Sequelize) {
	await queryInterface.changeColumn('Users', 'createdAt', {
		type: Sequelize.DATE,
		defaultValue: new Date()
	  });
	  await queryInterface.changeColumn('Users', 'updatedAt', {
		type: Sequelize.DATE,
		defaultValue: new Date()
	  });
  }
};

