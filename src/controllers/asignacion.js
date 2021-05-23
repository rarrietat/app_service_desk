const asignacionCtrl = {}
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
    
    const asignaciones = await Asignacion.find().sort({_id: 'asc'}).populate('usuario').lean()

    
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


    res.render('asignacion/seguimiento', {
        asignacion, hito1, hito2, hito3, hito4, hito5, objetivo,
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

asignacionCtrl.apiHito3ById = async (req, res) => {

    const hito3 = await Hito3.findById(req.params.id).lean()
    res.json(hito3)

}

asignacionCtrl.apiHito4ById = async (req, res) => {

    const hito4 = await Hito4.findById(req.params.id).lean()
    res.json(hito4)

}

asignacionCtrl.updateAsignacionHito1 = async (req, res) => {
    
    const {idHito1, idSegHito1, registro_tiempo, asesor, diag_correcto, hito1_descripcion, despacho_correcto, grupo_asignado, usuario_asignado} = req.body
    const hito1 = {registro_tiempo, asesor, diag_correcto, hito1_descripcion, despacho_correcto, grupo_asignado, usuario_asignado}

    if(idHito1 != ''){

        await Hito1.findByIdAndUpdate(idHito1, hito1)

    }else{
        
        const asignacion = await Asignacion.findById(idSegHito1).lean()
        const fechaVencimiento = dayjs(asignacion.fecha).add(45,'minute')
        if(dayjs().format() <= dayjs(fechaVencimiento).format()) hito1.cumplimiento = 'si'
        else hito1.cumplimiento = 'no'

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

    let hito2 = ''
    let {idHito2, idSegHito2, asignar_personal_hito2, grupo_asignado_hito2, tecnico_hito2, informar_motivo_hito2, fecha_atencion_hito2, hora_atencion_hito2, sin_fecha_hito2, fecha_atencion2_hito2, hora_atencion2_hito2, logro_resultado_hito2, grupo_asignado2_hito2, tecnico2_hito2, tableEscalGrupo, tableEscalContacto, tableEscalResultado} = req.body
    let fechaParts = ''
    let fecha_atencion = ''

    if(asignar_personal_hito2 === 'Si'){
        hito2 = {asignar_personal: asignar_personal_hito2, grupo_asignado: grupo_asignado_hito2, tecnico_asignado: tecnico_hito2}
    }else{

        if(informar_motivo_hito2 === '1'){
            if(sin_fecha_hito2 == 'on'){
                hito2 = {asignar_personal: asignar_personal_hito2, informar_motivo: informar_motivo_hito2, status_chb: 'on', grupo_asignado: grupo_asignado2_hito2, tecnico_asignado: tecnico2_hito2}
            }else{
                fechaParts = fecha_atencion_hito2.split('/')
                fecha_atencion = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_atencion_hito2}`).format()
                hito2 = {asignar_personal: asignar_personal_hito2, informar_motivo: informar_motivo_hito2, status_chb: 'off', fecha_atencion, grupo_asignado: grupo_asignado2_hito2, tecnico_asignado: tecnico2_hito2}
            }
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

        const asignacion = await Asignacion.findById(idSegHito2).lean()
        const fechaVencimiento = dayjs(asignacion.fecha).add(90,'minute')
        if(dayjs().format() <= dayjs(fechaVencimiento).format()) hito2.cumplimiento = 'si'
        else hito2.cumplimiento = 'no'

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

asignacionCtrl.updateAsignacionHito3 = async (req, res) => {

    let hito3 = ''
    let {idHito3, idSegHito3, req_desplaz_hito3, horario_acordado_hito3, tecnico_hito3, tecnico2_hito3, fecha_llegada_hito3, hora_llegada_hito3, tecnico_responde_hito3, fecha_llegada2_hito3, hora_llegada2_hito3, horario_indicado_hito3, logro_resultado_hito3, tableEscalGrupoHito3, tableEscalContactoHito3, tableEscalResultadoHito3} = req.body
    let fechaParts = ''
    let fecha_llegada = ''

    if(req_desplaz_hito3 === 'Si'){

        if(horario_acordado_hito3 === 'Si'){

            fechaParts = fecha_llegada_hito3.split('/')
            fecha_llegada = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_llegada_hito3}`).format()
            hito3 = {desplazamiento: req_desplaz_hito3, horario_acordado: horario_acordado_hito3, tecnico_asignado: tecnico_hito3, fecha_llegada}

        }else{

            if(tecnico_responde_hito3 === 'Si' && horario_indicado_hito3 === 'Si'){

                fechaParts = fecha_llegada2_hito3.split('/')
                fecha_llegada = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_llegada2_hito3}`).format()
                hito3 = {desplazamiento: req_desplaz_hito3, horario_acordado: horario_acordado_hito3, tecnico_responde: tecnico_responde_hito3, horario_indicado: horario_indicado_hito3, fecha_llegada}

            }

            if(tecnico_responde_hito3 === 'Si' && horario_indicado_hito3 === 'No' && logro_resultado_hito3 === 'No'){

                fechaParts = fecha_llegada2_hito3.split('/')
                fecha_llegada = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_llegada2_hito3}`).format()
                hito3 = {desplazamiento: req_desplaz_hito3, horario_acordado: horario_acordado_hito3, tecnico_responde: tecnico_responde_hito3, horario_indicado: horario_indicado_hito3, fecha_llegada, logro_resultado: logro_resultado_hito3, lista_escalamiento_grupo: tableEscalGrupoHito3, lista_escalamiento_contacto: tableEscalContactoHito3, lista_escalamiento_resultado: tableEscalResultadoHito3}

            }

            if(tecnico_responde_hito3 === 'Si' && horario_indicado_hito3 === 'No' && logro_resultado_hito3 === 'Si'){

                fechaParts = fecha_llegada2_hito3.split('/')
                fecha_llegada = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_llegada2_hito3}`).format()
                hito3 = {desplazamiento: req_desplaz_hito3, horario_acordado: horario_acordado_hito3, tecnico_responde: tecnico_responde_hito3, horario_indicado: horario_indicado_hito3, fecha_llegada, logro_resultado: logro_resultado_hito3, lista_escalamiento_grupo: tableEscalGrupoHito3, lista_escalamiento_contacto: tableEscalContactoHito3, lista_escalamiento_resultado: tableEscalResultadoHito3, tecnico_asignado: tecnico2_hito3}

            }

            if(tecnico_responde_hito3 === 'No'  && logro_resultado_hito3 === 'Si'){
                
                hito3 = {desplazamiento: req_desplaz_hito3, horario_acordado: horario_acordado_hito3, tecnico_responde: tecnico_responde_hito3, logro_resultado: logro_resultado_hito3, lista_escalamiento_grupo: tableEscalGrupoHito3, lista_escalamiento_contacto: tableEscalContactoHito3, lista_escalamiento_resultado: tableEscalResultadoHito3, tecnico_asignado: tecnico2_hito3}

            }

            if(tecnico_responde_hito3 === 'No'  && logro_resultado_hito3 === 'No'){
                
                hito3 = {desplazamiento: req_desplaz_hito3, horario_acordado: horario_acordado_hito3, tecnico_responde: tecnico_responde_hito3, logro_resultado: logro_resultado_hito3, lista_escalamiento_grupo: tableEscalGrupoHito3, lista_escalamiento_contacto: tableEscalContactoHito3, lista_escalamiento_resultado: tableEscalResultadoHito3}

            }

        }

        
    }else{

        hito3 = {desplazamiento: req_desplaz_hito3}

    }

    if(idHito3 != ''){

        await Hito3.findByIdAndUpdate(idHito3, hito3)

    }else{

        const asignacion = await Asignacion.findById(idSegHito3).lean()
        let fechaVencimiento = ''

        if(asignacion.segmento === 'NEGOCIOS'){

            if(asignacion.plazo === 'URBANO') fechaVencimiento = dayjs(asignacion.fecha).add(270,'minute')
            if(asignacion.plazo === 'INTERURBANO') fechaVencimiento = dayjs(asignacion.fecha).add(510,'minute')
            if(asignacion.plazo === 'RURAL') fechaVencimiento = dayjs(asignacion.fecha).add(1350,'minute')
            
        }else if(asignacion.segmento === 'EMPRESAS'){
            
            if(asignacion.plazo === 'URBANO') fechaVencimiento = dayjs(asignacion.fecha).add(150,'minute')
            if(asignacion.plazo === 'INTERURBANO') fechaVencimiento = dayjs(asignacion.fecha).add(390,'minute')
            if(asignacion.plazo === 'RURAL') fechaVencimiento = dayjs(asignacion.fecha).add(1350,'minute')
    
        }

        if(dayjs().format() <= dayjs(fechaVencimiento).format()) hito3.cumplimiento = 'si'
        else hito3.cumplimiento = 'no'

        const newHito3 = new Hito3(hito3)
        await newHito3.save()

        const hito3Creado = await Hito3.find().sort({ $natural: -1 }).limit(1)
        const hito3_id = await hito3Creado.map(e => {
            return e.id
        })
        
        await Asignacion.findByIdAndUpdate(idSegHito3, {hito3: hito3_id})
    }
    
    req.flash('success_msg', 'Hito3 registrado!')
    res.json('ok')

}

asignacionCtrl.updateAsignacionHito4 = async (req, res) => {

    let hito4 = ''
    let {idHito4, idSegHito4, solucion_hito4, tipo_solucion_hito4, correccion_hito4, valida_hito4, motivo_hito4, logro_resultado_hito4, tableEscalGrupoHito4, tableEscalContactoHito4, tableEscalResultadoHito4, fecha_prueba_hito4, hora_prueba_hito4, tipo_solucion2_hito4, correccion2_hito4} = req.body
    let fechaParts = ''
    let fecha_prueba = ''
    
    if(solucion_hito4 === 'Si'){

        if(valida_hito4 === 'Si'){

            hito4 = {solucion: solucion_hito4, tipo_solucion: tipo_solucion_hito4, correccion: correccion_hito4, valida: valida_hito4}

        }else{

            if(motivo_hito4 === '1' && logro_resultado_hito4 === 'No'){

                hito4 = {solucion: solucion_hito4, tipo_solucion: tipo_solucion_hito4, correccion: correccion_hito4, valida: valida_hito4, motivo: motivo_hito4, logro_resultado: logro_resultado_hito4 ,lista_escalamiento_grupo: tableEscalGrupoHito4, lista_escalamiento_contacto: tableEscalContactoHito4, lista_escalamiento_resultado: tableEscalResultadoHito4}

            }

            if(motivo_hito4 === '1' && logro_resultado_hito4 === 'Si'){

                hito4 = {solucion: solucion_hito4, tipo_solucion: tipo_solucion_hito4, correccion: correccion_hito4, valida: valida_hito4, motivo: motivo_hito4, logro_resultado: logro_resultado_hito4, lista_escalamiento_grupo: tableEscalGrupoHito4, lista_escalamiento_contacto: tableEscalContactoHito4, lista_escalamiento_resultado: tableEscalResultadoHito4, tipo_solucion2: tipo_solucion2_hito4, correccion2: correccion2_hito4}

            }

            if(motivo_hito4 === '2'){

                fechaParts = fecha_prueba_hito4.split('/')
                fecha_prueba = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_prueba_hito4}`).format()
                hito4 = {solucion: solucion_hito4, tipo_solucion: tipo_solucion_hito4, correccion: correccion_hito4, valida: valida_hito4, motivo: motivo_hito4, fecha_prueba}

            }

        }

        
    }else{

        if(motivo_hito4 === '1' && logro_resultado_hito4 === 'No'){

            hito4 = {solucion: solucion_hito4, motivo: motivo_hito4, logro_resultado: logro_resultado_hito4, lista_escalamiento_grupo: tableEscalGrupoHito4, lista_escalamiento_contacto: tableEscalContactoHito4, lista_escalamiento_resultado: tableEscalResultadoHito4}

        }

        if(motivo_hito4 === '1' && logro_resultado_hito4 === 'Si'){

            hito4 = {solucion: solucion_hito4, motivo: motivo_hito4, logro_resultado: logro_resultado_hito4, lista_escalamiento_grupo: tableEscalGrupoHito4, lista_escalamiento_contacto: tableEscalContactoHito4, lista_escalamiento_resultado: tableEscalResultadoHito4, tipo_solucion2: tipo_solucion2_hito4, correccion2: correccion2_hito4}

        }

        if(motivo_hito4 === '2'){

            fechaParts = fecha_prueba_hito4.split('/')
            fecha_prueba = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_prueba_hito4}`).format()
            hito4 = {solucion: solucion_hito4, motivo: motivo_hito4, fecha_prueba}

        }

    }

    if(idHito4 != ''){

        await Hito4.findByIdAndUpdate(idHito4, hito4)

    }else{

        const asignacion = await Asignacion.findById(idSegHito4).lean()
        let fechaVencimiento = ''

        if(asignacion.segmento === 'NEGOCIOS'){

            if(asignacion.plazo === 'URBANO') fechaVencimiento = dayjs(asignacion.fecha).add(360,'minute')
            if(asignacion.plazo === 'INTERURBANO') fechaVencimiento = dayjs(asignacion.fecha).add(600,'minute')
            if(asignacion.plazo === 'RURAL') fechaVencimiento = dayjs(asignacion.fecha).add(1440,'minute')
            
        }else if(asignacion.segmento === 'EMPRESAS'){
            
            if(asignacion.plazo === 'URBANO') fechaVencimiento = dayjs(asignacion.fecha).add(240,'minute')
            if(asignacion.plazo === 'INTERURBANO') fechaVencimiento = dayjs(asignacion.fecha).add(480,'minute')
            if(asignacion.plazo === 'RURAL') fechaVencimiento = dayjs(asignacion.fecha).add(1440,'minute')
    
        }

        if(dayjs().format() <= dayjs(fechaVencimiento).format()) hito4.cumplimiento = 'si'
        else hito4.cumplimiento = 'no'

        const newHito4 = new Hito4(hito4)
        await newHito4.save()

        const hito4Creado = await Hito4.find().sort({ $natural: -1 }).limit(1)
        const hito4_id = await hito4Creado.map(e => {
            return e.id
        })
        
        await Asignacion.findByIdAndUpdate(idSegHito4, {hito4: hito4_id})
    }
    
    req.flash('success_msg', 'Hito4 registrado!')
    res.json('ok')

}

asignacionCtrl.updateAsignacionHito5 = async (req, res) => {

    const {idHito5, idSegHito5, tipo_averia_hito5, fecha_cierre_hito5, hora_cierre_hito5} = req.body

    const fechaParts = fecha_cierre_hito5.split('/')
    const fecha_cierre = dayjs(`${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]} ${hora_cierre_hito5}`).format()

    const hito5 = {tipo_averia: tipo_averia_hito5, fecha_cierre}

    if(idHito5 != ''){

        await Hito5.findByIdAndUpdate(idHito5, hito5)

    }else{

        const asignacion = await Asignacion.findById(idSegHito5).lean()
        let fechaVencimiento = ''

        if(asignacion.segmento === 'NEGOCIOS'){

            if(asignacion.plazo === 'URBANO'){
                if(tipo_averia_hito5 === '1') fechaVencimiento = dayjs(asignacion.fecha).add(420,'minute')
                else fechaVencimiento = dayjs(asignacion.fecha).add(480,'minute')
            }
            if(asignacion.plazo === 'INTERURBANO'){
                if(tipo_averia_hito5 === '1') fechaVencimiento = dayjs(asignacion.fecha).add(660,'minute')
                else fechaVencimiento = dayjs(asignacion.fecha).add(720,'minute')
            }
            if(asignacion.plazo === 'RURAL'){
                if(tipo_averia_hito5 === '1') fechaVencimiento = dayjs(asignacion.fecha).add(1500,'minute')
                else fechaVencimiento = dayjs(asignacion.fecha).add(1560,'minute')
            }
            
        }else if(asignacion.segmento === 'EMPRESAS'){
            
            if(asignacion.plazo === 'URBANO'){
                if(tipo_averia_hito5 === '1') fechaVencimiento = dayjs(asignacion.fecha).add(300,'minute')
                else fechaVencimiento = dayjs(asignacion.fecha).add(360,'minute')
                console.log(dayjs(fechaVencimiento).format('DD/MM/YYYY hh:mm'))
            }
            if(asignacion.plazo === 'INTERURBANO'){
                if(tipo_averia_hito5 === '1') fechaVencimiento = dayjs(asignacion.fecha).add(540,'minute')
                else fechaVencimiento = dayjs(asignacion.fecha).add(600,'minute')
                console.log('aqui no')
            }
            if(asignacion.plazo === 'RURAL'){
                if(tipo_averia_hito5 === '1') fechaVencimiento = dayjs(asignacion.fecha).add(1500,'minute')
                else fechaVencimiento = dayjs(asignacion.fecha).add(1560,'minute')
            }
    
        }

        if(dayjs().format() <= dayjs(fechaVencimiento).format()) hito5.cumplimiento = 'si'
        else hito5.cumplimiento = 'no'

        const newHito5 = new Hito5(hito5)
        await newHito5.save()

        const Hito5creado = await Hito5.find().sort({ $natural: -1 }).limit(1)
        const Hito5_id = await Hito5creado.map(e => {
            return e.id
        })
        
        await Asignacion.findByIdAndUpdate(idSegHito5, {hito5: Hito5_id})
    }
    
    req.flash('success_msg', 'Cierre registrado!')
    res.json('ok')

}

asignacionCtrl.deleteAsignacion = async (req, res) => {

    await Horario.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Horario eliminado!')
    res.redirect('/asignacion')

}

module.exports = asignacionCtrl