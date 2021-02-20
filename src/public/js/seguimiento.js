const selectGrupoAsig = document.querySelector('#grupo_asignado')
const selectUsuarioAsig = document.querySelector('#usuario_asignado')
const equipoasig_id = document.querySelector('#idEquipoAsig')

let choiceUsuarioAsig = ''

async function loadChoiceHito1() {

    await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectGrupoAsig.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            new Choices(selectGrupoAsig, {position: 'bottom'})
        })

    const grupo_id = await selectGrupoAsig.value

    await fetch(`/api/usuario_asig/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listUsuarioAsig => {
                selectUsuarioAsig.innerHTML += `<option value="${listUsuarioAsig._id}">${listUsuarioAsig.nombre} ${listGrupoGics.apellido}</option>`
            })
            choiceUsuarioAsig = new Choices(selectUsuarioAsig, {position: 'bottom'})
        })

}


selectGrupoAsig.addEventListener('change', async () => {

    choiceUsuarioAsig.destroy()
    selectUsuarioAsig.innerHTML = ''

    const grupo_id = await selectGrupoAsig.value

    await fetch(`/api/usuario_asig/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectUsuarioAsig.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.nombre} ${listGrupoGics.apellido}</option>`
            })
            choiceUsuarioAsig = new Choices(selectUsuarioAsig, {position: 'bottom'})
        })

})


window.addEventListener('load', () => {

    if(equipoasig_id != null){
        console.log('nulllll')
    }else{
        loadChoiceHito1()
    }

})

const formHito1 = document.querySelector('#formHito1')

formHito1.addEventListener("submit", async function (e) {
    e.preventDefault()

    data = new FormData(formHito1)
    const object = {}
    data.forEach(function (value, key) {
        object[key] = value
    })
    const dataJson = JSON.stringify(object)
    console.log(dataJson)

    await fetch('/api/update_hito1', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            },
            body: dataJson
        })
        .then(async res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(async (file) => {
            console.log(file)
        })
        .catch((error) => {
            console.log(error);
        })
    
    // Swal.fire({
    //     title: '¿Estás seguro?',
    //     text: "¡No podrás revertir esto!",
    //     icon: 'info',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: '¡Sí, Guardar!',
    //     cancelButtonText: 'Cancelar'
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         document.location.href = id
    //     }
    // })

})



