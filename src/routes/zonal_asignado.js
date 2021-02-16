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

router.get('/zonal_asignado/add', renderZonalAsignadoForm)
router.post('/zonal_asignado/add', createNewZonalAsignado)
router.get('/zonal_asignado', allZonalAsignados)
router.get('/zonal_asignado/edit/:id', renderEditForm)
router.put('/zonal_asignado/edit/:id', updateZonalAsignado)
router.get('/zonal_asignado/delete/:id', deleteZonalAsignado)
router.get('/api/zonal_asignados', apiZonalAsignados)
router.get('/api/zonal_asignados/:id', apiZonalAsignadosByEquipo)

module.exports = router