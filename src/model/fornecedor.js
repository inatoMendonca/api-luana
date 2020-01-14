const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Fornecedor = sequelize.define('fornecedores', {
    idFornecedor: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nomeFornecedor: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    mailFornecedor: {
        allowNull: false,
        type: Sequelize.STRING(100)
    },
    foneFornecedor: {
        allowNull: false,
        type: Sequelize.STRING(15)
    },
    obsFornecedor: {
        allowNull: true,
        type: Sequelize.STRING(500)
    },
});

module.exports = Fornecedor;