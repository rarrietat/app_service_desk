const selectYear = document.querySelector('#anio')
const selectMonth = document.querySelector('#mes')
let choiceMonth = ''

const cumplimientoSiHito3 = document.querySelector('#cumplimientoSiHito3')
const porcentajeSiHito3 = document.querySelector('#porcentajeSiHito3')
const cumplimientoNoHito3 = document.querySelector('#cumplimientoNoHito3')
const porcentajeNoHito3 = document.querySelector('#porcentajeNoHito3')
const totalHito3 = document.querySelector('#totalHito3')
const totalPorcentajeHito3 = document.querySelector('#totalPorcentajeHito3')

const cumplimientoSiHito4 = document.querySelector('#cumplimientoSiHito4')
const porcentajeSiHito4 = document.querySelector('#porcentajeSiHito4')
const cumplimientoNoHito4 = document.querySelector('#cumplimientoNoHito4')
const porcentajeNoHito4 = document.querySelector('#porcentajeNoHito4')
const totalHito4 = document.querySelector('#totalHito4')
const totalPorcentajeHito4 = document.querySelector('#totalPorcentajeHito4')

const ctx1 = document.querySelector('#chartHito3').getContext('2d')
const ctx2 = document.querySelector('#chartHito4').getContext('2d')

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
    await renderCharts(year, month)
    await validar()
    
})

selectMonth.addEventListener('change', async () => {

    const year = await selectYear.value
    const month = await selectMonth.value
    await listReport(year, month)
    await renderCharts(year, month)
    await validar()
    
})

let chartsHito3
let chartsHito4

//## reports
async function totalCasesChart(ctx1, ctx2, year, month){

    if(chartsHito3) chartsHito3.destroy()
    if(chartsHito4) chartsHito4.destroy()

    const dataHito3 = []
    const dataHito4 = []

    await fetch(`/api/reporte/${year}/${month}`)
        .then(async res => await res.json())
        .then(async data => {
            
            await data.hito3.forEach(e => {
                if(data.hito3[0].cumplimientoSi === undefined && data.hito3[0].cumplimientoNo != undefined) dataHito3.push(0)
                if(e._id == 'si') dataHito3.push(e.cumplimientoSi)
                if(e._id == 'no') dataHito3.push(e.cumplimientoNo)
            })

            chartsHito3 = await new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: ['Cumplimiento', 'No Cumplimiento'],
                    datasets: [{
                        label: 'Averias',
                        data: dataHito3,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                          display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })

            await data.hito4.forEach(e => {
                if(data.hito4[0].cumplimientoSi === undefined && data.hito4[0].cumplimientoNo != undefined) dataHito4.push(0)
                if(e._id == 'si') dataHito4.push(e.cumplimientoSi)
                if(e._id == 'no') dataHito4.push(e.cumplimientoNo)
            })

            chartsHito4 = await new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ['Cumplimiento', 'No Cumplimiento'],
                    datasets: [{
                        label: 'Averias',
                        data: dataHito4,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                          display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })
        })

}

async function renderCharts(year, month){

    await totalCasesChart(ctx1, ctx2, year, month)
}

async function validar(){
    if(cumplimientoSiHito3.innerHTML == ''){
        cumplimientoSiHito3.innerHTML = 0
        porcentajeSiHito3.innerHTML = '0 %'
    }

    if(cumplimientoNoHito3.innerHTML == ''){
        cumplimientoNoHito3.innerHTML = 0
        porcentajeNoHito3.innerHTML = '0 %'
    }

    if(totalHito3.innerHTML == ''){
        totalHito3.innerHTML = 0
        totalPorcentajeHito3.innerHTML = '0 %'
    }else totalPorcentajeHito3.innerHTML = '100 %'

    
    if(cumplimientoSiHito4.innerHTML == ''){
        cumplimientoSiHito4.innerHTML = 0
        porcentajeSiHito4.innerHTML = '0 %'
    }

    if(cumplimientoNoHito4.innerHTML == ''){
        cumplimientoNoHito4.innerHTML = 0
        porcentajeNoHito4.innerHTML = '0 %'
    }

    if(totalHito4.innerHTML == ''){
        totalHito4.innerHTML = 0
        totalPorcentajeHito4.innerHTML = '0 %'
    }else totalPorcentajeHito4.innerHTML = '100 %'

}

window.addEventListener('load', async () => {

    await listYear()
    const year = await selectYear.value
    await listMonth(year)
    const month = await selectMonth.value
    await listReport(year, month)
    await renderCharts(year, month)
    await validar()

})