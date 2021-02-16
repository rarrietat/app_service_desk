const selectEquipoAsig = document.querySelector('#equipo_asignado')
const selectZonal = document.querySelector('#zonal_asignado')
const selectGrupoGics = document.querySelector('#grupo_gics')
const equipoasig_id = document.querySelector('#idEquipoAsig')

let choiceZonal = ''
let choiceGrupoGics = ''

async function loadChoiceGrupoGics() {

    await fetch('/api/equipos_asignados')
        .then(res => res.json())
        .then(data => {
            data.forEach(listEquipoAsig => {
                selectEquipoAsig.innerHTML += `<option value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
            })
            new Choices(selectEquipoAsig)
        })

    const equipo_id = await selectEquipoAsig.value

    await fetch(`/api/zonal_asignados/${equipo_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listZonalAsig => {
                selectZonal.innerHTML += `<option value="${listZonalAsig._id}">${listZonalAsig.zonal}</option>`
            })
            choiceZonal = new Choices(selectZonal, {position: 'bottom'})
        })

    const zonal_id= await selectZonal.value

    await fetch(`/api/grupos_gics/${zonal_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectGrupoGics.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            choiceGrupoGics = new Choices(selectGrupoGics, {position: 'bottom'})
        })

}

async function loadChoiceGrupoGicsToUpdate() {
    const equipoAsig_id = document.querySelector('#idEquipoAsig').value
    const zonalAsig_id = document.querySelector('#idZonalAsig').value
    const grupogics_id = document.querySelector('#idGrupoGics').value
    
    await fetch('/api/equipos_asignados')
        .then(res => res.json())
        .then(data => {
            data.forEach(listEquipoAsig => {
                if(listEquipoAsig._id == equipoAsig_id){
                    selectEquipoAsig.innerHTML += `<option selected value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
                }else{
                    selectEquipoAsig.innerHTML += `<option value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
                }
                
            })
            new Choices(selectEquipoAsig)
        })

    const equipo_id = await selectEquipoAsig.value

    await fetch(`/api/zonal_asignados/${equipo_id}`)
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

    const zonal_id= await selectZonal.value

    await fetch(`/api/grupos_gics/${zonal_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                if(listGrupoGics._id == grupogics_id){
                    selectGrupoGics.innerHTML += `<option selected value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                }else{
                    selectGrupoGics.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                }
                
            })
            choiceGrupoGics = new Choices(selectGrupoGics, {position: 'bottom'})
        })
}

selectEquipoAsig.addEventListener('change', async () => {

    choiceZonal.destroy()
    choiceGrupoGics.destroy()

    const equipo_id = await selectEquipoAsig.value

    selectZonal.innerHTML = ''
    selectGrupoGics.innerHTML = ''

    await fetch(`/api/zonal_asignados/${equipo_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listZonalAsig => {
                selectZonal.innerHTML += `<option value="${listZonalAsig._id}">${listZonalAsig.zonal}</option>`
            })
            choiceZonal = new Choices(selectZonal, {position: 'bottom'})
        })

    const zonal_id= await selectZonal.value

    await fetch(`/api/grupos_gics/${zonal_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectGrupoGics.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            choiceGrupoGics = new Choices(selectGrupoGics, {position: 'bottom'})
        })

})

selectZonal.addEventListener('change', async () => {

    choiceGrupoGics.destroy()
    selectGrupoGics.innerHTML = ''
    const zonal_id= await selectZonal.value

    await fetch(`/api/grupos_gics/${zonal_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectGrupoGics.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            choiceGrupoGics = new Choices(selectGrupoGics, {position: 'bottom'})
        })

})


window.addEventListener('load', () => {

    if(equipoasig_id != null){
        loadChoiceGrupoGicsToUpdate()
    }else{
        loadChoiceGrupoGics()
    }

})
