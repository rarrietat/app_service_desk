const {Schema, model } = require('mongoose')

const RolSchema = new Schema({
    rol: String,
    descripcion: String
}, {
    timestamps: true
})

module.exports = model('Rol', RolSchema)