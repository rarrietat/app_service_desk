const {Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    username: String,
    password: String,
    correo: String,
    celular: String,
    rol:[{
        type: Schema.Types.ObjectId,
        ref: 'Rol'
    }],
    equipo:[{
        type: Schema.Types.ObjectId,
        ref: 'Equipo'
    }]
}, {
    timestamps: true
})

module.exports = model('Usuario', UsuarioSchema)