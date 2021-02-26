const asignacionCtrl = {}
const path = require('path')
const XLSX = require('xlsx')
const Asignacion = require('../models/Asignacion')
const Hito1 = require('../models/Hito1')
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

asignacionCtrl.renderSeguimientoForm = async (req, res) => {

    const asignacion = await Asignacion.findById(req.params.id).populate('usuario').lean()
    asignacion.asesor = `${asignacion.usuario[0].nombre} ${asignacion.usuario[0].apellido}`
    
    const hito1 = await Hito1.findById(asignacion.hito1).lean()

    res.render('asignacion/seguimiento', {
        asignacion, hito1,
        activeAsignacion: true,
        rutaActive: true,
        ruta: 'asignacion',
        nameModule: 'Asignación',
        action: 'Seguimiento'
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

asignacionCtrl.updateAsignacionHito1 = async (req, res) => {
    
    const {idHito1, idSegHito1, registro_tiempo, asesor, diag_correcto, hito1_descripcion, despacho_correcto, grupo_asignado, usuario_asignado} = req.body

    const hito1 = {registro_tiempo, asesor, diag_correcto, hito1_descripcion, despacho_correcto, grupo_asignado, usuario_asignado}
    
    if(idHito1 != ''){

        await Hito1.findByIdAndUpdate(idHito1, hito1)

    }else{

        const newHito1 = new Hito1(hito1)
        await newHito1.save()

        const Hito1creado = await Hito1.find().sort({ $natural: -1 }).limit(1)
        const Hito1_id = await Hito1creado.map(e => {
            return e.id
        })
        
        await Asignacion.findByIdAndUpdate(idSegHito1, {hito1: Hito1_id})
    }
    
    req.flash('success_msg', 'Hito1 registrado!')
    res.json('ok')

}

asignacionCtrl.updateAsignacionHito2 = async (req, res) => {

    console.log(req.body)
    
    // const {idHito1, idSegHito1, registro_tiempo, asesor, diag_correcto, hito1_descripcion, despacho_correcto, grupo_asignado, usuario_asignado} = req.body

    // const hito1 = {registro_tiempo, asesor, diag_correcto, hito1_descripcion, despacho_correcto, grupo_asignado, usuario_asignado}
    
    // if(idHito1 != ''){

    //     await Hito1.findByIdAndUpdate(idHito1, hito1)

    // }else{

    //     const newHito1 = new Hito1(hito1)
    //     await newHito1.save()

    //     const Hito1creado = await Hito1.find().sort({ $natural: -1 }).limit(1)
    //     const Hito1_id = await Hito1creado.map(e => {
    //         return e.id
    //     })
        
    //     await Asignacion.findByIdAndUpdate(idSegHito1, {hito1: Hito1_id})
    // }
    
    // req.flash('success_msg', 'Hito1 registrado!')
    // res.json('ok')

}

asignacionCtrl.deleteAsignacion = async (req, res) => {

    await Horario.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Horario eliminado!')
    res.redirect('/asignacion')

}

module.exports = asignacionCtrl