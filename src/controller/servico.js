const Servico = require("../model/servico");
const status = require('http-status');

exports.buscarNome = (request, response, next) => {
    const name = request.params.name;


    Servico.findAll({where: {nomeServico: `${name}`}}).then(servico => {
        if(servico) {
            response.send(servico);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    })
}

exports.buscarUm = (request, response, next) => {//Método que busca um servico pelo ID
    const id = request.params.id;

    Servico.findByPk(id).then(servico => { //retorna uma promisse (programação assíncrona). O método then registra a requisição que acontece quando a promisse for resolvida
        if(servico) {
            response.send(servico);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error)); // O Catch registra a requisição quando a promisse falhar.
};

exports.buscarTodos = (request, response, next) => { // Método que busca todos os servicos
    let limite = parseInt(request.query.limite || 0); // Parâmetro que vem da URL convertido em inteiro
    let pagina = parseInt(request.query.pagina || 0);
    
    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.NOT_FOUND).send(); //Retorna bad request indicando que algum parâmetro está errado
    }

    const ITENS_POR_PAGINA = 10;// Calcula a quantidade de itens por página

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Servico.findAll({limit: limite, offset: pagina}).then(servicos => { // Busca vários registros no banco que recebe um objeto com limit e offset, paginando os itens
        response.send(servicos);
    }).catch(error => next(error));
};

exports.criar = (request, response, next) => {
    const nomeServico = request.body.nomeServico; // Captura os atributos do json
    const valorServico = request.body.valorServico;
    const obsServico = request.body.obsServico;

    Servico.create({ // Chama o metodo do Servico, passando o objeto montado;
        nomeServico: nomeServico,
        valorServico: valorServico,
        obsServico: obsServico
    }).then(() => {
        response.status(status.OK).send();// Retorna se a inserção for success
    }).catch(error => next(error));
};

exports.atualizar = (request, response, next) => { // Quando atualizamos, enviamos o ID pela url e capturamos para fazer a alteração
    const id = request.params.id;

    const nomeServico = request.body.nomeServico; // Captura os atributos do json
    const valorServico = request.body.valorServico;
    const obsServico = request.body.obsServico;

    Servico.findByPk(id).then(servico => { // Combinamos os métodos findById e Update, validando se o ID para a alteração do registro existe
        if(servico) {
            Servico.update({ // Recebe dois parâmetros - 1 - recebe os dados novos e atribuem ao json para registro
                nomeServico: nomeServico,
                valorServico: valorServico,
                obsServico: obsServico
                },{where: {idServico: id} } // 2 - Cláusula que relaciona o ID do parâmetro com o ID registrado no banco
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
    Servico.findByPk(id).then(servico => { // Busca pelo ID recebido do parâmetro do servico aberto
        
        if(servico) {
            Servico.destroy({ // Relaciona o ID do parâmetro com o ID do banco e faz o delete
                where: {idServico: id}
            }).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}