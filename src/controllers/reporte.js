const reporteCtrl = {}

reporteCtrl.allReportes = async (req, res) => {

    res.render('reporte/mostrar-reportes', {
        activeReporte: true,
        ruta: 'reporte',
        nameModule: 'Reportes',
        title: 'Reportes de cumplimiento',
        btnNameActive: false,
        btnName: 'Consultar reporte'
    })
}

module.exports = reporteCtrl