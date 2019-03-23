'use strict';

const Mongoose = require('mongoose');
const TiposEsquema = Mongoose.Schema.Types;
const AutoIncrementar = require('mongoose-plugin-autoinc');
const NombreTabla = 'centro_educativo_';



/*

https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
https://mongoosejs.com/docs/schematypes.html
http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example

https://charlascylon.com/tutorialmongo

manejo de imagenes en node js:
https://github.com/cloudinary/cloudinary_npm/blob/master/samples/basic/basic.js


cuando un centro educ. se registra se debe notificar al administrador. la lista con el nombre, cedula juridica, provincia, canton, distrito. En rojo los que se solicitaron hace más de 3 días habiles (sin sabado o domingo).



centro educativo {nombre, nombre comercial, cedula juridica, si es privado o publico, si es escuela o colegios u otro centro, foto (opcional para el cliente), direccion (por provincia, canton, distrito), direccion exacta, ubicacion (mapa donde yo veo donde está el lugar), 
año de fundacion, referencia historica o idea de esa institucion si no hay referencia, 
adjuntar docs que lo verifique como centro educativo, 
telefono, fax, sitio web asociado  (opcional para el cliente), redesSociales(opcional para el cliente), 
correo contacto, nombre del contacto, identificacion del contacto, departamento del contacto, telefono del contacto, extension del contacto  (opcional para el cliente), foto del contacto  (opcional para el cliente), }

----------------------


Cuando la cuenta ya fue aprobada puede:
crear actividades (show de talentos... etc), los niveles que maneja el centro (primaria i ciclo... ii ciclo .etc, secundaria... etc), mostrar si tiene el bachillerato internacional (obligatorio), 
agregar por cada nivel la lista de utiles (adjunto: pdf... etc), 
add los servicios que ofrece (dentista, clubes, cocina, becas, busetas (no incluir la ruta de las busetas)... etc) Y add descripcion para cada servicio, indicar si maneja idiomas y cuales son, indicar si imparte religion o no, indicar si es sólo para hombres o solo para mujeres o mixto, 

*/


let schemaRegistrarCEdu = new Mongoose.Schema(
    {
        correo: {
            type: TiposEsquema.String,
            required: true,
            unique: true,
            trim: true
        },
        nombre: {
            type: TiposEsquema.String,
            required: true,
            trim: true
        },
        nombreComercial: {
            type: TiposEsquema.String,
            required: true,
            trim: true
        },
        cedulaJuridica: {
            type: TiposEsquema.Number,
            required: true
        },
        tipoInstitucion: {
            type: TiposEsquema.String,
            required: true,
            trim: true,
            enum: ['Privada', 'Pública']
        },
		nivel: {type: TiposEsquema.String, required: true},
        /*nivel: [{
            idNivel: {type: TiposEsquema.ObjectId, ref: 'centro_educativo_nivel_', required: true},
            listaUtiles: [{
                tipo: {type: TiposEsquema.String},
                descripcion: {type: TiposEsquema.String},
                cantidad: {type: TiposEsquema.Number}
            }]
        }],*/
		
		fotoCentro: {type: TiposEsquema.String, required: false},
		 
        direccion: [{
             idProvincia: {type: TiposEsquema.Number, required: true},
             idCanton: {type: TiposEsquema.Number, required: true},
             idDistrito: {type: TiposEsquema.Number, required: true},
             sennas: {type: TiposEsquema.String, required: true}
        }],
		
        ubicacion: [{
            latitud: {type: TiposEsquema.String, required: true},
            longitud: {type: TiposEsquema.String, required: true}
        }],
        annoFundacion: {
            type: TiposEsquema.Number,
            required: true
        },
        referenciaHistorica: {
            type: TiposEsquema.String,
			required: true
        },
		 //adjuntosPermisos,
        telefono: {
            type: TiposEsquema.Number,
            min: 8,
            required: true
        },
        fax: {
            type: TiposEsquema.Number, required: false
        },
        /*sitioWeb: {
            type: TiposEsquema.String, required: false
        },
        redesSociales: [{
            type: TiposEsquema.String, required: false
        }],*/
        contacto: [{
            correo: {type: TiposEsquema.String, trim: true},
            primerNombre: {type: TiposEsquema.String},
            segundoNombre: {type: TiposEsquema.String},
            primerApellido: {type: TiposEsquema.String},
            segundoApellido: {type: TiposEsquema.String},
            identificacion: {type: TiposEsquema.Number},
            departamento: {type: TiposEsquema.String},
            telefono: {type: TiposEsquema.Number}/*,
			 foto: ,
            extension: {type: TiposEsquema.Number}*/
        }],
	/*---------------------------------------- */
        tipoAlumno: {
            type: TiposEsquema.String,
            required: false,
            trim: true,
            enum: ['Mixto', 'Mujer', 'Hombre']
        },
        bachillerInternacional: {
            type: TiposEsquema.Boolean, required: false
        },
        religion: {
            type: TiposEsquema.String, required: false
        },
        idiomas: [{
            type: TiposEsquema.String, required: false
        }],
        servicios: [{
            type: TiposEsquema.String, required: false
        }],
        actividades: [{
            descripcion: {type: TiposEsquema.String},
            fecha: {type: TiposEsquema.String}
        }],
        comentarios: [{
            texto: {type: TiposEsquema.String},
            /* posteadoPor: {
                 type: TiposEsquema.ObjectId,
                 ref: 'padres_familia_'
             }*/
        }]
       
        //enfasis,
    }
);

schemaRegistrarCEdu.plugin(AutoIncrementar.plugin, {
    model: NombreTabla,
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = Mongoose.model(NombreTabla, schemaRegistrarCEdu);

