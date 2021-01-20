const rolCtrl = {}
const Rol = require('../models/Rol')

rolCtrl.renderRolForm = (req, res) => {
    res.render('rol/agregar-rol', {
        activeMantenimiento: true,
        activeRol: true,
        rutaActive: true,
        ruta: 'rol',
        nameModule: 'Roles',
        action: 'Nuevo Rol'})
}

rolCtrl.createNewRol = async (req, res) => {

    const newRol = new Rol(req.body)
    await newRol.save()

    req.flash('success_msg', '¡Rol registrado!')
    res.redirect('/rol')
}

rolCtrl.allRoles = async (req, res) => {

    const roles = await Rol.find().sort({_id: 'desc'}).lean()

    res.render('rol/mostrar-roles', {
        roles,
        activeMantenimiento: true,
        activeRol: true,
        ruta: 'rol',
        nameModule: 'Roles',
        title: 'Todos los roles',
        btnNameActive: true,
        btnName: 'Nuevo Rol'})
}

rolCtrl.apiRoles = async (req, res) => {

    const roles = await Rol.find().sort({rol: 'asc'}).lean()
    res.json(roles)
}

rolCtrl.renderEditForm = async (req, res) => {
    
    const rol = await Rol.findById(req.params.id).lean()

    res.render('rol/editar-rol', {
        rol,
        activeMantenimiento: true,
        activeRol: true,
        rutaActive: true,
        ruta: 'rol',
        nameModule: 'Rol',
        action: 'Editar Rol'})
}

rolCtrl.updateRol = async (req, res) => {
    
    await Rol.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success_msg', '¡Rol actualizado!')
    res.redirect('/rol')
}

rolCtrl.deleteRol = async (req, res) => {
    
    await Rol.findByIdAndDelete(req.params.id)

    req.flash('success_msg', '¡Rol eliminado!')
    res.redirect('/rol')
}

module.exports = rolCtrl