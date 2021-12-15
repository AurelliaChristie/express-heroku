'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add data
    await queryInterface.bulkInsert('tbl_todo_lists', [
      {
        name_todo : "Mencuci Pakaian",
        desc_todo : "Mencuci pakaian kemarin dengan menggunakan pewangi",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name_todo : "Mencuci Piring",
        desc_todo : "Mencuci piring dengan menggunakan Sunlight",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
