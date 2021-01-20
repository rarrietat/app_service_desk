const express = require('express')
const router = express.Router()

const {
    renderLoginForm,
    loginUser,
    logoutUser,
    renderUsuarioForm,
    createNewUsuario,
    allUsuarios,
    renderEditForm,
    updateUsuario,
    deleteUsuario,
    apiUsuarios
} = require('../controllers/usuario')

const {isAuthenticated} = require('../helpers/auth')

router.get('/login', renderLoginForm)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

router.get('/usuario/add', renderUsuarioForm)
router.post('/usuario/add', createNewUsuario)
router.get('/usuario', allUsuarios)
router.get('/usuario/edit/:id', renderEditForm)
router.put('/usuario/edit/:id', updateUsuario)
router.get('/usuario/delete/:id', deleteUsuario)

router.get('/api/usuarios', apiUsuarios)

module.exports = router