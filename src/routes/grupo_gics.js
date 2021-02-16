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

router.get('/grupo_gics/add', renderGrupoGicsForm)
router.post('/grupo_gics/add', createNewGrupoGics)
router.get('/grupo_gics', allGruposGics)
router.get('/grupo_gics/edit/:id', renderEditForm)
router.put('/grupo_gics/edit/:id', updateGrupoGics)
router.get('/grupo_gics/delete/:id', deleteGrupoGics)
router.get('/api/grupos_gics', apiGruposGics)
router.get('/api/grupos_gics/:id', apiGruposGicsByZonal)

module.exports = router