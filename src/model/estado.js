const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Estado = sequelize.define('estados', {
    idEstado: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nomeEstado: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    ufEstado: {
        allowNull: false,
        type: Sequelize.STRING(2)
    }
});

module.exports = Estado;