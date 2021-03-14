const {Schema, model } = require('mongoose')

const AsignacionSchema = new Schema({
    nro_incidencia: String,
    cliente: String,
    resumen: String,
    estado_inc: String,
    prioridad: String,
    segmento: String,
    plazo: String,
    fecha: Date,
    estado_sla: String,
    escalado: String,
    grupo_asignado: String,
    usuario_asignado: String,
    nota: String,
    tipo_inc: String,
    usuario:[{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    hito1:[{
        type: Schema.Types.ObjectId,
        ref: 'Hito1'
    }],
    hito2:[{
        type: Schema.Types.ObjectId,
        ref: 'Hito2'
    }]
}, {
    timestamps: true
})

module.exports = model('Asignacion', AsignacionSchema)