const {Schema, model } = require('mongoose')

const Hito4Schema = new Schema({
    solucion: String,
    tipo_solucion: String,
    correccion: String,
    valida: String,
    motivo: String,
    fecha_prueba: Date,
    logro_resultado: String,
    lista_escalamiento_grupo: String,
    lista_escalamiento_contacto: String,
    lista_escalamiento_resultado: String,
    tipo_solucion2: String,
    correccion2: String,
    cumplimiento: String
}, {
    timestamps: true
})

module.exports = model('Hito4', Hito4Schema)