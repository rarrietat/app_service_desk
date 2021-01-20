const express = require('express')
const router = express.Router()

const {
    renderHorarioForm,
    createNewHorario,
    allHorarios,
    renderEditForm,
    updateHorario,
    deleteHorario
} = require('../controllers/horario')

const {isAuthenticated} = require('../helpers/auth')

router.get('/horario/add',isAuthenticated, renderHorarioForm)
router.post('/horario/add',isAuthenticated, createNewHorario)
router.get('/horario',isAuthenticated, allHorarios)
router.get('/horario/edit/:id',isAuthenticated, renderEditForm)
router.put('/horario/edit/:id',isAuthenticated, updateHorario)
router.get('/horario/delete/:id',isAuthenticated, deleteHorario)

module.exports = router