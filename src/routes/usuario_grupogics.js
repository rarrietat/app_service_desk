const express = require('express')
const router = express.Router()

const {
    renderUsuarioGrupoGicsForm,
    createNewUsuarioGrupoGics,
    allUsuariosGrupoGics,
    renderEditForm,
    updateUsuarioGrupoGics,
    deleteUsuarioGrupoGics,
    apiUsuariosGrupoGics,
    apiUsuariosGrupoGicsByGrupoGics
} = require('../controllers/usuario_grupogics')

const {isAuthenticated} = require('../helpers/auth')

router.get('/usuario_grupogics/add', isAuthenticated, renderUsuarioGrupoGicsForm)
router.post('/usuario_grupogics/add', isAuthenticated, createNewUsuarioGrupoGics)
router.get('/usuario_grupogics', isAuthenticated, allUsuariosGrupoGics)
router.get('/usuario_grupogics/edit/:id', isAuthenticated, renderEditForm)
router.put('/usuario_grupogics/edit/:id', isAuthenticated, updateUsuarioGrupoGics)
router.get('/usuario_grupogics/delete/:id', isAuthenticated, deleteUsuarioGrupoGics)
router.get('/api/usuarios_grupogics', isAuthenticated, apiUsuariosGrupoGics)
router.get('/api/usuario_asig/:id', isAuthenticated, apiUsuariosGrupoGicsByGrupoGics)

module.exports = router