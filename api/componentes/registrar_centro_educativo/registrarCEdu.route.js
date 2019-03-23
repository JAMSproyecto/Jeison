'use strict';
const Express = require('express');
const Router =  Express.Router();
const RegistrarCEduApi = require('./registrarCEdu.api');

Router.route('/registrar_centro_educativo').post((req, res) => {
    RegistrarCEduApi.registrar(req, res);
});

Router.route('/obtener_todos_centro_educativo').get((req, res) => {
    RegistrarCEduApi.obtener_todos(req, res);
});

module.exports = Router;

