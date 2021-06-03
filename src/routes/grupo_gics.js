const express = require('express')
const router = express.Router()

const {
    renderGrupoGicsForm,
    createNewGrupoGics,
    allGruposGics,
    renderEditForm,
    updateGrupoGics,
    deleteGrupoGics,
    apiGruposGics,
    apiGruposGicsByZonal
} = require('../controllers/grupo_gics')

const {isAuthenticated} = require('../helpers/auth')

router.get('/grupo_gics/add', isAuthenticated, renderGrupoGicsForm)
router.post('/grupo_gics/add', isAuthenticated, createNewGrupoGics)
router.get('/grupo_gics', isAuthenticated, allGruposGics)
router.get('/grupo_gics/edit/:id', isAuthenticated, renderEditForm)
router.put('/grupo_gics/edit/:id', isAuthenticated, updateGrupoGics)
router.get('/grupo_gics/delete/:id', isAuthenticated, deleteGrupoGics)
router.get('/api/grupos_gics', isAuthenticated, apiGruposGics)
router.get('/api/grupos_gics/:id', isAuthenticated, apiGruposGicsByZonal)

module.exports = router