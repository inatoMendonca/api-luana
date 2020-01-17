const Profissional = require("../model/profissional");
const status = require('http-status');

exports.buscarUm = (request, response, next) => {//Método que busca um profissional pelo ID
    const id = request.params.id;

    Profissional.findByPk(id).then(profissional => { //retorna uma promisse (programação assíncrona). O método then registra a requisição que acontece quando a promisse for resolvida
        if(profissional) {
            response.send(profissional);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error)); // O Catch registra a requisição quando a promisse falhar.
};

exports.buscarTodos = (request, response, next) => { // Método que busca todos os profissionais
    let limite = parseInt(request.query.limite || 0); // Parâmetro que vem da URL convertido em inteiro
    let pagina = parseInt(request.query.pagina || 0);
    
    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.NOT_FOUND).send(); //Retorna bad request indicando que algum parâmetro está errado
    }

    const ITENS_POR_PAGINA = 500;// Calcula a quantidade de itens por página

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Profissional.findAll({limit: limite, offset: pagina}).then(profissionais => { // Busca vários registros no banco que recebe um objeto com limit e offset, paginando os itens
        response.send(profissionais);
    }).catch(error => next(error));
};

exports.criar = (request, response, next) => {
    const nomeProfissional = request.body.nomeProfissional; // Captura os atributos do json
    const cpfProfissional = request.body.cpfProfissional;
    const foneProfissional = request.body.foneProfissional;
    const mailProfissional = request.body.mailProfissional;
    const funcaoProfissional = request.body.funcaoProfissional;
    const sexoProfissional = request.body.sexoProfissional;

    Profissional.create({ // Chama o metodo do Profissional, passando o objeto montado;
        nomeProfissional: nomeProfissional,
        cpfProfissional: cpfProfissional,
        foneProfissional: foneProfissional,
        mailProfissional: mailProfissional,
        funcaoProfissional: funcaoProfissional,
        sexoProfissional: sexoProfissional
    }).then(() => {
        response.status(status.OK).send();// Retorna se a inserção for success
    }).catch(error => next(error));
};

exports.atualizar = (request, response, next) => { // Quando atualizamos, enviamos o ID pela url e capturamos para fazer a alteração
    const id = request.params.id;

    const nomeProfissional = request.body.nomeProfissional; // Captura os atributos do json
    const cpfProfissional = request.body.cpfProfissional;
    const foneProfissional = request.body.foneProfissional;
    const mailProfissional = request.body.mailProfissional;
    const funcaoProfissional = request.body.funcaoProfissional;
    const sexoProfissional = request.body.sexoProfissional;

    Profissional.findByPk(id).then(profissional => { // Combinamos os métodos findById e Update, validando se o ID para a alteração do registro existe
        if(profissional) {
            Profissional.update({ // Recebe dois parâmetros - 1 - recebe os dados novos e atribuem ao json para registro
                nomeProfissional: nomeProfissional,
                cpfProfissional: cpfProfissional,
                foneProfissional: foneProfissional,
                mailProfissional: mailProfissional,
                funcaoProfissional: funcaoProfissional,
                sexoProfissional: sexoProfissional
                },{where: {idProfissional: id} } // 2 - Cláusula que relaciona o ID do parâmetro com o ID registrado no banco
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
    Profissional.findByPk(id).then(profissional => { // Busca pelo ID recebido do parâmetro do profissional aberto
        
        if(profissional) {
            Profissional.destroy({ // Relaciona o ID do parâmetro com o ID do banco e faz o delete
                where: {idProfissional: id}
            }).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}