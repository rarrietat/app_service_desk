const express = require('express')
const router = express.Router()

const { allReportes, apiAnio, apiMes, apiReportes } = require('../controllers/reporte')

const {isAuthenticated} = require('../helpers/auth')

router.get('/reporte', allReportes)
router.get('/api/anio_reporte', apiAnio)
router.get('/api/mes_reporte/:year', apiMes)
router.get('/api/reporte/:year/:month', apiReportes)

module.exports = router