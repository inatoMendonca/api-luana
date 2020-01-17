const express = require('express');
const servicoController = require('../controller/servico');
const produtoController = require('../controller/produto');
const profissionalController = require('../controller/profissional');
const fornecedorController = require('../controller/fornecedor');
const clienteController = require('../controller/cliente');
const agendamentoController = require('../controller/agendamento');

const router = express();

console.log('Enabling CORS');
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://luana-mansueli.herokuapp.com/home');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.status(200).send();
    } else {
        next();
    }
};

router.use(allowCrossDomain);

//endpoints Serviço
router.get('/servicos/:id', servicoController.buscarUm);
router.get('/servicos/nome/:name', servicoController.buscarNome);
router.get('/servicos', servicoController.buscarTodos);
router.post('/servicos', servicoController.criar);
router.put('/servicos/:id', servicoController.atualizar);
router.delete('/servicos/:id', servicoController.excluir);

//endpoints Produto
router.get('/produtos/:id', produtoController.buscarUm);
router.get('/produtos', produtoController.buscarTodos);
router.post('/produtos', produtoController.criar);
router.put('/produtos/:id', produtoController.atualizar);
router.delete('/produtos/:id', produtoController.excluir);

//endpoints Profissional
router.get('/profissionais/:id', profissionalController.buscarUm);
router.get('/profissionais', profissionalController.buscarTodos);
router.post('/profissionais', profissionalController.criar);
router.put('/profissionais/:id', profissionalController.atualizar);
router.delete('/profissionais/:id', profissionalController.excluir);

//endpoints Fornecedor
router.get('/fornecedores/:id', fornecedorController.buscarUm);
router.get('/fornecedores', fornecedorController.buscarTodos);
router.post('/fornecedores', fornecedorController.criar);
router.put('/fornecedores/:id', fornecedorController.atualizar);
router.delete('/fornecedores/:id', fornecedorController.excluir);

//endpoints Cliente
router.get('/clientes/:id', clienteController.buscarUm);
router.get('/clientes', clienteController.buscarTodos);
router.post('/clientes', clienteController.criar);
router.put('/clientes/:id', clienteController.atualizar);
router.delete('/clientes/:id', clienteController.excluir);

//endpoints Agendamento
router.get('/agendamentos/:id', agendamentoController.buscarUm);
router.get('/agendamentos/nome/:name', agendamentoController.buscarNome);
router.get('/agendamentos/data/:data', agendamentoController.buscarData);
router.get('/agendamentos', agendamentoController.buscarTodos);
router.post('/agendamentos', agendamentoController.criar);
router.put('/agendamentos/:id', agendamentoController.atualizar);
router.delete('/agendamentos/:id', agendamentoController.excluir);

module.exports = router;