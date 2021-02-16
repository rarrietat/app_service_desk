const {Schema, model } = require('mongoose')

const GrupoGicsSchema = new Schema({
    equipo_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'EquipoAsignado'
    }],
    zonal_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'ZonalAsignado'
    }],
    grupo_gics: String,
    descripcion: String
}, {
    timestamps: true
})

module.exports = model('GrupoGics', GrupoGicsSchema)