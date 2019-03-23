'use strict';

const mongoose = require('mongoose');
const NombreTabla = 'lista_utiles_';

let schema_utiles = new mongoose.Schema(
    {   //codigo :{type : mongoose.Types.ObjectId, ref: 'centro_educativo_', require : true},
        codigo : {type : String, required : true},
        tipo: {type :String, required : true},
        nombre : {type : String, required : true},
        anno : {type : String, required : false},
        articulos : [
            {
                nombre : {type : String, require : true},
                descripcion : {type : String, require : true},
                cantidad :{type : Number, require : true}
                
            }
        ]
    }
);

module.exports = mongoose.model(NombreTabla, schema_utiles);