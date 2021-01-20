const horarioCtrl = {}
const Horario = require('../models/Horario')

horarioCtrl.renderHorarioForm = (req, res) => {

    res.render('horario/agregar-horario', {
        activeHorario: true,
        rutaActive: true,
        ruta: 'horario',
        nameModule: 'Horarios',
        action: 'Nuevo Horario'
    })

}

horarioCtrl.createNewHorario = async (req, res) => {

    const {usuario, mes, ingreso, salida, inicioRefrigerio, finRefrigerio, diafinSemana, ingresoFinSem, salidaFinSem, inicioSemRefrigerio, finSemRefrigerio, descanso} = req.body
    
    const newSemanal = {ingreso, salida, refrigerio: [{inicio: inicioRefrigerio, fin: finRefrigerio}]}
    const newFinSemana = {dia: diafinSemana, ingreso: ingresoFinSem, salida: salidaFinSem, refrigerio: [{inicio: inicioSemRefrigerio, fin: finSemRefrigerio}]}
    const newHorario = new Horario({usuario, mes, semanal: newSemanal, finSemana: newFinSemana, descanso})
    await newHorario.save()
    
    req.flash('success_msg', 'Horario registrado!')
    res.redirect('/horario')

}

horarioCtrl.allHorarios = async (req, res) => {

    const horarios = await Horario.find().sort({_id: 'desc'}).populate('usuario').lean()

    const listHorarios = horarios.map(cont => {
        
        return {_id: cont._id, nombre: cont.usuario[0].nombre, apellido: cont.usuario[0].apellido,
            ingreso: cont.semanal[0].ingreso, salida: cont.semanal[0].salida,
            refInicio: cont.semanal[0].refrigerio.map(semRefri => semRefri.inicio),
            refFin: cont.semanal[0].refrigerio.map(semRefri => semRefri.fin),
            ingresoFinSemana: cont.finSemana[0].ingreso, salidaFinSemana: cont.finSemana[0].salida,
            refIniFinSemana: cont.finSemana[0].refrigerio.map(semRefri => semRefri.inicio),
            refFinFinSemana: cont.finSemana[0].refrigerio.map(semRefri => semRefri.fin),
            descanso: cont.descanso
        }
    })

    res.render('horario/mostrar-horarios', {
        horarios: listHorarios,
        activeHorario: true,
        ruta: 'horario',
        nameModule: 'Horarios',
        title: 'Todos los horarios',
        btnNameActive: true,
        btnName: 'Nuevo Horario'
    })

}

horarioCtrl.renderEditForm = async (req, res) => {

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

horarioCtrl.updateHorario = async (req, res) => {

    const id = req.params.id

    const {mes, ingreso, salida, inicioRefrigerio, finRefrigerio, diafinSemana, ingresoFinSem, salidaFinSem, inicioSemRefrigerio, finSemRefrigerio, descanso} = req.body
    
    const newSemanal = {ingreso, salida, refrigerio: [{inicio: inicioRefrigerio, fin: finRefrigerio}]}
    const newFinSemana = {dia: diafinSemana, ingreso: ingresoFinSem, salida: salidaFinSem, refrigerio: [{inicio: inicioSemRefrigerio, fin: finSemRefrigerio}]}
    const newHorario = {mes, semanal: newSemanal, finSemana: newFinSemana, descanso}
    
    await Horario.findByIdAndUpdate(id, newHorario)
    
    req.flash('success_msg', 'Horario actualizado!')
    res.redirect('/horario')

}

horarioCtrl.deleteHorario = async (req, res) => {

    await Horario.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Horario eliminado!')
    res.redirect('/horario')

}

module.exports = horarioCtrl