const express = require('express')
const router = express.Router()

const {
    renderAsignacionForm,
    createNewAsignacion,
    allAsignaciones,
    renderEditForm,
    updateAsignacion,
    deleteAsignacion,
    uploadFileAsignacion,
    apiAsignacionById
} = require('../controllers/asignacion')

const {isAuthenticated} = require('../helpers/auth')

router.get('/asignacion/add', renderAsignacionForm)
router.post('/asignacion/add', createNewAsignacion)
router.get('/asignacion', allAsignaciones)
router.get('/asignacion/edit/:id', renderEditForm)
router.put('/asignacion/edit/:id', updateAsignacion)
router.get('/asignacion/delete/:id', deleteAsignacion)
router.post('/asignacion/upload', uploadFileAsignacion)
router.get('/api/asignacion/:id', apiAsignacionById)

module.exports = router