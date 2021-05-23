const path = require('path')
const XLSX = require('xlsx')
const Asignacion = require('../models/Asignacion')
const helpers = {}

const Horario = require('../models/Horario')
const dayjs = require('dayjs')
require('dayjs/locale/es')
dayjs.locale('es')

const mesActual = dayjs().format('M')
const diaActual = dayjs().format('dddd')
const numberDay = dayjs().format('d')

helpers.LeerExcel = async () => {
    const ruta = await path.join(__dirname, `../public/upload/averias.xls`)
    const workbook = XLSX.readFile(ruta)
    const workbookSheets = workbook.SheetNames
    const sheet = workbookSheets[0]
    const worksheets = workbook.Sheets[sheet]

    await deleteFirstRow(worksheets)
    
    const dataExcel = await XLSX.utils.sheet_to_json(worksheets)
    const lastRow = dataExcel.length - 1
    dataExcel.splice(lastRow,1)

    let uniq = {};
    let filtered = await dataExcel.filter(obj => !uniq[obj['ID de la incidencia']] && (uniq[obj['ID de la incidencia']] = true))

    const horarios = await Horario.find({mes: mesActual}).sort({_id: 'asc'}).populate('usuario').lean()

    let i = 0
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
                    usuario = horarios[i].usuario[0]._id
                    i++
                    if(i == maxCont){i=0}
                    return usuario
                }else i++
            }else if(diaActual === diafinSem){
                    
                if(date >= horaIngresoFinSem &&  date < horaIniRegriFinSem || date >= horaFinRegriFinSem &&  date < horaSalidaFinSem){
                    usuario = horarios[i].usuario[0]._id
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

        let nro_incidencia = element['ID de la incidencia']
        let cliente = element['Empresa cliente']
        let resumen = element['Resumen']
        let estado_inc = element['Estado de la incidencia']
        let prioridad = element['Prioridad']
        let segmento = element['Apellidos del cliente']
        let plazo = element['Nombre del cliente']
        let fecha = element['Fecha de notificación']
        const partsFecha = fecha.split('/')
        fecha = `${partsFecha[1]}-${partsFecha[0]}-${partsFecha[2]}`

        let estado_sla = element['Estado de resolución de SLA']
        let escalado = element['¿Escalado?']
        let grupo_asignado = element['Grupo asignado']
        let usuario_asignado = element['Usuario asignado']
        let nota = element['Notas']
        let tipo_inc = element['Tipo de incidencia']

        const horaAveriaRegistrada = await dayjs(fecha).format()
        let usuario = await AsignacionUsuarios(horaAveriaRegistrada)
        
        const newAsignacion = new Asignacion({nro_incidencia, cliente, resumen, estado_inc, prioridad, segmento, plazo, fecha, estado_sla, escalado, grupo_asignado, usuario_asignado, nota, tipo_inc, usuario})
        await newAsignacion.save()

    }

}

async function deleteFirstRow(worksheets){
    const range = await XLSX.utils.decode_range(worksheets['!ref'])
    range.s.r = 1
    range.e.r = 60
    worksheets['!ref'] = await XLSX.utils.encode_range(range)
}

module.exports = helpers