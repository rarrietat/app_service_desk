const { Router } = require('express')
const router = Router()
const { renderIndex, renderAsignacion, renderUsuario, renderHorario, renderEquipo, renderRol, renderGrupoGics, renderUsuarioGrupoGics, renderEquipoAsignado, renderZonalAsignado, renderTecnico } = require('../controllers/index')
const {isAuthenticated} = require('../helpers/auth')

router.get('/', isAuthenticated, renderIndex)
router.get('/', renderAsignacion)
router.get('/', renderUsuario)
router.get('/', renderHorario)
router.get('/', renderEquipo)
router.get('/', renderRol)
router.get('/', renderEquipoAsignado)
router.get('/', renderZonalAsignado)
router.get('/', renderGrupoGics)
router.get('/', renderUsuarioGrupoGics)
router.get('/', renderTecnico)

module.exports = router