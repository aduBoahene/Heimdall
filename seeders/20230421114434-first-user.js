'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
	await queryInterface.bulkInsert('Users', [{
		name: 'John Doe',
		email: 'john.doe@example.com',
		password: '$2b$08$Uw88QLc6mI14aJKCxPM2LeLSC25nyHUvla7XJnn9bxbpaH6NNC5ra',
		createdAt: new Date(),
		updatedAt: new Date()
	  }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
