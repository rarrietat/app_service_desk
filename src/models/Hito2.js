const {Schema, model } = require('mongoose')

const Hito2Schema = new Schema({
    asignar_personal: String,
    grupo_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'GrupoGics'
    }],
    tecnico_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'Tecnico'
    }],
    informar_motivo: String,
    status_chb: String,
    fecha_atencion: Date,
    logro_resultado: String,
    lista_escalamiento_grupo: String,
    lista_escalamiento_contacto: String,
    lista_escalamiento_resultado: String
}, {
    timestamps: true
})

module.exports = model('Hito2', Hito2Schema)