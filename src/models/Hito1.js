const {Schema, model } = require('mongoose')

const Hito1Schema = new Schema({
    registro_tiempo: String,
    asesor: [{
        type: Schema.Types.ObjectId,
        ref: 'Asesor'
    }],
    diag_correcto: String,
    hito1_descripcion: String,
    despacho_correcto: String,
    grupo_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'GrupoGics'
    }],
    usuario_asignado: [{
        type: Schema.Types.ObjectId,
        ref: 'UsuarioGrupoGics'
    }],
    cumplimiento: String
}, {
    timestamps: true
})

module.exports = model('Hito1', Hito1Schema)