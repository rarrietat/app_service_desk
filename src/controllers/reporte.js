const reporteCtrl = {}
const dayjs = require('dayjs')
const Asignacion = require('../models/Asignacion')
const Hito3 = require('../models/Hito3')
const Hito4 = require('../models/Hito4')

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

reporteCtrl.apiAnio = async (req, res) => {

    const anios = await Asignacion.aggregate([
        { $group: {
            _id: {
                anio: {
                    $year: "$fecha"
                }
            }
          }
        },
        { $sort: {_id: -1} }
    ])

    res.json(anios)
}

reporteCtrl.apiMes = async (req, res) => {

    const year = req.params.year

    const startDate =  new Date(year, (0))
    const endDate =  new Date(year, (11), 31, 23, 59)

    const mes = await Asignacion.aggregate([
        {
            $match: {
                "fecha": { "$gte": startDate, "$lte": endDate }
            }
        },
        { $group: {
            _id: {
                mes: {
                    $month: "$fecha"
                }
            }
          }
        },
        { $sort: {_id: -1} }
        
    ])

    res.json(mes)
}

reporteCtrl.apiReportes = async (req, res) => {

    const year = req.params['year']
    const month = req.params['month']
    const days = dayjs([year, month]).daysInMonth()

    const startDate =  new Date(year, (month - 1))
    const endDate =  new Date(year, (month - 1), days, 23, 59)

    const reportHito3 = await Hito3.aggregate([
        {
            $match: {
                "createdAt": { "$gte": startDate, "$lte": endDate }
            }
        },
        {
            $unwind: "$cumplimiento"
        },
        { $group: {
            _id: "$cumplimiento",
            count: { $sum: 1}
          }
        }
        
    ])

    const reportHito4 = await Hito4.aggregate([
        {
            $match: {
                "createdAt": { "$gte": startDate, "$lte": endDate }
            }
        },
        {
            $unwind: "$cumplimiento"
        },
        { $group: {
            _id: "$cumplimiento",
            count: { $sum: 1}
          }
        }
        
    ])


    async function groupReport(array){
        let countSi = 0
        let countNo = 0
        array.forEach(e => {
            if(e._id === 'si'){
                countSi = e.count
                e['cumplimientoSi'] = e['count']
                delete e.count
            }else if(e._id === 'no'){
                countNo = e.count
                e['cumplimientoNo'] = e['count']
                delete e.count
            }
        })

        await Porcentaje(countSi, countNo, array)
        
    }

    async function Porcentaje(a, b, array){
        const total = a + b
        const percentSi = ((100 * a) / total).toFixed(2)
        const percentNo = (100 - percentSi).toFixed(2)

        array.forEach(e => {
            if(e._id === 'si') Object.assign(e, {'percentSi': percentSi}, {'total': total})
            else Object.assign(e, {'percentNo': percentNo}, {'total': total})
        })
    }

    await groupReport(reportHito3)
    await groupReport(reportHito4)

    await res.json({'hito3': reportHito3, 'hito4': reportHito4})
}


module.exports = reporteCtrl