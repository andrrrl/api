import * as mongoose from 'mongoose';

var tipoEstablecimientoSchema = new mongoose.Schema({
    nombre: String, 
    descripcion: String, 
    clasificacion: String
});

var tipoEstablecimiento = mongoose.model('tipoEstablecimiento', tipoEstablecimientoSchema, 'tipoEstablecimiento');

export = tipoEstablecimiento;