const path = require('path')
const multer = require('multer')
const fs = require('fs')
const XLSX = require('xlsx')
const helpers = {}
const Horario = require('../models/Horario')
const dayjs = require('dayjs')
require('dayjs/locale/es')
dayjs.locale('es')

const mesActual = dayjs().format('M')
const diaActual = dayjs().format('dddd')
const numberDay = dayjs().format('d')

async function leerExcel(res){
    const ruta = path.join(__dirname, `../public/upload/averias.xls`)
    const workbook = XLSX.readFile(ruta)
    const workbookSheets = await workbook.SheetNames
    const sheet = await workbookSheets[0]
    const worksheet = await workbook.Sheets[sheet]
    
    await deleteFirstRow(worksheet)
    
    const dataExcel = await XLSX.utils.sheet_to_json(worksheet)
    const lastRow = await dataExcel.length - 1
    await dataExcel.splice(lastRow,1)

    let uniq = {};
    let filtered = await dataExcel.filter(obj => !uniq[obj['ID de la incidencia']] && (uniq[obj['ID de la incidencia']] = true))
    
    const horarios = await Horario.find({mes: mesActual}).sort({_id: 'asc'}).populate('usuario').lean()

    var arrayUserAsignados = new Array()

    // await horarios.forEach(e => {
        
    //     const horaIngreso = dayjs(dayjs().format('YYYY-MM-DD')+ e.semanal[0].ingreso).format()
    //     const horaIniRegri = dayjs(dayjs().format('YYYY-MM-DD')+ e.semanal[0].refrigerio[0].inicio).format()
    //     const horaFinRegri = dayjs(dayjs().format('YYYY-MM-DD')+ e.semanal[0].refrigerio[0].fin).format()
    //     const horaSalida = dayjs(dayjs().format('YYYY-MM-DD')+ e.semanal[0].salida).format()
    //     const diafinSem = e.finSemana[0].dia
    //     const horaIngresoFinSem = dayjs(dayjs().format('YYYY-MM-DD')+ e.finSemana[0].ingreso).format()
    //     const horaIniRegriFinSem = dayjs(dayjs().format('YYYY-MM-DD')+ e.finSemana[0].refrigerio[0].inicio).format()
    //     const horaFinRegriFinSem = dayjs(dayjs().format('YYYY-MM-DD')+ e.finSemana[0].refrigerio[0].fin).format()
    //     const horaSalidaFinSem = dayjs(dayjs().format('YYYY-MM-DD')+ e.finSemana[0].salida).format()

    //     if(numberDay === '1' || numberDay === '2' || numberDay === '3' || numberDay === '4' || numberDay === '5'){
    //         if(horaActual >= horaIngreso &&  horaActual < horaIniRegri || horaActual >= horaFinRegri &&  horaActual < horaSalida){
    //             arrayUserAsignados.push(e.usuario[0].nombre + ' ' + e.usuario[0].apellido)
    //         }
    //     }else if(diaActual === diafinSem){
            
    //         if(horaActual >= horaIngresoFinSem &&  horaActual < horaIniRegriFinSem || horaActual >= horaFinRegriFinSem &&  horaActual < horaSalidaFinSem){
    //             arrayUserAsignados.push(e.usuario[0].nombre + ' ' + e.usuario[0].apellido)
    //         }
    
    //     }
    
    // })

    let i = 0
    // const maxCont = arrayUserAsignados.length

    const maxCont = horarios.length

    async function AsignacionUsuarios(date){

        let usuario = ''

        for(let j = 0; j < (maxCont); j++){

            const horaIngreso = await dayjs(dayjs(date).format('YYYY-MM-DD')+ horarios[i].semanal[0].ingreso).format()
            const horaIniRegri = await dayjs(dayjs(date).format('YYYY-MM-DD')+ horarios[i].semanal[0].refrigerio[0].inicio).format()
            const horaFinRegri = await dayjs(dayjs(date).format('YYYY-MM-DD')+ horarios[i].semanal[0].refrigerio[0].fin).format()
            const horaSalida = await dayjs(dayjs(date).format('YYYY-MM-DD')+ horarios[i].semanal[0].salida).subtract(1, 'hour').format()
            const diafinSem = await horarios[i].finSemana[0].dia
            const horaIngresoFinSem = await dayjs(dayjs(date).format('YYYY-MM-DD')+ horarios[i].finSemana[0].ingreso).format()
            const horaIniRegriFinSem = await dayjs(dayjs(date).format('YYYY-MM-DD')+ horarios[i].finSemana[0].refrigerio[0].inicio).format()
            const horaFinRegriFinSem = await dayjs(dayjs(date).format('YYYY-MM-DD')+ horarios[i].finSemana[0].refrigerio[0].fin).format()
            const horaSalidaFinSem = await dayjs(dayjs(date).format('YYYY-MM-DD')+ horarios[i].finSemana[0].salida).subtract(1, 'hour').format()
        
            if(numberDay === '1' || numberDay === '2' || numberDay === '3' || numberDay === '4' || numberDay === '5'){
                if(date >= horaIngreso &&  date < horaIniRegri || date >= horaFinRegri &&  date < horaSalida){
                    usuario = `${horarios[i].usuario[0].nombre} ${horarios[i].usuario[0].apellido}`
                    i++
                    if(i == maxCont){i=0}
                    return usuario
                }else i++
            }else if(diaActual === diafinSem){
                    
                if(date >= horaIngresoFinSem &&  date < horaIniRegriFinSem || date >= horaFinRegriFinSem &&  date < horaSalidaFinSem){
                    usuario = `${horarios[i].usuario[0].nombre} ${horarios[i].usuario[0].apellido}`
                    i++
                    if(i == maxCont){i=0}
                    return usuario
                }else i++
                
            }else if(diaActual !== diafinSem){
                i++
                if(i == maxCont){i=0}
                if(j == (maxCont - 1)){j=0}
            }

            if(i == maxCont){i=0}

        }

    }

    for await (const element of filtered){

        let horaAveriaRegistrada = await element['Fecha de notificación']
        const partsFecha = await horaAveriaRegistrada.split('/')
        horaAveriaRegistrada = await dayjs(`${partsFecha[1]}-${partsFecha[0]}-${partsFecha[2]}`).format()

        const usuario = await AsignacionUsuarios(horaAveriaRegistrada)
        element.usuario = usuario

    }

    res.status(200).json(filtered)
}

async function deleteFirstRow(worksheets){
    const range = await XLSX.utils.decode_range(worksheets['!ref'])//<-- start "select"
    range.s.r = 1 // <-- start row
    range.e.r = 60 // <-- end row
    worksheets['!ref'] = await XLSX.utils.encode_range(range)//<-- end "select"
}

helpers.UploadFile = async (req, res) => {

    const storage = await multer.diskStorage({
        destination: async (req, file, cb) => {
            const rutaUpload = path.join(__dirname, `../public/upload`)
            fs.mkdirSync(rutaUpload, { recursive: true })
            await cb(null, rutaUpload)
        },
        
        filename: async (req, file, cb, filename) => {
            await cb(null, 'averias'+path.extname(file.originalname))
        }
    })

    const upload = await multer({ storage, limits: { fieldSize: 5000000} }).single('fileUpload')

    await upload(req, res, async (err) => {

        if ( err || !req.file )
            return res.send({ error: 'invalid_file' })

        const name_file = req.file.originalname
        await leerExcel(res)
        //res.status(200).json(name_file)
    })

}

module.exports = helpers