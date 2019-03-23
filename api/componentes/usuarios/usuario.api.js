'use strict';

const ModelUsuarios = require('./usuario.model');
const Tiza = require('chalk');

module.exports.obtener_todos = async (req, res) => {
    try {
        const resultado = await ModelUsuarios.find().sort({_id: 'desc'});
        if (!!Object.keys(resultado).length) {
            let obtenerResultado = [];
            const has = Object.prototype.hasOwnProperty;
            let key;
            for (key in resultado) {
                if (!has.call(resultado, key)) continue;
                obtenerResultado.push({
                    'id': resultado[key]['_id'] || 0,
                    'correo': resultado[key]['correo'] || '',
                    'contrasena': resultado[key]['contrasena'] || '',
                    'tipo': resultado[key]['tipo'] || '',
                    'aprobado': resultado[key]['aprobado'] || false,
                    'activo': resultado[key]['activo'] || false,
                    'pin': resultado[key]['pin'] || '',
                    'fechaCreado': resultado[key]['fechaCreado'] || '',
                    'fechaActualizado': resultado[key]['fechaActualizado'] || '',
                });
            }
            res.json({
                success: true,
                message: obtenerResultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron usuarios'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener los usuarios:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los usuarios'
        });
    }
};

module.exports.obtener_activos = async (req, res) => {
    try {
        const resultado = await ModelUsuarios.find({activo: true}).sort({_id: 'desc'});
        if (!!Object.keys(resultado).length) {
            let obtenerResultado = [];
            const has = Object.prototype.hasOwnProperty;
            let key;
            for (key in resultado) {
                if (!has.call(resultado, key)) continue;

                //El usuario se activa cuando se envía la contraseña, no debe estar vacia.
                const laContrasena = resultado[key]['contrasena'] || '';

                if (laContrasena.trim().length > 0) {
                    obtenerResultado.push({
                        'id': resultado[key]['_id'] || 0,
                        'correo': resultado[key]['correo'] || '',
                        'contrasena': laContrasena || '',
                        'tipo': resultado[key]['tipo'] || '',
                        'aprobado': resultado[key]['aprobado'] || false,
                        'activo': resultado[key]['activo'] || false,
                        'pin': resultado[key]['pin'] || '',
                        'fechaCreado': resultado[key]['fechaCreado'] || '',
                        'fechaActualizado': resultado[key]['fechaActualizado'] || '',
                    });
                }
            }
            res.json({
                success: true,
                message: obtenerResultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron usuarios activos'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener los usuarios activos:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los usuarios activos'
        });
    }
};

module.exports.obtener_pendientes = async (req, res) => {
    try {
        const filtros = {aprobado: false, tipo: 'CentroEducativo'};

        const resultado = await ModelUsuarios.find(filtros).sort({_id: 'asc'});
        if (!!Object.keys(resultado).length) {
            let obtenerResultado = [];
            const has = Object.prototype.hasOwnProperty;
            let key;
            for (key in resultado) {
                if (!has.call(resultado, key)) continue;

                // Si el pin existe es porque está pendiente de aprobar por el admin
                const elPin = resultado[key]['pin'] || '';

                if (elPin.trim().length > 0) {
                    obtenerResultado.push({
                        'id': resultado[key]['_id'] || 0,
                        'correo': resultado[key]['correo'] || '',
                        'contrasena': resultado[key]['contrasena'] || '',
                        'tipo': resultado[key]['tipo'] || '',
                        'aprobado': resultado[key]['aprobado'] || false,
                        'activo': resultado[key]['activo'] || false,
                        'pin': elPin,
                        'fechaCreado': resultado[key]['fechaCreado'] || '',
                        'fechaActualizado': resultado[key]['fechaActualizado'] || '',
                    });
                }
            }
            res.json({
                success: true,
                message: obtenerResultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron usuarios pendientes'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al obtener los usuarios pendientes:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los usuarios pendientes'
        });
    }
};

