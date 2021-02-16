const selectEquipoAsig = document.querySelector('#equipo_asignado')
const equipoasig_id = document.querySelector('#idEquipoAsig')

async function loadChoiceEquipoAsig() {

    await fetch('/api/equipos_asignados')
        .then(res => res.json())
        .then(data => {
            data.forEach(listEquipoAsig => {
                selectEquipoAsig.innerHTML += `<option value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
            })
            new Choices(selectEquipoAsig)
        })

}

async function loadChoiceEquipoAsigToUpdate() {
    const equipoasig_id = document.querySelector('#idEquipoAsig').value
    
    await fetch('/api/equipos_asignados')
        .then(res => res.json())
        .then(data => {
            data.forEach(listEquipoAsig => {
                if (listEquipoAsig._id == equipoasig_id){
                    selectEquipoAsig.innerHTML += `<option selected value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
                }else{
                    selectEquipoAsig.innerHTML += `<option value="${listEquipoAsig._id}">${listEquipoAsig.equipo}</option>`
                }
            })
            new Choices(selectEquipoAsig)
        })
}


window.addEventListener('load', () => {

    if(equipoasig_id != null){
        loadChoiceEquipoAsigToUpdate()
    }else{
        loadChoiceEquipoAsig()
    }

})
