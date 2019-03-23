'use strict';

const Express = require('express');
const Router = Express.Router();
const UsuarioApi = require('./usuario.api');

Router.route('/obtener_todos_usuarios').get((req, res) => {
    UsuarioApi.obtener_todos(req, res);
});


Router.route('/obtener_usuarios_activos').get((req, res) => {
    UsuarioApi.obtener_activos(req, res);
});

Router.route('/obtener_usuarios_pendientes').get((req, res) => {
    UsuarioApi.obtener_pendientes(req, res);
});


module.exports = Router;

