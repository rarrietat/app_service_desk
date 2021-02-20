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

router.get('/usuario_grupogics/add', renderUsuarioGrupoGicsForm)
router.post('/usuario_grupogics/add', createNewUsuarioGrupoGics)
router.get('/usuario_grupogics', allUsuariosGrupoGics)
router.get('/usuario_grupogics/edit/:id', renderEditForm)
router.put('/usuario_grupogics/edit/:id', updateUsuarioGrupoGics)
router.get('/usuario_grupogics/delete/:id', deleteUsuarioGrupoGics)
router.get('/api/usuarios_grupogics', apiUsuariosGrupoGics)
router.get('/api/usuario_asig/:id', apiUsuariosGrupoGicsByGrupoGics)

module.exports = router