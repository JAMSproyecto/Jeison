'use strict';

const Mongoose = require('mongoose');
const TiposEsquema = Mongoose.Schema.Types;
const AutoIncrementar = require('mongoose-plugin-autoinc');
const NombreTabla = 'usuarios_';

let schemaUsuarios = new Mongoose.Schema(
    {
        correo: {
            type: TiposEsquema.String,
            required: true,
            unique: true,
            trim: true
        },
        contrasena: {
            type: TiposEsquema.String,
            required: false,
            trim: true
        },
        tipo: {
            type: TiposEsquema.String,
            required: true,
            enum: ['SuperAdmin', 'CentroEducativo', 'PadreFamilia']
        },
        aprobado: {
            type: TiposEsquema.Boolean,
            required: true,
            default: false
        },
        activo: {
            type: TiposEsquema.Boolean,
            required: true,
            default: false
        },
        pin: {
            type: TiposEsquema.String,
            required: true
        },
        fechaCreado: {
            type: TiposEsquema.String,
            required: true
        },
        fechaActualizado: {
            type: TiposEsquema.String,
            required: false
        }
    }
);

schemaUsuarios.plugin(AutoIncrementar.plugin, {
    model: NombreTabla,
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = Mongoose.model(NombreTabla, schemaUsuarios);

