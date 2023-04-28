'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		await queryInterface.bulkInsert('Users', [
			{
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: '$2b$08$Uw88QLc6mI14aJKCxPM2LeLSC25nyHUvla7XJnn9bxbpaH6NNC5ra',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Jane Doe',
				email: 'jane@example.com',
				password: '$2b$08$Uw88QLc6mI14aJKCxPM2LeLSC25nyHUvla7XJnn9bxbpaH6NNC5ra',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Kofi Ansah',
				email: 'kansah@example.com',
				password: '$2b$08$Uw88QLc6mI14aJKCxPM2LeLSC25nyHUvla7XJnn9bxbpaH6NNC5ra',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Mighty Thor',
				email: 'thor@example.com',
				password: '$2b$08$Uw88QLc6mI14aJKCxPM2LeLSC25nyHUvla7XJnn9bxbpaH6NNC5ra',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Lokki',
				email: 'lokki@example.com',
				password: '$2b$08$Uw88QLc6mI14aJKCxPM2LeLSC25nyHUvla7XJnn9bxbpaH6NNC5ra',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);


	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
