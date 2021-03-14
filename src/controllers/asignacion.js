const asignacionCtrl = {}
const path = require('path')
const XLSX = require('xlsx')
const Asignacion = require('../models/Asignacion')
const Hito1 = require('../models/Hito1')
const Hito2 = require('../models/Hito2')
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
    let hito2 = await Hito2.findById(asignacion.hito2).lean()

    console.log(asignacion.hito2)

    if(asignacion.hito2 != ''){
        if(hito2.fecha_atencion != undefined){
            hito2.fecha = dayjs(hito2.fecha_atencion).format('DD/MM/YYYY')
            hito2.hora = dayjs(hito2.fecha_atencion).format('HH:mm')
        }
    }

    res.render('asignacion/seguimiento', {
        asignacion, hito1, hito2,
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

asignacionCtrl.apiHito2ById = async (req, res) => {

    const hito2 = await Hito2.findById(req.params.id).lean()
    res.json(hito2)

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

    let hito2 = ''
    let {idHito2, idSegHito2, asignar_personal_hito2, grupo_asignado_hito2, tecnico_hito2, informar_motivo_hito2, fecha_atencion_hito2, hora_atencion_hito2, fecha_atencion2_hito2, hora_atencion2_hito2, informar_escalamiento_hito2, persona_contacto_hito2, logro_resultado_hito2, grupo_asignado2_hito2, tecnico2_hito2, tableEscalGrupo, tableEscalContacto, tableEscalResultado} = req.body
    let fechaParts = ''
    let fecha_atencion = ''
    if(asignar_personal_hito2 === 'Si'){
        hito2 = {asignar_personal: asignar_personal_hito2, grupo_asignado: grupo_asignado_hito2, tecnico_asignado: tecnico_hito2}
    }else{

        if(informar_motivo_hito2 === '1'){
            fechaParts = fecha_atencion_hito2.split('/')
            fecha_atencion = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_atencion_hito2}`).format()
            hito2 = {asignar_personal: asignar_personal_hito2, informar_motivo: informar_motivo_hito2, fecha_atencion, grupo_asignado: grupo_asignado2_hito2, tecnico_asignado: tecnico2_hito2}
        }else{
            if(logro_resultado_hito2 === 'Si'){
                if(fecha_atencion2_hito2 != undefined){
                    fechaParts = fecha_atencion2_hito2.split('/')
                    fecha_atencion = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_atencion2_hito2}`).format()
                    hito2 = {asignar_personal: asignar_personal_hito2, informar_motivo: informar_motivo_hito2, fecha_atencion, logro_resultado: logro_resultado_hito2, grupo_asignado: grupo_asignado2_hito2, tecnico_asignado: tecnico2_hito2, lista_escalamiento_grupo: tableEscalGrupo, lista_escalamiento_contacto: tableEscalContacto, lista_escalamiento_resultado: tableEscalResultado}
                }else{
                    hito2 = {asignar_personal: asignar_personal_hito2, informar_motivo: informar_motivo_hito2, logro_resultado: logro_resultado_hito2, grupo_asignado: grupo_asignado2_hito2, tecnico_asignado: tecnico2_hito2, lista_escalamiento_grupo: tableEscalGrupo, lista_escalamiento_contacto: tableEscalContacto, lista_escalamiento_resultado: tableEscalResultado}
                }
                
            }else{
                hito2 = {asignar_personal: asignar_personal_hito2, informar_motivo: informar_motivo_hito2, logro_resultado: logro_resultado_hito2, lista_escalamiento_grupo: tableEscalGrupo, lista_escalamiento_contacto: tableEscalContacto, lista_escalamiento_resultado: tableEscalResultado}
            }
        }

    }

    if(idHito2 != ''){

        await Hito2.findByIdAndUpdate(idHito2, hito2)

    }else{

        const newHito2 = new Hito2(hito2)
        await newHito2.save()

        const hito2Creado = await Hito2.find().sort({ $natural: -1 }).limit(1)
        const hito2_id = await hito2Creado.map(e => {
            return e.id
        })
        
        await Asignacion.findByIdAndUpdate(idSegHito2, {hito2: hito2_id})
    }
    
    req.flash('success_msg', 'Hito2 registrado!')
    res.json('ok')

}

asignacionCtrl.deleteAsignacion = async (req, res) => {

    await Horario.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Horario eliminado!')
    res.redirect('/asignacion')

}

module.exports = asignacionCtrl