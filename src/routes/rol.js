const express = require('express')
const router = express.Router()

const {
    renderRolForm,
    createNewRol,
    allRoles,
    renderEditForm,
    updateRol,
    deleteRol,
    apiRoles
} = require('../controllers/rol')

const {isAuthenticated} = require('../helpers/auth')

router.get('/rol/add', renderRolForm)
router.post('/rol/add', createNewRol)
router.get('/rol', allRoles)
router.get('/rol/edit/:id', renderEditForm)
router.put('/rol/edit/:id', updateRol)
router.get('/rol/delete/:id', deleteRol)
router.get('/api/roles', apiRoles)

module.exports = router