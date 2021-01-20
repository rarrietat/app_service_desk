const equipoCtrl = {}
const Equipo = require('../models/Equipo')

equipoCtrl.renderEquipoForm = (req, res) => {
    res.render('equipo/agregar-equipo', {
        activeMantenimiento: true,
        activeEquipo: true,
        rutaActive: true,
        ruta: 'equipo',
        nameModule: 'Equipos',
        action: 'Nuevo Equipo'})
}

equipoCtrl.createNewEquipo = async (req, res) => {

    const newEquipo = new Equipo(req.body)
    await newEquipo.save()

    req.flash('success_msg', '¡Equipo registrado!')
    res.redirect('/equipo')
}

equipoCtrl.allEquipos = async (req, res) => {

    const equipos = await Equipo.find().sort({_id: 'asc'}).lean()

    res.render('equipo/mostrar-equipos', {
        equipos,
        activeMantenimiento: true,
        activeEquipo: true,
        ruta: 'equipo',
        nameModule: 'Equipos',
        title: 'Todos los equipos',
        btnNameActive: true,
        btnName: 'Nuevo Equipo'})
}

equipoCtrl.apiEquipos = async (req, res) => {

    const equipos = await Equipo.find().sort({_id: 'asc'}).lean()
    res.json(equipos)
}

equipoCtrl.renderEditForm = async (req, res) => {

    const equipo = await Equipo.findById(req.params.id).lean()

    res.render('equipo/editar-equipo', {
        equipo,
        activeMantenimiento: true,
        activeEquipo: true,
        rutaActive: true,
        ruta: 'equipo',
        nameModule: 'Equipo',
        action: 'Editar Equipo'})
        
}

equipoCtrl.updateEquipo = async (req, res) => {

    const id = req.params.id
    await Equipo.findByIdAndUpdate(id, req.body)

    req.flash('success_msg', '¡Equipo actualizado!')
    res.redirect('/equipo')
}

equipoCtrl.deleteEquipo = async (req, res) => {

    await Equipo.findByIdAndDelete(req.params.id)

    req.flash('success_msg', '¡Equipo eliminado!')
    res.redirect('/equipo')
}

module.exports = equipoCtrl