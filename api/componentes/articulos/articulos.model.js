'use strict';

const mongoose = require('mongoose');
const NombreTabla = 'articulo_';

let schema_articulo = new mongoose.Schema(
    {
    codigo : {type : String, unique : true, require : true},
    nombre : {type : String, required : true},
    descripcion : {type : String, required : true}
    }
);

module.exports = mongoose.model(NombreTabla, schema_articulo);
