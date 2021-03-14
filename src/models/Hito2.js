const {Schema, model } = require('mongoose')

const Hito1Schema = new Schema({
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
    fecha_atencion: Date,
    logro_resultado: String,
    // grupo_asignado2: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'GrupoGics'
    // }],
    // tecnico_asignado2: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Tecnico'
    // }],
    lista_escalamiento_grupo: String,
    lista_escalamiento_contacto: String,
    lista_escalamiento_resultado: String
}, {
    timestamps: true
})

module.exports = model('Hito2', Hito1Schema)