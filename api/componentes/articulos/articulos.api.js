'use strict';
const model_articulo = require('./articulos.model');
const ModelBitacora = require('./../bitacora_transaccional/bitacora.model');
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');

/**
 * Función para insertar en la bitácora
 * @param  {String} pRealizadaPor Sólo acepta: 'Instalador'|'SuperAdmin'|'CentroEducativo'|'PadreFamilia'.
 * @param  {String} pAccion Descripción de lo que se va a registrar.
 * @return {Boolean}
 */
let insertarBitacora = async (pRealizadaPor, pAccion) => {
    try {
        let bitacora_nuevo = new ModelBitacora({
            realizadaPor: pRealizadaPor || '',
            accion: pAccion || '',
            fecha: ObtenerFecha.get() || ''
        });
        let guardarAccion = await bitacora_nuevo.save();
        console.log(`Se registró en la bitácora: ${pAccion}`);
    } catch (err) {
        console.log(`Error al registrar en la bitácora '${pAccion}':`);
        console.log(err.message);
        return false;
    }
    return true;
};


module.exports.registrar = (req,res) => {
    let articulo_nuevo = new  model_articulo(
        {
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        descripcion : req.body.descripcion
        }
    );


articulo_nuevo.save(
     function(error){
        if (error){
			
			const log = insertarBitacora('CentroEducativo', `Error al registrar el artículo: ${req.body.nombre} | ${error}`);
			
            res.json(
                {
                    success : false,
                    msg : `No se pudo guardar el articulo, ocurrio el siguiente error ${error} `
                }
            );
        } else {
			
			const log = insertarBitacora('CentroEducativo', `Se registró el artículo: ${req.body.nombre} - ${req.body.descripcion}`);
			
            res.json(
                {
                    success : true,
                    msg :  `se registro el articulo de forma correcta`
                }
            );
        }
    }
);
};

module.exports.listar_todos = (req, res) =>{
    model_articulo.find().then(
        function(articulos){
            if (articulos.length > 0) {
                res.json(
                    {
                        success :  true,
                        articulos : articulos
                    }
                )
            } else {
                res.json(
                    {
                        success : false,
                        articulos : `no se encontraron artilos registrados`
                    }
                )
            }
        }
    )
};