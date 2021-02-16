const equipoAsignadoCtrl = {}
const EquipoAsignado = require('../models/EquipoAsignado')

equipoAsignadoCtrl.renderEquipoAsignadoForm = (req, res) => {
    res.render('equipo_asignado/agregar-equipo_asignado', {
        activeMantenimiento: true,
        activeEquipoAsignado: true,
        rutaActive: true,
        ruta: 'equipo_asignado',
        nameModule: 'Equipos Asignados',
        action: 'Nuevo Equipo Asignado'})
}

equipoAsignadoCtrl.createNewEquipoAsignado = async (req, res) => {

    const newEquipoAsignado = new EquipoAsignado(req.body)
    await newEquipoAsignado.save()

    req.flash('success_msg', '¡Equipo Asignado registrado!')
    res.redirect('/equipo_asignado')
}

equipoAsignadoCtrl.allEquiposAsignados = async (req, res) => {

    const equipoAsignado = await EquipoAsignado.find().sort({_id: 'asc'}).lean()

    res.render('equipo_asignado/mostrar-equipos_asignados', {
        equipoAsignado,
        activeMantenimiento: true,
        activeEquipoAsignado: true,
        ruta: 'equipo_asignado',
        nameModule: 'Equipos Asignados',
        title: 'Todos los equipos asignados',
        btnNameActive: true,
        btnName: 'Nuevo Equipo Asignado'})
}

equipoAsignadoCtrl.apiEquiposAsignados = async (req, res) => {

    const equiposAsignados = await EquipoAsignado.find().sort({_id: 'asc'}).lean()
    res.json(equiposAsignados)
}

equipoAsignadoCtrl.renderEditForm = async (req, res) => {
    
    const equipoAsignado = await EquipoAsignado.findById(req.params.id).lean()

    res.render('equipo_asignado/editar-equipo_asignado', {
        equipoAsignado,
        activeMantenimiento: true,
        activeEquipoAsignado: true,
        rutaActive: true,
        ruta: 'equipo_asignado',
        nameModule: 'Equipo Asignado',
        action: 'Editar Equipo Asignado'})
}

equipoAsignadoCtrl.updateEquipoAsignado = async (req, res) => {
    
    await EquipoAsignado.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success_msg', '¡Equipo Asignado actualizado!')
    res.redirect('/equipo_asignado')
}

equipoAsignadoCtrl.deleteEquipoAsignado = async (req, res) => {
    
    await EquipoAsignado.findByIdAndDelete(req.params.id)

    req.flash('success_msg', '¡Equipo Asignado eliminado!')
    res.redirect('/equipo_asignado')
}

module.exports = equipoAsignadoCtrl