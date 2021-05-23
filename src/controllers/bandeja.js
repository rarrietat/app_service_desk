const bandejaCtrl = {}
const path = require('path')
const XLSX = require('xlsx')
const Asignacion = require('../models/Asignacion')
const Hito1 = require('../models/Hito1')
const Hito2 = require('../models/Hito2')
const Hito3 = require('../models/Hito3')
const Hito4 = require('../models/Hito4')
const Hito5 = require('../models/Hito5')
const helperFile = require('../helpers/file')
const helperAveria = require('../helpers/averia')
const Usuario = require('../models/Usuario')

const dayjs = require('dayjs')
require('dayjs/locale/es')
dayjs.locale('es')

bandejaCtrl.allAsignaciones = async (req, res) => {

    const rol_id = req.user.rol[0]
    const equipo_id = req.user.equipo[0]
    const user_eq = await Usuario.find({equipo:[{_id: equipo_id}]})

    let userAsignados = []

    for (let i = 0; i < user_eq.length; i++) {
        userAsignados.push({usuario: user_eq[i]})
    }
    
    const asignaciones = await Asignacion.find({$or:userAsignados}).sort({_id: 'asc'}).populate('usuario').lean()
    
    const listAsignaciones = asignaciones.map(cont => {
        
        return {_id: cont._id, nombre: cont.usuario[0].nombre, apellido: cont.usuario[0].apellido,
            nro_incidencia: cont.nro_incidencia, cliente: cont.cliente, estado_inc: cont.estado_inc,
            segmento: cont.segmento, plazo: cont.plazo
        }
    })

    res.render('bandeja/mostrar-asignaciones', {
        asignaciones: listAsignaciones,
        activeBandeja: true,
        ruta: 'bandeja',
        nameModule: 'Bandeja',
        title: 'Bandeja de averias asignadas',
        btnNameActive: false
    })

}

