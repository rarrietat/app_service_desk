const express = require('express')
const router = express.Router()

const {
    renderEquipoForm,
    createNewEquipo,
    allEquipos,
    renderEditForm,
    updateEquipo,
    deleteEquipo,
    apiEquipos
} = require('../controllers/equipo')

const {isAuthenticated} = require('../helpers/auth')

router.get('/equipo/add',isAuthenticated, renderEquipoForm)
router.post('/equipo/add',isAuthenticated, createNewEquipo)
router.get('/equipo',isAuthenticated, allEquipos)
router.get('/equipo/edit/:id',isAuthenticated, renderEditForm)
router.put('/equipo/edit/:id',isAuthenticated, updateEquipo)
router.get('/equipo/delete/:id',isAuthenticated, deleteEquipo)
router.get('/api/equipos',isAuthenticated, apiEquipos)

module.exports = router