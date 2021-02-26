const {Schema, model } = require('mongoose')

const AsesorSchema = new Schema({
    nombre: String,
    apellido: String,
    alias: String
}, {
    timestamps: true
})

module.exports = model('Asesor', AsesorSchema)