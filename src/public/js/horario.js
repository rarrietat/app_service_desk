const usuario = document.querySelector('#usuario')
const selectMes = document.querySelector('#mes')
const selectFinSemana = document.querySelector('#diafinSemana')
const descanso = document.querySelector('#descanso')

let usuario_id = document.querySelector('#idUsuario')
let choiceUsuario = ''

async function load() {

    await fetch('/api/usuarios')
        .then(res => res.json())
        .then(data => {
            data.forEach(listUsuarios => {
                usuario.innerHTML += `<option value="${listUsuarios._id}">${listUsuarios.nombre} ${listUsuarios.apellido}</option>`
            })
            new Choices(usuario)
        })

    for (let i = 0; i < 12; i++) {

        const numberMes = dayjs().month(i).format('M')
        const nameMes = dayjs().locale('es').month(i).format('MMMM')

        if(numberMes === dayjs().format('M')){
            selectMes.innerHTML += `<option selected value="${numberMes}">${nameMes}</option>`
        }else{
            selectMes.innerHTML += `<option value="${numberMes}">${nameMes}</option>`
        }

    }

    new Choices(selectMes, {shouldSort: false})

    descanso.value = 'domingo'
}

async function loadToUpdate() {

    const usuario_id = document.querySelector('#idUsuario').value
    const diaFinSemana = document.querySelector('#idDiaFinSemana').value
    const mes_id = document.querySelector('#idMes').value

    await fetch('/api/usuarios')
        .then(res => res.json())
        .then(data => {
            data.forEach(listUsuarios => {
                if (listUsuarios._id == usuario_id){
                    usuario.value = `${listUsuarios.nombre} ${listUsuarios.apellido}`
                }
            })
        })

    for (let i = 0; i < 12; i++) {

        const numberMes = dayjs().month(i).format('M')
        const nameMes = dayjs().locale('es').month(i).format('MMMM')

        if(numberMes === dayjs(mes_id).format('M')){
            selectMes.innerHTML += `<option selected value="${numberMes}">${nameMes}</option>`
        }else{
            selectMes.innerHTML += `<option value="${numberMes}">${nameMes}</option>`
        }

    }

    new Choices(selectMes, {shouldSort: false})

    selectFinSemana.value = diaFinSemana

}

selectFinSemana.addEventListener('change', async () => {

    if(selectFinSemana.value == 'domingo'){
        descanso.value = 'sábado'
    }else{
        descanso.value = 'domingo'
    }

})

window.addEventListener('load', () => {

    if(usuario_id != null){
        loadToUpdate()
    }else{
        load()
    }

})
