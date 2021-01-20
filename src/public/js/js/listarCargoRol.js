let selectCargo = document.querySelector('#cargo')
let selectRol = document.querySelector('#rol')
let cargo_id = document.querySelector('#idCargo')

async function listCargoRol() {

    selectCargo.innerHTML = ''

    await fetch('/api/cargos')
        .then(res => res.json())
        .then(data => {
            data.forEach(listCargos => {
                selectCargo.innerHTML += `<option value="${listCargos.cargo_id}">${listCargos.cargo}</option>`
            })
            
            new Choices(selectCargo)
        })

    selectRol.innerHTML = ''

    await fetch(`/api/roles`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listRoles => {
                selectRol.innerHTML += `<option value="${listRoles.rol_id}">${listRoles.rol}</option>`
            })
            new Choices(selectRol)
        })

}

async function listCargoRolToUpdate() {

    let cargo_id = document.querySelector('#idCargo').value
    let rol_id = document.querySelector('#idRol').value

    await fetch('/api/cargos')
        .then(res => res.json())
        .then(data => {
            data.forEach(listCargos => {
                if (listCargos.cargo_id == cargo_id){
                    selectCargo.innerHTML += `<option selected value="${listCargos.cargo_id}">${listCargos.cargo}</option>`
                }else{
                    selectCargo.innerHTML += `<option value="${listCargos.cargo_id}">${listCargos.cargo}</option>`
                }
            })
            new Choices(selectCargo)
        })

    await fetch(`/api/roles`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listRoles => {
                if (listRoles.rol_id == rol_id){
                    selectRol.innerHTML += `<option selected value="${listRoles.rol_id}">${listRoles.rol}</option>`
                }else{
                    selectRol.innerHTML += `<option value="${listRoles.rol_id}">${listRoles.rol}</option>`
                }
            })
            new Choices(selectRol)
        })

}

window.addEventListener('load', () => {

    if(cargo_id != null){
        listCargoRolToUpdate()
    }else{
        listCargoRol()
    }

})