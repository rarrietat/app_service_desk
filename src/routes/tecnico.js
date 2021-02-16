const express = require('express')
const router = express.Router()

const {
    renderTecnicoForm,
    createNewTecnico,
    allTecnicos,
    renderEditForm,
    updateTecnico,
    deleteTecnico,
    apiTecnicos
} = require('../controllers/tecnico')

const {isAuthenticated} = require('../helpers/auth')

router.get('/tecnico/add', renderTecnicoForm)
router.post('/tecnico/add', createNewTecnico)
router.get('/tecnico', allTecnicos)
router.get('/tecnico/edit/:id', renderEditForm)
router.put('/tecnico/edit/:id', updateTecnico)
router.get('/tecnico/delete/:id', deleteTecnico)
router.get('/api/tecnicos', apiTecnicos)

module.exports = router