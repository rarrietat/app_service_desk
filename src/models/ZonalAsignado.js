const {Schema, model } = require('mongoose')

const ZonalAsignadoSchema = new Schema({
    zonal: String,
    descripcion: String,
    equipo_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'EquipoAsignado'
    }]
}, {
    timestamps: true
})

module.exports = model('ZonalAsignado', ZonalAsignadoSchema)