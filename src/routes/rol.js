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

router.get('/rol/add', isAuthenticated, renderRolForm)
router.post('/rol/add', isAuthenticated, createNewRol)
router.get('/rol', isAuthenticated, allRoles)
router.get('/rol/edit/:id', isAuthenticated, renderEditForm)
router.put('/rol/edit/:id', isAuthenticated, updateRol)
router.get('/rol/delete/:id', isAuthenticated, deleteRol)
router.get('/api/roles', isAuthenticated, apiRoles)

module.exports = router