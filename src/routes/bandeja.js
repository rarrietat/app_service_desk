const express = require('express')
const router = express.Router()

const { allAsignaciones, renderSeguimientoForm } = require('../controllers/bandeja')

const {isAuthenticated} = require('../helpers/auth')

router.get('/bandeja', allAsignaciones)
router.get('/bandeja/seguimiento/:id', renderSeguimientoForm)

module.exports = router