const zonalAsignadoCtrl = {}
const ZonalAsignado = require('../models/ZonalAsignado')

zonalAsignadoCtrl.renderZonalAsignadoForm = (req, res) => {
    res.render('zonal_asignado/agregar-zonal_asignado', {
        activeMantenimiento: true,
        activeZonalAsignado: true,
        rutaActive: true,
        ruta: 'zonal_asignado',
        nameModule: 'Zonal',
        action: 'Nuevo Zonal'})
}

zonalAsignadoCtrl.createNewZonalAsignado = async (req, res) => {

    const newZonalAsignado = new ZonalAsignado(req.body)
    await newZonalAsignado.save()

    req.flash('success_msg', 'Zonal registrado!')
    res.redirect('/zonal_asignado')
}

zonalAsignadoCtrl.allZonalAsignados = async (req, res) => {

    const zonalAsignados = await ZonalAsignado.find().sort({_id: 'asc'}).populate('equipo_asignado').lean()

    const listZonalAsignados = zonalAsignados.map(cont => {
        return {_id: cont._id, zonal: cont.zonal, equipo: cont.equipo_asignado[0].equipo, descripcion: cont.descripcion}
    })

    res.render('zonal_asignado/mostrar-zonal_asignados', {
        zonalAsignados: listZonalAsignados,
        activeMantenimiento: true,
        activeZonalAsignado: true,
        ruta: 'zonal_asignado',
        nameModule: 'Zonal',
        title: 'Todos los zonales',
        btnNameActive: true,
        btnName: 'Nuevo Zonal'})
}

zonalAsignadoCtrl.apiZonalAsignados = async (req, res) => {

    const zonalAsignados = await ZonalAsignado.find().sort({_id: 'asc'}).lean()
    res.json(zonalAsignados)
}

zonalAsignadoCtrl.apiZonalAsignadosByEquipo = async (req, res) => {

    const zonalAsignados = await ZonalAsignado.find({equipo_asignado: req.params.id})
    res.json(zonalAsignados)
}

zonalAsignadoCtrl.renderEditForm = async (req, res) => {
    
    const zonalAsignado = await ZonalAsignado.findById(req.params.id).lean()
    zonalAsignado.equipo_asignado = zonalAsignado.equipo_asignado[0]

    res.render('zonal_asignado/editar-zonal_asignado', {
        zonalAsignado,
        activeMantenimiento: true,
        activeZonalAsignado: true,
        rutaActive: true,
        ruta: 'zonal_asignado',
        nameModule: 'Zonal',
        action: 'Editar Zonal'})
}

zonalAsignadoCtrl.updateZonalAsignado = async (req, res) => {
    
    await ZonalAsignado.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success_msg', 'Zonal actualizado!')
    res.redirect('/zonal_asignado')
}

zonalAsignadoCtrl.deleteZonalAsignado = async (req, res) => {
    
    await ZonalAsignado.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Zonal eliminado!')
    res.redirect('/zonal_asignado')
}

module.exports = zonalAsignadoCtrl