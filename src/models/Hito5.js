const {Schema, model } = require('mongoose')

const Hito5Schema = new Schema({
    tipo_averia: String,
    fecha_cierre: Date,
    cumplimiento: String
}, {
    timestamps: true
})

module.exports = model('Hito5', Hito5Schema)