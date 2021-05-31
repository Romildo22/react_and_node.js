const express = require('express');
const routes = express.Router();

const UsersController = require('./controllers/UsersController');
const TarefasController = require('./controllers/TarefasController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/users', UsersController.pesquisar);
routes.get('/users/:id', UsersController.pesquisarUnicoId);
routes.get('/tarefas', TarefasController.pesquisar);
routes.get('/tarefas/:id', TarefasController.pesquisarUnico);

routes.post('/users', UsersController.inserir);
routes.post('/tarefas', TarefasController.inserir);

routes.delete('/tarefas/:id', TarefasController.delete);

routes.put('/tarefas/:id', TarefasController.alterar);
routes.put('/users/:id', UsersController.alterar);

module.exports = routes;