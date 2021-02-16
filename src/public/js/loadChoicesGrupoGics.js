const selectEquipoAsig = document.querySelector('#equipo_asignado')
const selectZonal = document.querySelector('#zonal_asignado')
const equipoasig_id = document.querySelector('#idEquipoAsig')

let choiceZonal = ''

async function loadChoiceGrupoGics() {

    await fetch('/api/equipos_asignados')
        .then(res => res.json())
        .then(data => {
            data.forEach(listEquipoAsig => {
                selectEquipoAsig.innerHTML += `<option value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
            })
            new Choices(selectEquipoAsig)
        })

    const zonal_id = await selectEquipoAsig.value

    await fetch(`/api/zonal_asignados/${zonal_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listZonalAsig => {
                selectZonal.innerHTML += `<option value="${listZonalAsig._id}">${listZonalAsig.zonal}</option>`
            })
            choiceZonal = new Choices(selectZonal, {position: 'bottom'})
        })

}

async function loadChoiceGrupoGicsToUpdate() {
    const equipo_id = document.querySelector('#idEquipoAsig').value
    const zonalAsig_id = document.querySelector('#idZonalAsig').value
    
    await fetch('/api/equipos_asignados')
        .then(res => res.json())
        .then(data => {
            data.forEach(listEquipoAsig => {
                if(listEquipoAsig._id == equipo_id){
                    selectEquipoAsig.innerHTML += `<option selected value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
                }else{
                    selectEquipoAsig.innerHTML += `<option value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
                }
                
            })
            new Choices(selectEquipoAsig)
        })

    const zonal_id = await selectEquipoAsig.value

    await fetch(`/api/zonal_asignados/${zonal_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listZonalAsig => {
                if(listZonalAsig._id == zonalAsig_id){
                    selectZonal.innerHTML += `<option selected value="${listZonalAsig._id}">${listZonalAsig.zonal}</option>`
                }else{
                    selectZonal.innerHTML += `<option value="${listZonalAsig._id}">${listZonalAsig.zonal}</option>`
                }
                
            })
            choiceZonal = new Choices(selectZonal, {position: 'bottom'})
        })
}

selectEquipoAsig.addEventListener('change', async () => {

    choiceZonal.destroy()

    const zonal_id = await selectEquipoAsig.value

    selectZonal.innerHTML = ''

    await fetch(`/api/zonal_asignados/${zonal_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listZonalAsig => {
                selectZonal.innerHTML += `<option value="${listZonalAsig._id}">${listZonalAsig.zonal}</option>`
            })
            choiceZonal = new Choices(selectZonal, {position: 'bottom'})
        })

})


window.addEventListener('load', () => {

    if(equipoasig_id != null){
        loadChoiceGrupoGicsToUpdate()
    }else{
        loadChoiceGrupoGics()
    }

})
