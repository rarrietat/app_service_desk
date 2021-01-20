const bcrypt = require('bcryptjs')
const helpers = {}

helpers.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.matchPassword = async (password, savePassword) => {
    try {
        return await bcrypt.compare(password, savePassword)
    } catch (error) {
        console.log(error)
    }
}

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    //req.flash('error', 'Requiere iniciar sesión')
    res.redirect('../login')
}

helpers.isNoAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

module.exports = helpers