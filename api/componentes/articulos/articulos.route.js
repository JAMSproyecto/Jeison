'use strict';

const express = require('express');
const router = express.Router();
const articulo_api = require('./articulos.api');

router.route('/registrar_articulo')
    .post(
        function(req, res){
            articulo_api.registrar(req,res);
        }
    );

router.route('/listar_articulos')
        .get(
            function(req , res)
            {
                articulo_api.listar_todos(req,res);
            }
        );

module.exports = router;
