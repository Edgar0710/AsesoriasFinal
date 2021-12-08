const mongose = require('mongoose');
const Schema = mongose.Schema;
const asesorias=mongose.model('Asesoria',
new Schema
({
    txt_name:String,    
    txt_apaterno:String,
    txt_amaterno:String,
    ddl_carrera:String,
    ddl_cuatri:String,
    group:String,
    ddl_docente:String,
    materia:String,
    date:String,
    time:String,
    au_descripcion:String
}));
module.exports = asesorias;