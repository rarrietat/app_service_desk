const express = require('express')
const router = express.Router()

const {
    renderEscalamientoForm,
    createNewEscalamiento,
    allEscalamientos,
    renderEditForm,
    updateEscalamiento,
    deleteEscalamiento,
    apiEscalamiento,
    apiEscalamientoByGrupo
} = require('../controllers/escalamiento')

const {isAuthenticated} = require('../helpers/auth')

router.get('/escalamiento/add', isAuthenticated, renderEscalamientoForm)
router.post('/escalamiento/add', isAuthenticated, createNewEscalamiento)
router.get('/escalamiento', isAuthenticated, allEscalamientos)
router.get('/escalamiento/edit/:id', isAuthenticated, renderEditForm)
router.put('/escalamiento/edit/:id', isAuthenticated, updateEscalamiento)
router.get('/escalamiento/delete/:id', isAuthenticated, deleteEscalamiento)
router.get('/api/escalamientos', isAuthenticated, apiEscalamiento)
router.get('/api/escalamientos/:id', isAuthenticated, apiEscalamientoByGrupo)

module.exports = router