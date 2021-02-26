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

router.get('/escalamiento/add', renderEscalamientoForm)
router.post('/escalamiento/add', createNewEscalamiento)
router.get('/escalamiento', allEscalamientos)
router.get('/escalamiento/edit/:id', renderEditForm)
router.put('/escalamiento/edit/:id', updateEscalamiento)
router.get('/escalamiento/delete/:id', deleteEscalamiento)
router.get('/api/escalamientos', apiEscalamiento)
router.get('/api/escalamientos/:id', apiEscalamientoByGrupo)

module.exports = router