const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Profissional = sequelize.define('profissionais', {
    idProfissional: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nomeProfissional: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [2,255]
        }
    },
    cpfProfissional: {
        allowNull: false,
        type: Sequelize.STRING(15)
    },
    foneProfissional: {
        allowNull: false,
        type: Sequelize.STRING(15)
    },
    mailProfissional: {
        allowNull: false,
        type: Sequelize.STRING(100)
    },
    funcaoProfissional: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
    sexoProfissional: {
        allowNull: false,
        type: Sequelize.STRING(50)
    }
});

module.exports = Profissional;