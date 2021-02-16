const asignacionCtrl = {}
const path = require('path')
const XLSX = require('xlsx')
const Asignacion = require('../models/Asignacion')
const helperFile = require('../helpers/file')
const helperAveria = require('../helpers/averia')
const Usuario = require('../models/Usuario')

const dayjs = require('dayjs')
require('dayjs/locale/es')
dayjs.locale('es')

asignacionCtrl.renderAsignacionForm = (req, res) => {

    res.render('asignacion/agregar-asignacion', {
        activeAsignacion: true,
        rutaActive: true,
        ruta: 'asignacion',
        nameModule: 'Asignaciones',
        action: 'Nueva Asignación'
    })

}

asignacionCtrl.uploadFileAsignacion = async (req, res) => {

    await helperFile.UploadFile(req, res)

}

asignacionCtrl.createNewAsignacion = async (req, res) => {
    
    await helperAveria.LeerExcel()

    req.flash('success_msg', 'Averías asignadas!')
    res.redirect('/asignacion')

}

asignacionCtrl.allAsignaciones = async (req, res) => {

    const rol_id = req.user.rol[0]
    const equipo_id = req.user.equipo[0]
    const user_eq = await Usuario.find({equipo:[{_id: equipo_id}]})

    let userAsignados = []

    for (let i = 0; i < user_eq.length; i++) {
        userAsignados.push({usuario: user_eq[i]})
    }
    
    let asignaciones = ''

    if(rol_id == '5fbd44f1967a920270313e3e'){ // id rol Administrador
        asignaciones = await Asignacion.find().sort({_id: 'asc'}).populate('usuario').lean()
    }else{
        asignaciones = await Asignacion.find({$or:userAsignados}).sort({_id: 'asc'}).populate('usuario').lean()
    }
    
    const listAsignaciones = asignaciones.map(cont => {
        
        return {_id: cont._id, nombre: cont.usuario[0].nombre, apellido: cont.usuario[0].apellido,
            nro_incidencia: cont.nro_incidencia, cliente: cont.cliente, estado_inc: cont.estado_inc,
            segmento: cont.segmento, plazo: cont.plazo
        }
    })

    res.render('asignacion/mostrar-asignaciones', {
        asignaciones: listAsignaciones,
        activeAsignacion: true,
        ruta: 'asignacion',
        nameModule: 'Asignaciones',
        title: 'Asignación de averias',
        btnNameActive: true,
        btnName: 'Nueva Asignación'
    })

}

asignacionCtrl.apiAsignacionById = async (req, res) => {

    const asignacion = await Asignacion.findById(req.params.id).populate('usuario').lean()
    asignacion.usuario = await `${asignacion.usuario[0].nombre} ${asignacion.usuario[0].apellido}`
    asignacion.fecha = await dayjs(asignacion.fecha).format('DD/MM/YYYY HH:mm:ss')

    res.json(asignacion)
}

asignacionCtrl.renderEditForm = async (req, res) => {

    const horario = await Horario.findById(req.params.id).populate('usuario').lean()

    const usuario = await horario.usuario[0]
    const semanal = await horario.semanal[0]
    const refrigerio = await semanal.refrigerio[0]
    const finSemana = await horario.finSemana[0]
    const refriFinSemana = await finSemana.refrigerio[0]
    
    res.render('horario/editar-horario', {
        horario, usuario, semanal, refrigerio, finSemana, refriFinSemana,
        activeHorario: true,
        rutaActive: true,
        ruta: 'horario',
        nameModule: 'Horario',
        action: 'Editar Horario'
    })

}

asignacionCtrl.updateAsignacion = async (req, res) => {

    const id = req.params.id

    const {mes, ingreso, salida, inicioRefrigerio, finRefrigerio, diafinSemana, ingresoFinSem, salidaFinSem, inicioSemRefrigerio, finSemRefrigerio, descanso} = req.body
    
    const newSemanal = {ingreso, salida, refrigerio: [{inicio: inicioRefrigerio, fin: finRefrigerio}]}
    const newFinSemana = {dia: diafinSemana, ingreso: ingresoFinSem, salida: salidaFinSem, refrigerio: [{inicio: inicioSemRefrigerio, fin: finSemRefrigerio}]}
    const newHorario = {mes, semanal: newSemanal, finSemana: newFinSemana, descanso}
    
    await Horario.findByIdAndUpdate(id, newHorario)
    
    req.flash('success_msg', 'Horario actualizado!')
    res.redirect('/horario')

}

asignacionCtrl.deleteAsignacion = async (req, res) => {

    await Horario.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Horario eliminado!')
    res.redirect('/horario')

}

module.exports = asignacionCtrl