const {Schema, model } = require('mongoose')

const HorarioSchema = new Schema({
    usuario:[{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    mes: String,
    semanal: [{
        ingreso: String,
        salida: String,
        refrigerio: [{
            inicio: String,
            fin: String
        }]
    }],
    finSemana:[{
        dia: String,
        ingreso: String,
        salida: String,
        refrigerio: [{
            inicio: String,
            fin: String
        }]
    }],
    descanso: String
}, {
    timestamps: true
})

module.exports = model('Horario', HorarioSchema)