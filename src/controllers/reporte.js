const reporteCtrl = {}
const dayjs = require('dayjs')
const Asignacion = require('../models/Asignacion')
const Hito1 = require('../models/Hito1')
const Hito2 = require('../models/Hito2')
const Hito3 = require('../models/Hito3')
const Hito4 = require('../models/Hito4')
const Hito5 = require('../models/Hito5')

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




reporteCtrl.renderEditReporte = async (req, res) => {

    const asignacion = await Asignacion.findById(req.params.id).lean()
    const hito1 = await Hito1.findById(asignacion.hito1[0]).lean()
    const hito2 = await Hito2.findById(asignacion.hito2[0]).lean()
    const hito3 = await Hito3.findById(asignacion.hito3[0]).lean()
    const hito4 = await Hito4.findById(asignacion.hito4[0]).lean()
    const hito5 = await Hito5.findById(asignacion.hito5[0]).lean()

    if(asignacion.hito1[0] != undefined){
        hito1.fecha = dayjs(hito1.createdAt).format('DD/MM/YYYY')
        hito1.hora = dayjs(hito1.createdAt).format('HH:mm:ss')
    }

    if(asignacion.hito2[0] != undefined){
        hito2.fecha = dayjs(hito2.createdAt).format('DD/MM/YYYY')
        hito2.hora = dayjs(hito2.createdAt).format('HH:mm:ss')
    }

    if(asignacion.hito3[0] != undefined){
        hito3.fecha = dayjs(hito3.createdAt).format('DD/MM/YYYY')
        hito3.hora = dayjs(hito3.createdAt).format('HH:mm:ss')
    }

    if(asignacion.hito4[0] != undefined){
        hito4.fecha = await dayjs(hito4.createdAt).format('DD/MM/YYYY')
        hito4.hora = await dayjs(hito4.createdAt).format('HH:mm:ss')
    }

    if(asignacion.hito5[0] != undefined){
        hito5.fecha = dayjs(hito5.createdAt).format('DD/MM/YYYY')
        hito5.hora = dayjs(hito5.createdAt).format('HH:mm:ss')
    }
    
    res.render('reporte/update-report', {
        hito1, hito2, hito3, hito4, hito5, asignacion,
        activeReporte: true,
        rutaActive: true,
        ruta: 'reporte',
        nameModule: 'Reporte',
        action: 'Editar Reporte'
    })

}

reporteCtrl.updateReporte = async (req, res) => {

    const asignacion = await Asignacion.findById(req.params.id).lean()
    
    const {
        hito1Id, fechaCreacionHito1, horaCreacionHito1, cumplimientoHito1, 
        hito2Id, fechaCreacionHito2, horaCreacionHito2, cumplimientoHito2,
        hito3Id, fechaCreacionHito3, horaCreacionHito3, cumplimientoHito3, 
        hito4Id, fechaCreacionHito4, horaCreacionHito4, cumplimientoHito4,
        hito5Id, fechaCreacionHito5, horaCreacionHito5, cumplimientoHito5
    } = req.body
    
    if(hito1Id != ''){
        const partsFecha = await fechaCreacionHito1.split('/')
        const createdAt = await dayjs(`${partsFecha[2]}-${partsFecha[1]}-${partsFecha[0]} ${horaCreacionHito1}`).format()
        await Hito1.findByIdAndUpdate(hito1Id, { cumplimiento: cumplimientoHito1, createdAt }, { timestamps: false })
    }

    if(hito2Id != ''){
        const partsFecha = await fechaCreacionHito2.split('/')
        const createdAt = await dayjs(`${partsFecha[2]}-${partsFecha[1]}-${partsFecha[0]} ${horaCreacionHito2}`).format()
        await Hito2.findByIdAndUpdate(hito2Id, { cumplimiento: cumplimientoHito2, createdAt }, { timestamps: false })
    }

    if(hito3Id != ''){
        const partsFecha = await fechaCreacionHito3.split('/')
        const createdAt = await dayjs(`${partsFecha[2]}-${partsFecha[1]}-${partsFecha[0]} ${horaCreacionHito3}`).format()
        await Hito3.findByIdAndUpdate(hito3Id, { cumplimiento: cumplimientoHito3, createdAt }, { timestamps: false })
    }

    if(hito4Id != ''){
        const partsFecha = await fechaCreacionHito4.split('/')
        const createdAt = await dayjs(`${partsFecha[2]}-${partsFecha[1]}-${partsFecha[0]} ${horaCreacionHito4}`).format()
        await Hito4.findByIdAndUpdate(hito4Id, { cumplimiento: cumplimientoHito4, createdAt }, { timestamps: false })
    }

    if(hito5Id != ''){
        const partsFecha = await fechaCreacionHito5.split('/')
        const createdAt = await dayjs(`${partsFecha[2]}-${partsFecha[1]}-${partsFecha[0]} ${horaCreacionHito5}`).format()
        await Hito5.findByIdAndUpdate(hito5Id, { cumplimiento: cumplimientoHito5, createdAt }, { timestamps: false })
    }

    req.flash('success_msg', '¡Reporte actualizado!')
    res.redirect('/asignacion')

}

module.exports = reporteCtrl