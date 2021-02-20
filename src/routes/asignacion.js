const express = require('express')
const router = express.Router()

const {
    renderAsignacionForm,
    createNewAsignacion,
    allAsignaciones,
    renderSeguimientoForm,
    updateAsignacion,
    deleteAsignacion,
    uploadFileAsignacion,
    apiAsignacionById,
    updateAsignacionHito1
} = require('../controllers/asignacion')

const {isAuthenticated} = require('../helpers/auth')

router.get('/asignacion/add', renderAsignacionForm)
router.post('/asignacion/add', createNewAsignacion)
router.get('/asignacion', allAsignaciones)
router.get('/asignacion/seguimiento/:id', renderSeguimientoForm)
router.put('/asignacion/edit/:id', updateAsignacion)
router.get('/asignacion/delete/:id', deleteAsignacion)
router.post('/asignacion/upload', uploadFileAsignacion)
router.get('/api/asignacion/:id', apiAsignacionById)
router.post('/api/update_hito1', updateAsignacionHito1)

module.exports = router