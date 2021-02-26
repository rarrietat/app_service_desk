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

router.get('/asesor/add', renderAsesorForm)
router.post('/asesor/add', createNewAsesor)
router.get('/asesor', allAsesores)
router.get('/asesor/edit/:id', renderEditForm)
router.put('/asesor/edit/:id', updateAsesor)
router.get('/asesor/delete/:id', deleteAsesor)

router.get('/api/asesores', apiAsesores)

module.exports = router