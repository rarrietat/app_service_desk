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
    apiHito2ById,
    apiHito3ById,
    apiHito4ById,
    updateAsignacionHito1,
    updateAsignacionHito2,
    updateAsignacionHito3,
    updateAsignacionHito4,
    updateAsignacionHito5
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
router.get('/api/hito2/:id', apiHito2ById)
router.get('/api/hito3/:id', apiHito3ById)
router.get('/api/hito4/:id', apiHito4ById)
router.post('/api/update_hito1', updateAsignacionHito1)
router.post('/api/update_hito2', updateAsignacionHito2)
router.post('/api/update_hito3', updateAsignacionHito3)
router.post('/api/update_hito4', updateAsignacionHito4)
router.post('/api/update_hito5', updateAsignacionHito5)

module.exports = router