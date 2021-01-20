const selectMarca = document.querySelector('#marca_id')
const marca_id = document.querySelector('#idMarca')

async function loadChoiceMarca() {

    await fetch('/api/marcas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listMarcas => {
                selectMarca.innerHTML += `<option value="${listMarcas.marca_id}">${listMarcas.marca}</option>`
            })
            new Choices(selectMarca)
        })

}

async function loadChoiceMarcaToUpdate() {
    const marca_id = document.querySelector('#idMarca').value
    
    await fetch('/api/marcas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listMarcas => {
                if (listMarcas.marca_id == marca_id){
                    selectMarca.innerHTML += `<option selected value="${listMarcas.marca_id}">${listMarcas.marca}</option>`
                }else{
                    selectMarca.innerHTML += `<option value="${listMarcas.marca_id}">${listMarcas.marca}</option>`
                }
            })
            new Choices(selectMarca)
        })
}


window.addEventListener('load', () => {

    if(marca_id != null){
        loadChoiceMarcaToUpdate()
    }else{
        loadChoiceMarca()
    }

})
