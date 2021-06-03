const express = require('express')
const router = express.Router()

const {
    renderEquipoAsignadoForm,
    createNewEquipoAsignado,
    allEquiposAsignados,
    renderEditForm,
    updateEquipoAsignado,
    deleteEquipoAsignado,
    apiEquiposAsignados
} = require('../controllers/equipo_asignado')

const {isAuthenticated} = require('../helpers/auth')

router.get('/equipo_asignado/add', isAuthenticated, renderEquipoAsignadoForm)
router.post('/equipo_asignado/add', isAuthenticated, createNewEquipoAsignado)
router.get('/equipo_asignado', isAuthenticated, allEquiposAsignados)
router.get('/equipo_asignado/edit/:id', isAuthenticated, renderEditForm)
router.put('/equipo_asignado/edit/:id', isAuthenticated, updateEquipoAsignado)
router.get('/equipo_asignado/delete/:id', isAuthenticated, deleteEquipoAsignado)
router.get('/api/equipos_asignados', isAuthenticated, apiEquiposAsignados)

module.exports = router