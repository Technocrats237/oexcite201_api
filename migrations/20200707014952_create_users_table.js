'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            'users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
                username: Sequelize.STRING,
                password: Sequelize.STRING,
                active: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true,
                    allowNull: false
                }
            }
        );
    },

    down: async function (queryInterface, Sequelize) {
        await queryInterface.dropTable('users')
    }
}