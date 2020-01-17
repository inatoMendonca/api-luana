const Fornecedor = require("../model/fornecedor");
const status = require('http-status');

exports.buscarUm = (request, response, next) => {//Método que busca um fornecedor pelo ID
    const id = request.params.id;

    Fornecedor.findByPk(id).then(fornecedor => { //retorna uma promisse (programação assíncrona). O método then registra a requisição que acontece quando a promisse for resolvida
        if(fornecedor) {
            response.send(fornecedor);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error)); // O Catch registra a requisição quando a promisse falhar.
};

exports.buscarTodos = (request, response, next) => { // Método que busca todos os fornecedores
    let limite = parseInt(request.query.limite || 0); // Parâmetro que vem da URL convertido em inteiro
    let pagina = parseInt(request.query.pagina || 0);
    
    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.NOT_FOUND).send(); //Retorna bad request indicando que algum parâmetro está errado
    }

    const ITENS_POR_PAGINA = 500;// Calcula a quantidade de itens por página

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Fornecedor.findAll({limit: limite, offset: pagina}).then(fornecedores => { // Busca vários registros no banco que recebe um objeto com limit e offset, paginando os itens
        response.send(fornecedores);
    }).catch(error => next(error));
};

exports.criar = (request, response, next) => {
    const nomeFornecedor = request.body.nomeFornecedor; // Captura os atributos do json
    const mailFornecedor = request.body.mailFornecedor;
    const foneFornecedor = request.body.foneFornecedor;
    const obsFornecedor = request.body.obsFornecedor;

    Fornecedor.create({ // Chama o metodo do Fornecedor, passando o objeto montado;
        nomeFornecedor: nomeFornecedor,
        mailFornecedor: mailFornecedor,
        foneFornecedor: foneFornecedor,
        obsFornecedor: obsFornecedor
    }).then(() => {
        response.status(status.OK).send();// Retorna se a inserção for success
    }).catch(error => next(error));
};

exports.atualizar = (request, response, next) => { // Quando atualizamos, enviamos o ID pela url e capturamos para fazer a alteração
    const id = request.params.id;

    const nomeFornecedor = request.body.nomeFornecedor; // Captura os atributos do json
    const mailFornecedor = request.body.mailFornecedor;
    const foneFornecedor = request.body.foneFornecedor;
    const obsFornecedor = request.body.obsFornecedor;

    Fornecedor.findByPk(id).then(fornecedor => { // Combinamos os métodos findById e Update, validando se o ID para a alteração do registro existe
        if(fornecedor) {
            Fornecedor.update({ // Recebe dois parâmetros - 1 - recebe os dados novos e atribuem ao json para registro
                nomeFornecedor: nomeFornecedor,
                mailFornecedor: mailFornecedor,
                foneFornecedor: foneFornecedor,
                obsFornecedor: obsFornecedor
                },{where: {idFornecedor: id} } // 2 - Cláusula que relaciona o ID do parâmetro com o ID registrado no banco
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
    Fornecedor.findByPk(id).then(fornecedor => { // Busca pelo ID recebido do parâmetro do fornecedor aberto
        
        if(fornecedor) {
            Fornecedor.destroy({ // Relaciona o ID do parâmetro com o ID do banco e faz o delete
                where: {idFornecedor: id}
            }).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}