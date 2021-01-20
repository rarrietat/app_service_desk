const selectTipoActividad = document.querySelector('#tipoActividad')
const tipoActividad_id = document.querySelector('#idTipoActividad')

async function loadChoiceActividad() {
    
    await fetch('/api/tipo_actividades')
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoAct => {
                selectTipoActividad.innerHTML += `<option value="${listTipoAct.tipoact_id}">${listTipoAct.tipo_actividad}</option>`
            })
            new Choices(selectTipoActividad)
        })

}

async function loadChoiceActividadToUpdate() {
    const tipoActividad_id = document.querySelector('#idTipoActividad').value
    
    await fetch('/api/tipo_actividades')
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoActividad => {
                if (listTipoActividad.tipoact_id == tipoActividad_id){
                    selectTipoActividad.innerHTML += `<option selected value="${listTipoActividad.tipoact_id}">${listTipoActividad.tipo_actividad}</option>`
                }else{
                    selectTipoActividad.innerHTML += `<option value="${listTipoActividad.tipoact_id}">${listTipoActividad.tipo_actividad}</option>`
                }
            })

            new Choices(selectTipoActividad)
        })
}


window.addEventListener('load', () => {

    if(tipoActividad_id != null){
        loadChoiceActividadToUpdate()
    }else{
        loadChoiceActividad()
    }

})
