const LocalStrategy = require('passport-local').Strategy
const Usuario = require('../models/Usuario')
const helpers = require('../helpers/auth')
const passport = require('passport')

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const usuario = await Usuario.findOne({username})
    if(usuario){
        const validPassword = await helpers.matchPassword(password, usuario.password)
        if(validPassword){
            return done(null, usuario, req.flash('login_msg', 'Bienvenido ' + usuario.nombre));
        }else{
            done(null, false, req.flash('message', 'Contraseña incorrecta'))
        }
    }else{
        return done(null, false, req.flash('message', 'El usuario no existe'))
    }

}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) =>{
        user.user_rol = user.rol[0]
        done(err, user)
    })
})
