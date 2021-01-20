const { Router } = require('express')
const router = Router()
const { renderIndex, renderAsignacion, renderUsuario, renderHorario, renderEquipo, renderRol } = require('../controllers/index')
const {isAuthenticated} = require('../helpers/auth')

router.get('/', isAuthenticated, renderIndex)
router.get('/', renderAsignacion)
router.get('/', renderUsuario)
router.get('/', renderHorario)
router.get('/', renderEquipo)
router.get('/', renderRol)

module.exports = router