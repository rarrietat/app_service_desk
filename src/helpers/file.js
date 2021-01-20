const path = require('path')
const multer = require('multer')
const fs = require('fs')
const XLSX = require('xlsx')
const helpers = {}

const Horario = require('../models/Horario')

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
    
    const horarios = await Horario.find().sort({_id: 'desc'}).populate('usuario').lean()

    let i = 0
    const maxCont = horarios.length

    filtered.forEach(element => {
        element.usuario = `${horarios[i].usuario[0].nombre} ${horarios[i].usuario[0].apellido}`
        i++
        if(i == maxCont){i=0}
    })

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