const express = require('express')
const router = express.Router()

const { allAsignaciones, renderSeguimientoForm } = require('../controllers/bandeja')

const {isAuthenticated} = require('../helpers/auth')

router.get('/bandeja', isAuthenticated, allAsignaciones)
router.get('/bandeja/seguimiento/:id', isAuthenticated, renderSeguimientoForm)

module.exports = router