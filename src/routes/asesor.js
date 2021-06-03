const express = require('express')
const router = express.Router()

const {
    renderAsesorForm,
    createNewAsesor,
    allAsesores,
    renderEditForm,
    updateAsesor,
    deleteAsesor,
    apiAsesores
} = require('../controllers/asesor')

const {isAuthenticated} = require('../helpers/auth')

router.get('/asesor/add', isAuthenticated, renderAsesorForm)
router.post('/asesor/add', isAuthenticated, createNewAsesor)
router.get('/asesor', isAuthenticated, allAsesores)
router.get('/asesor/edit/:id', isAuthenticated, renderEditForm)
router.put('/asesor/edit/:id', isAuthenticated, updateAsesor)
router.get('/asesor/delete/:id', isAuthenticated, deleteAsesor)

router.get('/api/asesores', apiAsesores)

module.exports = router