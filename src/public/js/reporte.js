const selectYear = document.querySelector('#anio')
const selectMonth = document.querySelector('#mes')
let choiceMonth = ''

const cumplimientoSiHito3 = document.querySelector('#cumplimientoSiHito3')
const porcentajeSiHito3 = document.querySelector('#porcentajeSiHito3')
const cumplimientoNoHito3 = document.querySelector('#cumplimientoNoHito3')
const porcentajeNoHito3 = document.querySelector('#porcentajeNoHito3')
const totalHito3 = document.querySelector('#totalHito3')

const cumplimientoSiHito4 = document.querySelector('#cumplimientoSiHito4')
const porcentajeSiHito4 = document.querySelector('#porcentajeSiHito4')
const cumplimientoNoHito4 = document.querySelector('#cumplimientoNoHito4')
const porcentajeNoHito4 = document.querySelector('#porcentajeNoHito4')
const totalHito4 = document.querySelector('#totalHito4')

async function listYear(){

    await fetch('/api/anio_reporte')
    .then(res => res.json())
    .then(data => {
        data.forEach(listYear => {
            selectYear.innerHTML += `<option value="${listYear._id.anio}">${listYear._id.anio}</option>`
        })
        new Choices(selectYear, {
            position: 'bottom'
        })
    })

}

async function listMonth(year){

    if(choiceMonth.initialised !== undefined) choiceMonth.destroy()

    dayjs.locale('es')

    await fetch(`/api/mes_reporte/${year}`)
    .then(res => res.json())
    .then(data => {
        selectMonth.innerHTML = ''
        data.forEach(listMonth => {
            const nameMonth = dayjs([year, listMonth._id.mes]).format('MMMM')
            selectMonth.innerHTML += `<option value="${listMonth._id.mes}">${nameMonth}</option>`
        })
        choiceMonth = new Choices(selectMonth, {
            position: 'bottom'
        })
    })

}

async function listReport(year, month){

    cumplimientoSiHito3.innerHTML = ''
    porcentajeSiHito3.innerHTML = ''
    cumplimientoNoHito3.innerHTML = ''
    porcentajeNoHito3.innerHTML = ''
    totalHito3.innerHTML = ''

    cumplimientoSiHito4.innerHTML = ''
    porcentajeSiHito4.innerHTML = ''
    cumplimientoNoHito4.innerHTML = ''
    porcentajeNoHito4.innerHTML = ''
    totalHito4.innerHTML = ''

    await fetch(`/api/reporte/${year}/${month}`)
    .then(async res => await res.json())
    .then(async data => {
        data.hito3.forEach(e => {
            if(e._id == 'si'){
                cumplimientoSiHito3.innerHTML = e.cumplimientoSi
                porcentajeSiHito3.innerHTML = e.percentSi + ' %'
                totalHito3.innerHTML = e.total
            }else{
                cumplimientoNoHito3.innerHTML = e.cumplimientoNo
                porcentajeNoHito3.innerHTML = e.percentNo + ' %'
                totalHito3.innerHTML = e.total
            }
        })

        data.hito4.forEach(e => {
            if(e._id == 'si'){
                cumplimientoSiHito4.innerHTML = e.cumplimientoSi
                porcentajeSiHito4.innerHTML = e.percentSi + ' %'
                totalHito4.innerHTML = e.total
            }else{
                cumplimientoNoHito4.innerHTML = e.cumplimientoNo
                porcentajeNoHito4.innerHTML = e.percentNo + ' %'
                totalHito4.innerHTML = e.total
            }
        })
    })

}

selectYear.addEventListener('change', async () => {

    const year = await selectYear.value
    await listMonth(year)
    const month = await selectMonth.value
    await listReport(year, month)
    
})

selectMonth.addEventListener('change', async () => {

    const year = await selectYear.value
    const month = await selectMonth.value
    await listReport(year, month)
    
})

window.addEventListener('load', async () => {

    await listYear()
    const year = await selectYear.value
    await listMonth(year)
    const month = await selectMonth.value
    await listReport(year, month)

})