const {Schema, model } = require('mongoose')

const EquipoSchema = new Schema({
    equipo: String,
    descripcion: String
}, {
    timestamps: true
})

module.exports = model('Equipo', EquipoSchema)