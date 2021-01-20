let selectBRG = document.querySelector('#brg')
let selectTension = document.querySelector('#tension')

function cargarListaSEIN() {

    selectBRG.innerHTML = ''
    selectBRG.innerHTML = `<option disabled selected>Seleccionar</option>`

    fetch('/api/sein')
        .then(res => res.json())
        .then(data => {
            data.forEach(listSEIN => {
                selectBRG.innerHTML += `<option value="${listSEIN.nombre}">${listSEIN.nombre}</option>`
            })
        })
}

cargarListaSEIN()

selectBRG.addEventListener('change', () => {

    const indexBRG = selectBRG.options[selectBRG.selectedIndex].index - 1
    
    selectTension.innerHTML = '';

    fetch('/api/sein')
        .then(res => res.json())
        .then(data => {
            data[indexBRG].tension.forEach(listTension => {
                selectTension.innerHTML += `<option value="${listTension.valor}">${listTension.valor} kv</option>`
            })
        })

})