bandejaCtrl.renderSeguimientoForm = async (req, res) => {

    const asignacion = await Asignacion.findById(req.params.id).populate('usuario').lean()
    asignacion.asesor = `${asignacion.usuario[0].nombre} ${asignacion.usuario[0].apellido}`
    
    const hito1 = await Hito1.findById(asignacion.hito1).lean()
    let hito2 = await Hito2.findById(asignacion.hito2).lean()
    let hito3 = await Hito3.findById(asignacion.hito3).lean()
    let hito4 = await Hito4.findById(asignacion.hito4).lean()
    let hito5 = await Hito5.findById(asignacion.hito5).lean()

    let objetivo = []

    if(asignacion.segmento === 'NEGOCIOS'){

        if(asignacion.plazo === 'URBANO' || asignacion.plazo === 'INTERURBANO' || asignacion.plazo === 'RURAL'){
            objetivo.fecha_hito1 = dayjs(asignacion.fecha).add(45,'minute')
            objetivo.fecha_hito2 = dayjs(asignacion.fecha).add(90,'minute')
        }

        if(asignacion.plazo === 'URBANO'){
            objetivo.fecha_hito3 = dayjs(asignacion.fecha).add(270,'minute')
            objetivo.fecha_hito4 = dayjs(asignacion.fecha).add(360,'minute')

            if(asignacion.hito5 != '' && hito5.tipo_averia === '1'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(420,'minute')
            }

            if(asignacion.hito5 != '' && hito5.tipo_averia === '2'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(480,'minute')
            }

        }

        if(asignacion.plazo === 'INTERURBANO'){
            objetivo.fecha_hito3 = dayjs(asignacion.fecha).add(510,'minute')
            objetivo.fecha_hito4 = dayjs(asignacion.fecha).add(600,'minute')

            if(asignacion.hito5 != '' && hito5.tipo_averia === '1'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(660,'minute')
            }

            if(asignacion.hito5 != '' && hito5.tipo_averia === '2'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(720,'minute')
            }
        }

        if(asignacion.plazo === 'RURAL'){
            objetivo.fecha_hito3 = dayjs(asignacion.fecha).add(1350,'minute')
            objetivo.fecha_hito4 = dayjs(asignacion.fecha).add(1440,'minute')

            if(asignacion.hito5 != '' && hito5.tipo_averia === '1'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(1500,'minute')
            }

            if(asignacion.hito5 != '' && hito5.tipo_averia === '2'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(1560,'minute')
            }
        }

    }else if(asignacion.segmento === 'EMPRESAS'){{

        if(asignacion.plazo === 'URBANO' || asignacion.plazo === 'INTERURBANO' || asignacion.plazo === 'RURAL'){
            objetivo.fecha_hito1 = dayjs(asignacion.fecha).add(45,'minute')
            objetivo.fecha_hito2 = dayjs(asignacion.fecha).add(90,'minute')
        }

        if(asignacion.plazo === 'URBANO'){
            objetivo.fecha_hito3 = dayjs(asignacion.fecha).add(150,'minute')

            if(asignacion.hito4 != '' && hito4.motivo == 2){
                const fechaCreacion = dayjs(hito4.createdAt)
                const fechaVencimiento =  dayjs(asignacion.fecha).add(240,'minute')
                const restaFecha = fechaVencimiento.diff(fechaCreacion, 'minute')
                if(restaFecha >= 0) objetivo.fecha_hito4 = dayjs(hito4.fecha_prueba).add(restaFecha,'minute')
                else objetivo.fecha_hito4 = dayjs(asignacion.fecha).add(240,'minute')
            }else{
                objetivo.fecha_hito4 = dayjs(asignacion.fecha).add(240,'minute')
            }

            if(asignacion.hito5 != '' && hito5.tipo_averia === '1'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(300,'minute')
            }

            if(asignacion.hito5 != '' && hito5.tipo_averia === '2'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(360,'minute')
            }

        }

        if(asignacion.plazo === 'INTERURBANO'){
            objetivo.fecha_hito3 = dayjs(asignacion.fecha).add(390,'minute')
            objetivo.fecha_hito4 = dayjs(asignacion.fecha).add(480,'minute')

            if(asignacion.hito5 != '' && hito5.tipo_averia === '1'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(540,'minute')
            }

            if(asignacion.hito5 != '' && hito5.tipo_averia === '2'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(600,'minute')
            }
        }

        if(asignacion.plazo === 'RURAL'){
            objetivo.fecha_hito3 = dayjs(asignacion.fecha).add(1350,'minute')
            objetivo.fecha_hito4 = dayjs(asignacion.fecha).add(1440,'minute')

            if(asignacion.hito5 != '' && hito5.tipo_averia === '1'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(1500,'minute')
            }

            if(asignacion.hito5 != '' && hito5.tipo_averia === '2'){
                objetivo.fecha_hito5 = dayjs(asignacion.fecha).add(1560,'minute')
            }
        }

    }}

    if(asignacion.hito1 != ''){
        if(dayjs(hito1.createdAt).format() <= dayjs(objetivo.fecha_hito1).format()){
            objetivo.progreso_hito1 = 'Dentro del cumplimiento'
            objetivo.cumplimiento_hito1 = 1
            objetivo.fecha_revision_hito1 = dayjs(hito1.createdAt).format('DD/MM/YYYY HH:mm')
        }else{
            objetivo.progreso_hito1 = 'Fuera del cumplimiento'
            objetivo.cumplimiento_hito1 = 2
            objetivo.fecha_revision_hito1 = dayjs(hito1.createdAt).format('DD/MM/YYYY HH:mm')
        }
    }else{
        objetivo.progreso_hito1 = 'Pendiente de revisión'
        objetivo.cumplimiento_hito1 = 3
    }

    if(asignacion.hito2 != ''){
        if(hito2.fecha_atencion != undefined){
            hito2.fecha = dayjs(hito2.fecha_atencion).format('DD/MM/YYYY')
            hito2.hora = dayjs(hito2.fecha_atencion).format('HH:mm')
        }

        if(dayjs(hito2.createdAt).format() <= dayjs(objetivo.fecha_hito2).format()){
            objetivo.progreso_hito2 = 'Dentro del cumplimiento'
            objetivo.cumplimiento_hito2 = 1
            objetivo.fecha_revision_hito2 = dayjs(hito2.createdAt).format('DD/MM/YYYY HH:mm')
        }else{
            objetivo.progreso_hito2 = 'Fuera del cumplimiento'
            objetivo.cumplimiento_hito2 = 2
            objetivo.fecha_revision_hito2 = dayjs(hito2.createdAt).format('DD/MM/YYYY HH:mm')
        }
    }else{
        objetivo.progreso_hito2 = 'Pendiente de revisión'
        objetivo.cumplimiento_hito2 = 3
    }

    if(asignacion.hito3 != ''){
        if(hito3.fecha_llegada != undefined){
            hito3.fecha = dayjs(hito3.fecha_llegada).format('DD/MM/YYYY')
            hito3.hora = dayjs(hito3.fecha_llegada).format('HH:mm')
        }

        if(dayjs(hito3.createdAt).format() <= dayjs(objetivo.fecha_hito3).format()){
            objetivo.progreso_hito3 = 'Dentro del cumplimiento'
            objetivo.cumplimiento_hito3 = 1
            objetivo.fecha_revision_hito3 = dayjs(hito3.createdAt).format('DD/MM/YYYY HH:mm')
        }else{
            objetivo.progreso_hito3 = 'Fuera del cumplimiento'
            objetivo.cumplimiento_hito3 = 2
            objetivo.fecha_revision_hito3 = dayjs(hito3.createdAt).format('DD/MM/YYYY HH:mm')
        }
    }else{
        objetivo.progreso_hito3 = 'Pendiente de revisión'
        objetivo.cumplimiento_hito3 = 3
    }

    if(asignacion.hito4 != ''){
        if(hito4.fecha_prueba != undefined){
            hito4.fecha = dayjs(hito4.fecha_prueba).format('DD/MM/YYYY')
            hito4.hora = dayjs(hito4.fecha_prueba).format('HH:mm')
        }

        if(dayjs(hito4.createdAt).format() <= dayjs(objetivo.fecha_hito4).format()){
            objetivo.progreso_hito4 = 'Dentro del cumplimiento'
            objetivo.cumplimiento_hito4 = 1
            objetivo.fecha_revision_hito4 = dayjs(hito4.createdAt).format('DD/MM/YYYY HH:mm')
        }else{
            objetivo.progreso_hito4 = 'Fuera del cumplimiento'
            objetivo.cumplimiento_hito4 = 2
            objetivo.fecha_revision_hito4 = dayjs(hito4.createdAt).format('DD/MM/YYYY HH:mm')
        }

    }else{
        objetivo.progreso_hito4 = 'Pendiente de revisión'
        objetivo.cumplimiento_hito4 = 3
    }

    if(asignacion.hito5 != ''){
        if(hito5.fecha_cierre != undefined){
            hito5.fecha = dayjs(hito5.fecha_cierre).format('DD/MM/YYYY')
            hito5.hora = dayjs(hito5.fecha_cierre).format('HH:mm')
        }

        if(hito5.tipo_averia === '1'){
            objetivo.tipo_averia = '(Normal)'
        }else{
            objetivo.tipo_averia = '(Reiterada)'
        }

        if(dayjs(hito5.createdAt).format() <= dayjs(objetivo.fecha_hito5).format()){
            objetivo.progreso_hito5 = 'Dentro del cumplimiento'
            objetivo.cumplimiento_hito5 = 1
            objetivo.fecha_revision_hito5 = dayjs(hito5.createdAt).format('DD/MM/YYYY HH:mm')
        }else{
            objetivo.progreso_hito5 = 'Fuera del cumplimiento'
            objetivo.cumplimiento_hito5 = 2
            objetivo.fecha_revision_hito5 = dayjs(hito5.createdAt).format('DD/MM/YYYY HH:mm')
        }

    }else{
        objetivo.progreso_hito5 = 'Pendiente de revisión'
        objetivo.cumplimiento_hito5 = 3
    }

    objetivo.fecha_hito1 = dayjs(objetivo.fecha_hito1).format('DD/MM/YYYY HH:mm')
    objetivo.fecha_hito2 = dayjs(objetivo.fecha_hito2).format('DD/MM/YYYY HH:mm')
    objetivo.fecha_hito3 = dayjs(objetivo.fecha_hito3).format('DD/MM/YYYY HH:mm')
    objetivo.fecha_hito4 = dayjs(objetivo.fecha_hito4).format('DD/MM/YYYY HH:mm')
    if(objetivo.fecha_hito5 != undefined) objetivo.fecha_hito5 = dayjs(objetivo.fecha_hito5).format('DD/MM/YYYY HH:mm')
    else objetivo.fecha_hito5 = 'Según tipo de averia'
    asignacion.fecha = dayjs(asignacion.fecha).format('DD/MM/YYYY HH:mm')


    res.render('bandeja/seguimiento', {
        asignacion, hito1, hito2, hito3, hito4, hito5, objetivo,
        activeBandeja: true,
        rutaActive: true,
        ruta: 'bandeja',
        nameModule: 'Bandeja',
        action: 'Seguimiento'
    })

}

module.exports = bandejaCtrl