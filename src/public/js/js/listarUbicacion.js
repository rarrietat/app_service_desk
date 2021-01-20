let selectCiudad = document.querySelector('#ciudad')
let selectProvincia = document.querySelector('#provincia')
let selectDistrito = document.querySelector('#distrito')

let choiceCiudad = ''
let choiceProvincia = ''
let choiceDistrito = ''

let dpto_id = document.querySelector('#idCiudad')

async function listUbicacion() {

    await fetch('/api/departamentos')
        .then(res => res.json())
        .then(data => {
            data.forEach(listDptos => {
                selectCiudad.innerHTML += `<option value="${listDptos.dpto_id}">${listDptos.nombre_dpto}</option>`
            })
            choiceCiudad = new Choices(selectCiudad);
        })

    await fetch(`/api/provincias/01`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listProvincias => {
                selectProvincia.innerHTML += `<option value="${listProvincias.prov_id}">${listProvincias.nombre_prov}</option>`
            })
            choiceProvincia = new Choices(selectProvincia);
        })
    
    await fetch(`/api/distritos/01/0101`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listDistritos => {
                selectDistrito.innerHTML += `<option value="${listDistritos.dist_id}">${listDistritos.nombre_dist}</option>`
            })
            choiceDistrito = new Choices(selectDistrito);
        })
}

async function listUbicacionToUpdate() {
    const dpto_id = document.querySelector('#idCiudad').value
    const prov_id = document.querySelector('#idProvincia').value
    const dist_id = document.querySelector('#idDistrito').value

    await fetch('/api/departamentos')
        .then(res => res.json())
        .then(data => {
            data.forEach(listDptos => {
                if (listDptos.dpto_id === dpto_id){
                    selectCiudad.innerHTML += `<option selected value="${listDptos.dpto_id}">${listDptos.nombre_dpto}</option>`
                }else{
                    selectCiudad.innerHTML += `<option value="${listDptos.dpto_id}">${listDptos.nombre_dpto}</option>`
                }
            })
            choiceCiudad = new Choices(selectCiudad);
        })

    await fetch(`/api/provincias/${dpto_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listProvincias => {
                if (listProvincias.prov_id === prov_id){
                    selectProvincia.innerHTML += `<option selected value="${listProvincias.prov_id}">${listProvincias.nombre_prov}</option>`
                }else{
                    selectProvincia.innerHTML += `<option value="${listProvincias.prov_id}">${listProvincias.nombre_prov}</option>`
                }
            })
            choiceProvincia = new Choices(selectProvincia);
        })

    await fetch(`/api/distritos/${dpto_id}/${prov_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listDistritos => {
                if (listDistritos.dist_id === dist_id){
                    selectDistrito.innerHTML += `<option selected value="${listDistritos.dist_id}">${listDistritos.nombre_dist}</option>`
                }else{
                    selectDistrito.innerHTML += `<option value="${listDistritos.dist_id}">${listDistritos.nombre_dist}</option>`
                }
            })
            choiceDistrito = new Choices(selectDistrito);
        })

}

selectCiudad.addEventListener('change', async () => {

    choiceProvincia.destroy()
    choiceDistrito.destroy()

    const dpto_id = selectCiudad.value

    selectProvincia.innerHTML = '';
    selectDistrito.innerHTML = '';

    await fetch(`/api/provincias/${dpto_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listProvincias => {
                selectProvincia.innerHTML += `<option value="${listProvincias.prov_id}">${listProvincias.nombre_prov}</option>`
            })
            choiceProvincia = new Choices(selectProvincia)
        })

    const prov_id = await selectProvincia.value
                
    await fetch(`/api/distritos/${dpto_id}/${prov_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listDistritos => {
                selectDistrito.innerHTML += `<option value="${listDistritos.dist_id}">${listDistritos.nombre_dist}</option>`
            })
            choiceDistrito = new Choices(selectDistrito)
        })

})

selectProvincia.addEventListener('change', async () => {

    choiceDistrito.destroy()

    const dpto_id = selectCiudad.value
    const prov_id = selectProvincia.value

    selectDistrito.innerHTML = ''

    await fetch(`/api/distritos/${dpto_id}/${prov_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listDistritos => {
                selectDistrito.innerHTML += `<option value="${listDistritos.dist_id}">${listDistritos.nombre_dist}</option>`
            })
            choiceDistrito = new Choices(selectDistrito)
        })
})

window.addEventListener('load', () => {

    if(dpto_id != null){
        listUbicacionToUpdate()
    }else{
        listUbicacion()
    }
    
})
