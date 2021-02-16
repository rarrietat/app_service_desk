const {Schema, model } = require('mongoose')

const EquipoAsignadoSchema = new Schema({
    equipo: String,
    descripcion: String
}, {
    timestamps: true
})

module.exports = model('EquipoAsignado', EquipoAsignadoSchema)