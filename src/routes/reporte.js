const express = require('express')
const router = express.Router()

const { allReportes } = require('../controllers/reporte')

const {isAuthenticated} = require('../helpers/auth')

router.get('/reporte', allReportes)

module.exports = router