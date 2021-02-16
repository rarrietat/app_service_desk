const {Schema, model } = require('mongoose')

const UsuarioGrupoGicsSchema = new Schema({
    nombre: String,
    apellido: String,
    equipo_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'EquipoAsignado'
    }],
    zonal_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'ZonalAsignado'
    }],
    grupo_gics: [{
        type: Schema.Types.ObjectId,
        ref: 'GrupoGics'
    }]
}, {
    timestamps: true
})

module.exports = model('UsuarioGrupoGics', UsuarioGrupoGicsSchema)