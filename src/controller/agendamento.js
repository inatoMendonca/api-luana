const Agendamento = require("../model/agendamento");
const status = require('http-status');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.buscarNome = (request, response, next) => {
    const name = request.params.name;


    Agendamento.findAll({where: {nomeCliente: `${name}`}, order: [['diaAgendamento'],['inicioAgendamento']]}).then(agendamento => {
        if(agendamento) {
            response.send(agendamento);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    })
}

exports.buscarData = (request, response, next) => {
    const data = request.params.data;
    
    Agendamento.findAll({where: {diaAgendamento: `${data}`}, order: [['diaAgendamento'],['inicioAgendamento']]}).then(agendamento => {
        if(agendamento) {
            response.send(agendamento);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    })
}

exports.getRecibo = (request, response, next) => {//Método que busca um agendamento pelo ID
    const id = request.params.id;

    Agendamento.findByPk(id).then(agendamento => { //retorna uma promisse (programação assíncrona). O método then registra a requisição que acontece quando a promisse for resolvida
        if(agendamento) {
            response.send(agendamento);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error)); // O Catch registra a requisição quando a promisse falhar.
};

exports.buscarUm = (request, response, next) => {//Método que busca um agendamento pelo ID
    const id = request.params.id;

    Agendamento.findByPk(id).then(agendamento => { //retorna uma promisse (programação assíncrona). O método then registra a requisição que acontece quando a promisse for resolvida
        if(agendamento) {
            response.send(agendamento);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error)); // O Catch registra a requisição quando a promisse falhar.
};

exports.buscarTodos = (request, response, next) => { // Método que busca todos os agendamentos
    let limite = parseInt(request.query.limite || 0); // Parâmetro que vem da URL convertido em inteiro
    let pagina = parseInt(request.query.pagina || 0);
    
    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.NOT_FOUND).send(); //Retorna bad request indicando que algum parâmetro está errado
    }

    const ITENS_POR_PAGINA = 500;// Calcula a quantidade de itens por página

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Agendamento.findAll({where: {diaAgendamento: {[Op.gte]: new Date()}, valorAgendamento: null}, limit: limite, offset: pagina, order: [['diaAgendamento'],['inicioAgendamento']]}).then(agendamentos => { // Busca vários registros no banco que recebe um objeto com limit e offset, paginando os itens
        response.send(agendamentos);
    }).catch(error => next(error));
};

exports.criar = (request, response, next) => {
    const nomeCliente = request.body.nomeCliente; // Captura os atributos do json
    const nomeProfissional = request.body.nomeProfissional;
    const nomeServico = request.body.nomeServico;
    const diaAgendamento = request.body.diaAgendamento;
    const inicioAgendamento = request.body.inicioAgendamento;
    const fimAgendamento = request.body.fimAgendamento;
    const obsAgendamento = request.body.obsAgendamento;
    const valorAgendamento = request.body.valorAgendamento;
    const formaPagamento = request.body.formaPagamento;

    Agendamento.create({ // Chama o metodo do Agendamento, passando o objeto montado;
        nomeCliente: nomeCliente,
        nomeProfissional: nomeProfissional,
        nomeServico: nomeServico,
        diaAgendamento: diaAgendamento,
        inicioAgendamento: inicioAgendamento,
        fimAgendamento: fimAgendamento,
        obsAgendamento: obsAgendamento,
        valorAgendamento: valorAgendamento,
        formaPagamento: formaPagamento
    }).then(() => {
        response.status(status.OK).send();// Retorna se a inserção for success
    }).catch(error => next(error));
};

exports.atualizar = (request, response, next) => { // Quando atualizamos, enviamos o ID pela url e capturamos para fazer a alteração
    const id = request.params.id;

    const nomeCliente = request.body.nomeCliente; // Captura os atributos do json
    const nomeProfissional = request.body.nomeProfissional;
    const nomeServico = request.body.nomeServico;
    const diaAgendamento = request.body.diaAgendamento;
    const inicioAgendamento = request.body.inicioAgendamento;
    const fimAgendamento = request.body.fimAgendamento;
    const obsAgendamento = request.body.obsAgendamento;
    const valorAgendamento = request.body.valorAgendamento;
    const formaPagamento = request.body.formaPagamento;

    Agendamento.findByPk(id).then(agendamento => { // Combinamos os métodos findById e Update, validando se o ID para a alteração do registro existe
        if(agendamento) {
            Agendamento.update({ // Recebe dois parâmetros - 1 - recebe os dados novos e atribuem ao json para registro
                nomeCliente: nomeCliente,
                nomeProfissional: nomeProfissional,
                nomeServico: nomeServico,
                diaAgendamento: diaAgendamento,
                inicioAgendamento: inicioAgendamento,
                fimAgendamento: fimAgendamento,
                obsAgendamento: obsAgendamento,
                valorAgendamento: valorAgendamento,
                formaPagamento: formaPagamento
                },{where: {idAgendamento: id} } // 2 - Cláusula que relaciona o ID do parâmetro com o ID registrado no banco
            ).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}

exports.excluir = (request, response, next) => { //Método que deleta uma inserção
    const id = request.params.id;
    Agendamento.findByPk(id).then(agendamento => { // Busca pelo ID recebido do parâmetro do agendamento aberto
        
        if(agendamento) {
            Agendamento.destroy({ // Relaciona o ID do parâmetro com o ID do banco e faz o delete
                where: {idAgendamento: id}
            }).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}