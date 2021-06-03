const express = require('express')
const router = express.Router()

const { allReportes, apiAnio, apiMes, apiReportes, renderEditReporte, updateReporte } = require('../controllers/reporte')

const {isAuthenticated} = require('../helpers/auth')

router.get('/reporte', isAuthenticated, allReportes)
router.get('/api/anio_reporte', isAuthenticated, apiAnio)
router.get('/api/mes_reporte/:year', isAuthenticated, apiMes)
router.get('/api/reporte/:year/:month', isAuthenticated, apiReportes)

router.get('/reporte/edit/:id', isAuthenticated, renderEditReporte)
router.put('/reporte/edit/:id', isAuthenticated, updateReporte)

module.exports = router