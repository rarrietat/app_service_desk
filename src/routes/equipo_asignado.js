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

router.get('/equipo_asignado/add', renderEquipoAsignadoForm)
router.post('/equipo_asignado/add', createNewEquipoAsignado)
router.get('/equipo_asignado',     allEquiposAsignados)
router.get('/equipo_asignado/edit/:id', renderEditForm)
router.put('/equipo_asignado/edit/:id', updateEquipoAsignado)
router.get('/equipo_asignado/delete/:id', deleteEquipoAsignado)
router.get('/api/equipos_asignados', apiEquiposAsignados)

module.exports = router