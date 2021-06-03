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
router.get('/logout', isAuthenticated, logoutUser)

router.get('/usuario/add', isAuthenticated, renderUsuarioForm)
router.post('/usuario/add', isAuthenticated, createNewUsuario)
router.get('/usuario', isAuthenticated, allUsuarios)
router.get('/usuario/edit/:id', isAuthenticated, renderEditForm)
router.put('/usuario/edit/:id', isAuthenticated, updateUsuario)
router.get('/usuario/delete/:id', isAuthenticated, deleteUsuario)

router.get('/api/usuarios', apiUsuarios)

module.exports = router