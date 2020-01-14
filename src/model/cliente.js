const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Cliente = sequelize.define('clientes', {
    idCliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nomeCliente: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    mailCliente: {
        allowNull: false,
        type: Sequelize.STRING(100)
    },
    foneCliente: {
        allowNull: false,
        type: Sequelize.STRING(15)
    },
    cpfCliente: {
        allowNull: false,
        type: Sequelize.STRING(15)
    },
    enderecoCliente: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    sexoCliente: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
});

module.exports = Cliente;