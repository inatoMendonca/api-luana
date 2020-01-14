const Sequelize = require('sequelize');
const sequelize = require('../database/database');

const Agendamento = sequelize.define('agendamentos', {
    idAgendamento: {
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
    nomeProfissional: {
        allowNull: false,
        type: Sequelize.STRING(100)
    },
    nomeServico: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
    diaAgendamento: {
        allowNull: false,
        type: Sequelize.DATEONLY
    },
    inicioAgendamento: {
        allowNull: false,
        type: Sequelize.STRING(10),
        validate: {
            len: [2,255]
        }
    },
    fimAgendamento: {
        allowNull: false,
        type: Sequelize.STRING(10)
    },
    obsAgendamento: {
        allowNull: true,
        type: Sequelize.STRING(500)
    }
});

module.exports = Agendamento;