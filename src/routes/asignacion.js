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

router.get('/asignacion/add', isAuthenticated, renderAsignacionForm)
router.post('/asignacion/add', isAuthenticated, createNewAsignacion)
router.get('/asignacion', isAuthenticated, allAsignaciones)
router.get('/asignacion/seguimiento/:id', isAuthenticated, renderSeguimientoForm)
router.put('/asignacion/edit/:id', isAuthenticated, updateAsignacion)
router.get('/asignacion/delete/:id', isAuthenticated, deleteAsignacion)
router.post('/asignacion/upload', isAuthenticated, uploadFileAsignacion)
router.get('/api/asignacion/:id', isAuthenticated, apiAsignacionById)
router.get('/api/hito2/:id', isAuthenticated, apiHito2ById)
router.get('/api/hito3/:id', isAuthenticated, apiHito3ById)
router.get('/api/hito4/:id', isAuthenticated, apiHito4ById)
router.post('/api/update_hito1', isAuthenticated, updateAsignacionHito1)
router.post('/api/update_hito2', isAuthenticated, updateAsignacionHito2)
router.post('/api/update_hito3', isAuthenticated, updateAsignacionHito3)
router.post('/api/update_hito4', isAuthenticated, updateAsignacionHito4)
router.post('/api/update_hito5', isAuthenticated, updateAsignacionHito5)

module.exports = router