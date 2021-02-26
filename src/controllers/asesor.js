const asesorCtrl = {}
const Asesor = require('../models/Asesor')

asesorCtrl.renderAsesorForm = (req, res) => {
    res.render('asesor/agregar-asesor', {
        activeMantenimiento: true,
        activeAsesor: true,
        rutaActive: true,
        ruta: 'asesor',
        nameModule: 'Asesores',
        action: 'Nuevo Asesor'
    })
}

asesorCtrl.createNewAsesor = async (req, res) => {
    
    const newAsesor = new Asesor(req.body)
    await newAsesor.save()

    req.flash('success_msg', '¡Asesor registrado!')
    res.redirect('/asesor')

}

asesorCtrl.apiAsesores = async (req, res) => {

    const asesores = await Asesor.find().sort({_id: 'desc'}).and({rol: {$ne: '5fbd44f1967a920270313e3e'}})
    res.json(asesores)
}

asesorCtrl.allAsesores = async (req, res) => {
    const asesores = await Asesor.find().sort({_id: 'asc'}).lean()

    res.render('asesor/mostrar-asesores', {
        asesores,
        activeMantenimiento: true,
        activeAsesor: true,
        ruta: 'asesor',
        nameModule: 'Asesores',
        title: 'Todos los asesores',
        btnNameActive: true,
        btnName: 'Nuevo Asesor'
    })
}

asesorCtrl.renderEditForm = async (req, res) => {

    const asesor = await Asesor.findById(req.params.id).lean()
    
    res.render('asesor/editar-asesor', {
        asesor,
        activeMantenimiento: true,
        activeAsesor: true,
        rutaActive: true,
        ruta: 'asesor',
        nameModule: 'Asesor',
        action: 'Editar Asesor'
    })

}

asesorCtrl.updateAsesor = async (req, res) => {

    const asesor_id = req.params.id
    await Asesor.findByIdAndUpdate(asesor_id, req.body)

    req.flash('success_msg', '¡Asesor actualizado!')
    res.redirect('/asesor')

}

asesorCtrl.deleteAsesor = async (req, res) => {

    await Asesor.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Asesor eliminado!')
    res.redirect('/asesor')

}

module.exports = asesorCtrl