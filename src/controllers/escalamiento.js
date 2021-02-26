const escalamientoCtrl = {}
const Escalamiento = require('../models/Escalamiento')

escalamientoCtrl.renderEscalamientoForm = (req, res) => {
    res.render('escalamiento/agregar-escalamiento', {
        activeMantenimiento: true,
        activeEscalamiento: true,
        rutaActive: true,
        ruta: 'escalamiento',
        nameModule: 'Escalamientos',
        action: 'Nuevo Escalamiento'})
}

escalamientoCtrl.createNewEscalamiento = async (req, res) => {

    const newEscalamiento = new Escalamiento(req.body)
    await newEscalamiento.save()

    req.flash('success_msg', 'Escalamiento registrado!')
    res.redirect('/escalamiento')
}

escalamientoCtrl.allEscalamientos = async (req, res) => {

    const escalamientos = await Escalamiento.find().sort({_id: 'asc'})
                                    .populate('equipo_asignado')
                                    .populate('zonal_asignado')
                                    .populate('grupo_gics').lean()

    const listEscalamientos = escalamientos.map(cont => {
        return {_id: cont._id,
                nombre: cont.nombre,
                apellido: cont.apellido,
                celular: cont.celular,
                grupo_gics: cont.grupo_gics[0].grupo_gics,
                zonal_asignado: cont.zonal_asignado[0].zonal,
                equipo_asignado: cont.equipo_asignado[0].equipo
                }
    })

    res.render('Escalamiento/mostrar-escalamientos', {
        escalamientos: listEscalamientos,
        activeMantenimiento: true,
        activeEscalamiento: true,
        ruta: 'escalamiento',
        nameModule: 'Escalamientos',
        title: 'Todos los escalamientos',
        btnNameActive: true,
        btnName: 'Nuevo Escalamiento'})
}

escalamientoCtrl.apiEscalamiento = async (req, res) => {

    const escalamientos = await Escalamiento.find().sort({_id: 'asc'}).lean()
    res.json(escalamientos)
}

escalamientoCtrl.apiEscalamientoByGrupo = async (req, res) => {

    const escalamientos = await Escalamiento.find({grupo_gics: req.params.id})
    res.json(escalamientos)
}

escalamientoCtrl.renderEditForm = async (req, res) => {
    
    const escalamiento = await Escalamiento.findById(req.params.id).lean()
    escalamiento.equipo_asignado = escalamiento.equipo_asignado[0]._id
    escalamiento.zonal_asignado = escalamiento.zonal_asignado[0]._id
    escalamiento.grupo_gics = escalamiento.grupo_gics[0]._id

    res.render('Escalamiento/editar-Escalamiento', {
        escalamiento,
        activeMantenimiento: true,
        activeEscalamiento: true,
        rutaActive: true,
        ruta: 'escalamiento',
        nameModule: 'Escalamiento',
        action: 'Editar Escalamiento'})
}

escalamientoCtrl.updateEscalamiento = async (req, res) => {
    
    await Escalamiento.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success_msg', 'Escalamiento actualizado!')
    res.redirect('/escalamiento')
}

escalamientoCtrl.deleteEscalamiento = async (req, res) => {
    
    await Escalamiento.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Escalamiento eliminado!')
    res.redirect('/escalamiento')
}

module.exports = escalamientoCtrl