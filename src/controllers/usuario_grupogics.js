const usuarioGrupoGicsCtrl = {}
const UsuarioGrupoGics = require('../models/UsuarioGrupoGics')

usuarioGrupoGicsCtrl.renderUsuarioGrupoGicsForm = (req, res) => {
    res.render('usuario_grupogics/agregar-usuario_grupogics', {
        activeMantenimiento: true,
        activeUsuarioGrupoGics: true,
        rutaActive: true,
        ruta: 'usuario_grupogics',
        nameModule: 'Usuarios Grupo Gics',
        action: 'Nuevo Usuario Grupo Gics'})
}

usuarioGrupoGicsCtrl.createNewUsuarioGrupoGics = async (req, res) => {

    const newUsuarioGrupoGics = new UsuarioGrupoGics(req.body)
    await newUsuarioGrupoGics.save()

    req.flash('success_msg', '¡Usuario registrado!')
    res.redirect('/usuario_grupogics')
}

usuarioGrupoGicsCtrl.allUsuariosGrupoGics = async (req, res) => {

    const usuariosGrupoGics = await UsuarioGrupoGics.find().sort({_id: 'asc'})
                                    .populate('equipo_asignado')
                                    .populate('zonal_asignado')
                                    .populate('grupo_gics').lean()

    const listUsuariosGrupoGics = usuariosGrupoGics.map(cont => {
        return {_id: cont._id,
                nombre: cont.nombre,
                apellido: cont.apellido,
                grupo_gics: cont.grupo_gics[0].grupo_gics,
                zonal_asignado: cont.zonal_asignado[0].zonal,
                equipo_asignado: cont.equipo_asignado[0].equipo
                }
    })

    console.log(listUsuariosGrupoGics)

    res.render('usuario_grupogics/mostrar-usuarios_grupogics', {
        usuariosGrupoGics: listUsuariosGrupoGics,
        activeMantenimiento: true,
        activeUsuarioGrupoGics: true,
        ruta: 'usuario_grupogics',
        nameModule: 'Usuarios Grupo Gics',
        title: 'Todos los usuarios grupos gics',
        btnNameActive: true,
        btnName: 'Nuevo Usuario'})
}

usuarioGrupoGicsCtrl.apiUsuariosGrupoGics = async (req, res) => {

    const usuariosGrupoGics = await UsuarioGrupoGics.find().sort({_id: 'asc'}).lean()
    res.json(usuariosGrupoGics)
}

usuarioGrupoGicsCtrl.renderEditForm = async (req, res) => {
    
    const usuarioGrupoGics = await UsuarioGrupoGics.findById(req.params.id).lean()
    usuarioGrupoGics.equipo_asignado = usuarioGrupoGics.equipo_asignado[0]._id
    usuarioGrupoGics.zonal_asignado = usuarioGrupoGics.zonal_asignado[0]._id
    usuarioGrupoGics.grupo_gics = usuarioGrupoGics.grupo_gics[0]._id

    res.render('usuario_grupogics/editar-usuario_grupogics', {
        usuarioGrupoGics,
        activeMantenimiento: true,
        activeUsuarioGrupoGics: true,
        rutaActive: true,
        ruta: 'usuario_grupogics',
        nameModule: 'Usuario Asignado',
        action: 'Editar Usuario Asignado'})
}

usuarioGrupoGicsCtrl.updateUsuarioGrupoGics = async (req, res) => {
    
    await UsuarioGrupoGics.findByIdAndUpdate(req.params.id, req.body)

    req.flash('success_msg', '¡Usuario actualizado!')
    res.redirect('/usuario_grupogics')
}

usuarioGrupoGicsCtrl.deleteUsuarioGrupoGics = async (req, res) => {
    
    await UsuarioGrupoGics.findByIdAndDelete(req.params.id)

    req.flash('success_msg', '¡Usuario eliminado!')
    res.redirect('/usuario_grupogics')
}

module.exports = usuarioGrupoGicsCtrl