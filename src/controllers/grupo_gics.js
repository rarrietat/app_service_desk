const grupoGicsCtrl = {}
const GrupoGics = require('../models/GrupoGics')

grupoGicsCtrl.renderGrupoGicsForm = (req, res) => {
    res.render('grupo_gics/agregar-grupo_gics', {
        activeMantenimiento: true,
        activeGrupoGics: true,
        rutaActive: true,
        ruta: 'grupo_gics',
        nameModule: 'Grupos Gics',
        action: 'Nuevo Grupo Gics'})
}

grupoGicsCtrl.createNewGrupoGics = async (req, res) => {

    const newGrupoGics = new GrupoGics(req.body)
    await newGrupoGics.save()

    req.flash('success_msg', '¡Grupo Gics registrado!')
    res.redirect('/grupo_gics')
}

grupoGicsCtrl.allGruposGics = async (req, res) => {

    const gruposGics = await GrupoGics.find().sort({_id: 'asc'}).populate('equipo_asignado').populate('zonal_asignado').lean()

    const listGrupoGics = gruposGics.map(cont => {
        return {_id: cont._id, grupo_gics: cont.grupo_gics, zonal_asignado: cont.zonal_asignado[0].zonal, equipo_asignado: cont.equipo_asignado[0].equipo, descripcion: cont.descripcion}
    })

    res.render('grupo_gics/mostrar-grupos_gics', {
        gruposGics: listGrupoGics,
        activeMantenimiento: true,
        activeGrupoGics: true,
        ruta: 'grupo_gics',
        nameModule: 'Grupos Gics',
        title: 'Todos los grupos gics',
        btnNameActive: true,
        btnName: 'Nuevo Grupo Gics'})
}

grupoGicsCtrl.apiGruposGics = async (req, res) => {

    const gruposGics = await GrupoGics.find().sort({_id: 'asc'}).lean()
    res.json(gruposGics)
}

grupoGicsCtrl.apiGruposGicsByZonal = async (req, res) => {

    const gruposGics = await GrupoGics.find({zonal_asignado: req.params.id})
    res.json(gruposGics)
}

grupoGicsCtrl.renderEditForm = async (req, res) => {
    
    const grupoGics = await GrupoGics.findById(req.params.id).populate('equipo_asignado').populate('zonal_asignado').lean()

    grupoGics.equipo_asignado = grupoGics.equipo_asignado[0]._id
    grupoGics.zonal_asignado = grupoGics.zonal_asignado[0]._id

    res.render('grupo_gics/editar-grupo_gics', {
        grupoGics,
        activeMantenimiento: true,
        activeGrupoGics: true,
        rutaActive: true,
        ruta: 'grupo_gics',
        nameModule: 'Grupo Gics',
        action: 'Editar Grupo Gics'})
}

grupoGicsCtrl.updateGrupoGics = async (req, res) => {
    
    await GrupoGics.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success_msg', '¡Grupo Gics actualizado!')
    res.redirect('/grupo_gics')
}

grupoGicsCtrl.deleteGrupoGics = async (req, res) => {
    
    await GrupoGics.findByIdAndDelete(req.params.id)

    req.flash('success_msg', '¡Grupo Gics eliminado!')
    res.redirect('/grupo_gics')
}

module.exports = grupoGicsCtrl