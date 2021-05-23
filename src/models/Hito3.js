const {Schema, model } = require('mongoose')

const Hito3Schema = new Schema({
    desplazamiento: String,
    horario_acordado: String,
    fecha_llegada: Date,
    tecnico_responde: String,
    horario_indicado: String,
    logro_resultado: String,
    lista_escalamiento_grupo: String,
    lista_escalamiento_contacto: String,
    lista_escalamiento_resultado: String,
    grupo_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'GrupoGics'
    }],
    tecnico_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'Tecnico'
    }],
    cumplimiento: String
}, {
    timestamps: true
})

module.exports = model('Hito3', Hito3Schema)