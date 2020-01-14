const Produto = require("../model/produto");
const status = require('http-status');

exports.buscarUm = (request, response, next) => {//Método que busca um produto pelo ID
    const id = request.params.id;

    Produto.findByPk(id).then(produto => { //retorna uma promisse (programação assíncrona). O método then registra a requisição que acontece quando a promisse for resolvida
        if(produto) {
            response.send(produto);
        } else {
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error)); // O Catch registra a requisição quando a promisse falhar.
};

exports.buscarTodos = (request, response, next) => { // Método que busca todos os produtos
    let limite = parseInt(request.query.limite || 0); // Parâmetro que vem da URL convertido em inteiro
    let pagina = parseInt(request.query.pagina || 0);
    
    if(!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(status.NOT_FOUND).send(); //Retorna bad request indicando que algum parâmetro está errado
    }

    const ITENS_POR_PAGINA = 10;// Calcula a quantidade de itens por página

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Produto.findAll({limit: limite, offset: pagina}).then(produtos => { // Busca vários registros no banco que recebe um objeto com limit e offset, paginando os itens
        response.send(produtos);
    }).catch(error => next(error));
};

exports.criar = (request, response, next) => {
    const nomeProduto = request.body.nomeProduto; // Captura os atributos do json
    const valorProduto = request.body.valorProduto;
    const qtdeProduto = request.body.qtdeProduto;
    const obsProduto = request.body.obsProduto;

    Produto.create({ // Chama o metodo do Produto, passando o objeto montado;
        nomeProduto: nomeProduto,
        valorProduto: valorProduto,
        qtdeProduto: qtdeProduto,
        obsProduto: obsProduto
    }).then(() => {
        response.status(status.OK).send();// Retorna se a inserção for success
    }).catch(error => next(error));
};

exports.atualizar = (request, response, next) => { // Quando atualizamos, enviamos o ID pela url e capturamos para fazer a alteração
    const id = request.params.id;

    const nomeProduto = request.body.nomeProduto; // Captura os atributos do json
    const valorProduto = request.body.valorProduto;
    const qtdeProduto = request.body.qtdeProduto;
    const obsProduto = request.body.obsProduto;

    Produto.findByPk(id).then(produto => { // Combinamos os métodos findById e Update, validando se o ID para a alteração do registro existe
        if(produto) {
            Produto.update({ // Recebe dois parâmetros - 1 - recebe os dados novos e atribuem ao json para registro
                nomeProduto: nomeProduto,
                valorProduto: valorProduto,
                qtdeProduto: qtdeProduto,
                obsProduto: obsProduto
                },{where: {idProduto: id} } // 2 - Cláusula que relaciona o ID do parâmetro com o ID registrado no banco
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
    Produto.findByPk(id).then(produto => { // Busca pelo ID recebido do parâmetro do produto aberto
        
        if(produto) {
            Produto.destroy({ // Relaciona o ID do parâmetro com o ID do banco e faz o delete
                where: {idProduto: id}
            }).then(() => {
                response.send(); // O send está com o status vazio porque o status 200 é padrão
            }).catch(error => next(error));
        } else { // caso não encontre, retorna o 404
            response.status(status.NOT_FOUND).send();
        }
    }).catch(error => next(error));
}