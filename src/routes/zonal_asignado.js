const express = require('express')
const router = express.Router()

const {
    renderZonalAsignadoForm,
    createNewZonalAsignado,
    allZonalAsignados,
    renderEditForm,
    updateZonalAsignado,
    deleteZonalAsignado,
    apiZonalAsignados,
    apiZonalAsignadosByEquipo
} = require('../controllers/zonal_asignado')

const {isAuthenticated} = require('../helpers/auth')

router.get('/zonal_asignado/add', isAuthenticated, renderZonalAsignadoForm)
router.post('/zonal_asignado/add', isAuthenticated, createNewZonalAsignado)
router.get('/zonal_asignado', isAuthenticated, allZonalAsignados)
router.get('/zonal_asignado/edit/:id', isAuthenticated, renderEditForm)
router.put('/zonal_asignado/edit/:id', isAuthenticated, updateZonalAsignado)
router.get('/zonal_asignado/delete/:id', isAuthenticated, deleteZonalAsignado)
router.get('/api/zonal_asignados', isAuthenticated, apiZonalAsignados)
router.get('/api/zonal_asignados/:id', isAuthenticated, apiZonalAsignadosByEquipo)

module.exports = router