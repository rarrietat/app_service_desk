const indexCtrl = {}

indexCtrl.renderIndex = (req, res) => {
    res.render('index', { activeHome: true })
}

indexCtrl.renderAsignacion = (req, res) => {
    res.render('asignacion')
}

indexCtrl.renderUsuario = (req, res) => {
    res.render('usuario')
}

indexCtrl.renderHorario = (req, res) => {
    res.render('horario')
}

indexCtrl.renderEquipo = (req, res) => {
    res.render('equipo')
}

indexCtrl.renderRol = (req, res) => {
    res.render('rol')
}

module.exports = indexCtrl