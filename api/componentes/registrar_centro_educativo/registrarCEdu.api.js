'use strict';

const Tiza = require('chalk');
const ModelCEduNiveles = require('./../centro_educativo_niveles/CEduNiveles.model');
const ModelRegistrarCEdu = require('./registrarCEdu.model');
const ObtenerPin = require('./../funciones_genericas/obtenerPin');


module.exports.registrar = async (req, res) => {
 try {	 
let cEduNuevo = new ModelRegistrarCEdu();

cEduNuevo.correo = req.body.correoCentro;
cEduNuevo.nombre = req.body.nombre;
cEduNuevo.nombreComercial = req.body.nombreComercial;
cEduNuevo.cedulaJuridica = req.body.cedulaJuridica;
cEduNuevo.tipoInstitucion = req.body.tipoInstitucion;
cEduNuevo.annoFundacion = req.body.annoFundacion;
cEduNuevo.referenciaHistorica = req.body.resenna;
cEduNuevo.telefono = req.body.telefonoCentro;
cEduNuevo.tipoInstitucion = req.body.tipoInstitucion;
cEduNuevo.nivel = req.body.niveles;
cEduNuevo.direccion = [{
             idProvincia: req.body.idProvincia,
             idCanton: req.body.idCanton,
             idDistrito: req.body.idDistrito,
             sennas: req.body.dirSennas
        }];
cEduNuevo.contacto = [{
            correo: req.body.correoContacto,
            primerNombre: req.body.primerNombre,
            segundoNombre: req.body.segundoNombre,
            primerApellido: req.body.primerApellido,
            segundoApellido: req.body.segundoApellido,
            identificacion: req.body.identificacionContacto,
            departamento: req.body.departamentoContacto,
            telefono: req.body.telefonoContacto
        }];
		
cEduNuevo.fotoCentro = req.body.fotoCentro;

let guardar = await cEduNuevo.save();

res.json({
            success: true,
            message: 'El centro educativo se registró correctamente'
        });

} catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al registrar el centro educativo:'));
        console.log(Tiza.bold.yellow.bgBlack(err.message));
        
		res.json({
            success: false,
            message: 'Error al registrar el centro educativo'
        });
    }
    

};



module.exports.obtener_todos = async (req, res) => {
    try {
	    const mostrarColumnas = {_id:0};

		const resultado = await ModelRegistrarCEdu.find({}, mostrarColumnas).sort({_id: 'asc'});
        if (!!Object.keys(resultado).length) {
            res.json({
                success: true,
                message: resultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron datos'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los centros educativos'
        });
    }
};



