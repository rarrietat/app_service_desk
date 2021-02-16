const tecnico = {}
const Tecnico = require('../models/Tecnico')

tecnico.renderTecnicoForm = (req, res) => {
    res.render('tecnico/agregar-tecnico', {
        activeMantenimiento: true,
        activeTecnico: true,
        rutaActive: true,
        ruta: 'tecnico',
        nameModule: 'Técnicos',
        action: 'Nuevo Técnico'})
}

tecnico.createNewTecnico = async (req, res) => {

    const newTecnico = new Tecnico(req.body)
    await newTecnico.save()

    req.flash('success_msg', 'Técnico registrado!')
    res.redirect('/tecnico')
}

tecnico.allTecnicos = async (req, res) => {

    const tecnicos = await Tecnico.find().sort({_id: 'asc'})
                                    .populate('equipo_asignado')
                                    .populate('zonal_asignado')
                                    .populate('grupo_gics').lean()

    const listTecnicos = tecnicos.map(cont => {
        return {_id: cont._id,
                nombre: cont.nombre,
                apellido: cont.apellido,
                grupo_gics: cont.grupo_gics[0].grupo_gics,
                zonal_asignado: cont.zonal_asignado[0].zonal,
                equipo_asignado: cont.equipo_asignado[0].equipo
                }
    })

    res.render('tecnico/mostrar-tecnicos', {
        tecnicos: listTecnicos,
        activeMantenimiento: true,
        activeTecnico: true,
        ruta: 'tecnico',
        nameModule: 'Técnicos',
        title: 'Todos los técnicos',
        btnNameActive: true,
        btnName: 'Nuevo Técnico'})
}

tecnico.apiTecnicos = async (req, res) => {

    const tecnicos = await Tecnico.find().sort({_id: 'asc'}).lean()
    res.json(tecnicos)
}

tecnico.renderEditForm = async (req, res) => {
    
    const tecnico = await Tecnico.findById(req.params.id).lean()
    tecnico.equipo_asignado = tecnico.equipo_asignado[0]._id
    tecnico.zonal_asignado = tecnico.zonal_asignado[0]._id
    tecnico.grupo_gics = tecnico.grupo_gics[0]._id

    res.render('tecnico/editar-tecnico', {
        tecnico,
        activeMantenimiento: true,
        activeTecnico: true,
        rutaActive: true,
        ruta: 'tecnico',
        nameModule: 'Técnico',
        action: 'Editar Técnico'})
}

tecnico.updateTecnico = async (req, res) => {
    
    await Tecnico.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success_msg', 'Técnico actualizado!')
    res.redirect('/tecnico')
}

tecnico.deleteTecnico = async (req, res) => {
    
    await Tecnico.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Técnico eliminado!')
    res.redirect('/tecnico')
}

module.exports = tecnico