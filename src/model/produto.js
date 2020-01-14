const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Produto = sequelize.define('produtos', {
    idProduto: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nomeProduto: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    valorProduto: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
    },
    qtdeProduto: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    obsProduto: {
        allowNull: true,
        type: Sequelize.STRING(255)
    }
});

module.exports = Produto;