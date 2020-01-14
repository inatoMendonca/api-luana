const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Servico = sequelize.define('servicos', {
    idServico: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nomeServico: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    valorServico: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
    },
    obsServico: {
        allowNull: true,
        type: Sequelize.STRING(255)
    }
});

module.exports = Servico;