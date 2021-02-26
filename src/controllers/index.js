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

indexCtrl.renderEquipoAsignado = (req, res) => {
    res.render('equipo_asignado')
}

indexCtrl.renderZonalAsignado = (req, res) => {
    res.render('zonal_asignado')
}

indexCtrl.renderGrupoGics = (req, res) => {
    res.render('grupo_gics')
}

indexCtrl.renderUsuarioGrupoGics = (req, res) => {
    res.render('usuario_grupogics')
}

indexCtrl.renderTecnico = (req, res) => {
    res.render('tecnico')
}

indexCtrl.renderEscalamiento = (req, res) => {
    res.render('escalamiento')
}

indexCtrl.renderAsesor = (req, res) => {
    res.render('asesor')
}

module.exports = indexCtrl