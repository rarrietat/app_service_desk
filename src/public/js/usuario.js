let equipo_id = document.querySelector('#idEquipo')
let selectRol = document.querySelector('#rol')
let selectEquipo = document.querySelector('#equipo')

// async function listEquipos() {

//     selectRol.innerHTML = ''
//     selectEquipo.innerHTML = ''

//     await fetch('/api/roles')
//         .then(res => res.json())
//         .then(data => {
//             data.forEach(listRoles => {
//                 selectRol.innerHTML += `<option value="${listRoles._id}">${listRoles.rol}</option>`
//             })
//             new Choices(selectRol)
//         })

//     await fetch('/api/equipos')
//         .then(res => res.json())
//         .then(data => {
//             data.forEach(listEquipos => {
//                 selectEquipo.innerHTML += `<option value="${listEquipos._id}">${listEquipos.equipo}</option>`
//             })
//             new Choices(selectEquipo)
//         })

// }

async function listEquiposToUpdate() {

    let equipo_id = document.querySelector('#idEquipo').value
    let rol_id = document.querySelector('#idRol').value

    await fetch('/api/roles')
        .then(res => res.json())
        .then(data => {
            data.forEach(listRoles => {
                if (listRoles._id == rol_id){
                    selectRol.innerHTML += `<option selected value="${listRoles._id}">${listRoles.rol}</option>`
                }else{
                    selectRol.innerHTML += `<option value="${listRoles._id}">${listRoles.rol}</option>`
                }
                
            })
            new Choices(selectRol)
        })

    await fetch('/api/equipos')
        .then(res => res.json())
        .then(data => {
            data.forEach(listEquipos => {
                if (listEquipos._id == equipo_id){
                    selectEquipo.innerHTML += `<option selected value="${listEquipos._id}">${listEquipos.equipo}</option>`
                }else{
                    selectEquipo.innerHTML += `<option value="${listEquipos._id}">${listEquipos.equipo}</option>`
                }
            })
            new Choices(selectEquipo)
        })

}

window.addEventListener('load', () => {

    if(equipo_id != null){
        listEquiposToUpdate()
    }
    // }else{
    //     listEquipos()
    // }

})