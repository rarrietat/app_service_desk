const express = require('express')
const router = express.Router()

const {
    renderTecnicoForm,
    createNewTecnico,
    allTecnicos,
    renderEditForm,
    updateTecnico,
    deleteTecnico,
    apiTecnicos,
    apiTecnicosByGrupo
} = require('../controllers/tecnico')

const {isAuthenticated} = require('../helpers/auth')

router.get('/tecnico/add', isAuthenticated, renderTecnicoForm)
router.post('/tecnico/add', isAuthenticated, createNewTecnico)
router.get('/tecnico', isAuthenticated, allTecnicos)
router.get('/tecnico/edit/:id', isAuthenticated, renderEditForm)
router.put('/tecnico/edit/:id', isAuthenticated, updateTecnico)
router.get('/tecnico/delete/:id', isAuthenticated, deleteTecnico)
router.get('/api/tecnicos', isAuthenticated, apiTecnicos)
router.get('/api/tecnicos/:id', isAuthenticated, apiTecnicosByGrupo)

module.exports = router