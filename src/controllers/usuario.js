const usuarioCtrl = {}
const passport = require('passport')
const Usuario = require('../models/Usuario')
const helpers = require('../helpers/auth')

usuarioCtrl.renderLoginForm = (req, res) => {
    res.render('login', {layout: false})
}

usuarioCtrl.loginUser = (req, res, next) => {

    passport.authenticate('local.login', {
        failureRedirect: 'login',
        //successRedirect: '/',
        successRedirect: '/asignacion',
        failureFlash: true
    })(req, res, next)
    
}

usuarioCtrl.logoutUser = (req, res) => {
    req.logout()
    res.redirect('/login')
}

usuarioCtrl.renderUsuarioForm = (req, res) => {
    res.render('usuario/agregar-usuario', {
        activeUsuario: true,
        rutaActive: true,
        ruta: 'usuario',
        nameModule: 'Usuarios',
        action: 'Nuevo Usuario'
    })
}

usuarioCtrl.createNewUsuario = async (req, res) => {

    const errors = []
    const {nombre, apellido, username, password, correo, celular, rol, equipo} = req.body

    if(password.length < 6){
        errors.push({text: 'La constraseña tiene que ser mínima de 6 caracteres'})
    }
    if(errors.length > 0){
        res.render('usuario/agregar-usuario', {
            errors, nombre, apellido, username, correo, celular, rol, equipo
        })
    }else{
        const usernameUsuario = await Usuario.findOne({username: username})
        if(usernameUsuario){
            errors.push({text: 'El usuario ya existe'})
            res.render('usuario/agregar-usuario', {
                errors, nombre, apellido, password, correo, celular, rol, equipo
            })
        }else{
            const newUsuario = new Usuario({nombre, apellido, username, password, correo, celular, rol, equipo})
            newUsuario.password = await helpers.encryptPassword(password)
            await newUsuario.save()

            req.flash('success_msg', '¡Usuario registrado!')
            res.redirect('/usuario')
        }
    }

}

usuarioCtrl.apiUsuarios = async (req, res) => {

    const usuarios = await Usuario.find().sort({_id: 'desc'}).and({rol: {$ne: '5fbd44f1967a920270313e3e'}})
    res.json(usuarios)
}

usuarioCtrl.allUsuarios = async (req, res) => {
    const usuarios = await Usuario.find().sort({_id: 'asc'}).lean()
    //const popular = await Usuario.findOne().populate('rol')

    res.render('usuario/mostrar-usuarios', {
        usuarios,
        activeUsuario: true,
        ruta: 'usuario',
        nameModule: 'Usuarios',
        title: 'Todos los usuarios',
        btnNameActive: true,
        btnName: 'Nuevo Usuario'
    })
}

usuarioCtrl.renderEditForm = async (req, res) => {

    const usuario = await Usuario.findById(req.params.id).lean()
    
    res.render('usuario/editar-usuario', {
        usuario,
        activeUsuario: true,
        rutaActive: true,
        ruta: 'usuario',
        nameModule: 'Usuario',
        action: 'Editar Usuario'
    })

}

usuarioCtrl.updateUsuario = async (req, res) => {

    const errors = []
    const usuario_id = req.params.id
    const {nombre, apellido, username, password, correo, celular, rol, equipo} = req.body

    const newUsuario = {nombre, apellido, username, password, correo, celular, rol, equipo}
    const userQuery = await Usuario.findById(usuario_id)

    if(password != userQuery.password){
        newUsuario.password = await helpers.encryptPassword(password)
    }

    if(password.length < 6){
        errors.push({text: 'La constraseña tiene que ser mínima de 6 caracteres'})
    }

    if(errors.length > 0){
        res.render('usuario/editar-usuario', {
            errors, usuario_id, nombre, apellido, username, correo, celular, rol, equipo
        })
    }else{

        const usernameUsuario = await Usuario.find({username: username}).and({username: {$ne: userQuery.username}})
        
        if(usernameUsuario.length > 0){
            errors.push({text: 'El usuario ya existe'})
            res.render('usuario/editar-usuario', {
                errors, usuario_id, nombre, apellido, password, correo, celular, rol, equipo
            })
        }else{
            await Usuario.findByIdAndUpdate(usuario_id, newUsuario, function (err, docs) { 
                if (err){ 
                    console.log(err)
                } 
                else{ 
                    console.log("Updated User : ", docs); 
                } 
            })
    
            req.flash('success_msg', '¡Usuario actualizado!')
            res.redirect('/usuario')
        }

    }

}

usuarioCtrl.deleteUsuario = async (req, res) => {

    await Usuario.findByIdAndDelete(req.params.id)

    req.flash('success_msg', 'Usuario eliminado!')
    res.redirect('/usuario')

}

module.exports = usuarioCtrl