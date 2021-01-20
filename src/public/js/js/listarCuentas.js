const selectEmpresa = document.querySelector('#empresa')
const cuenta_id = document.querySelector('#idEmpresa')

async function listCuenta() {

    selectEmpresa.innerHTML = ''

    await fetch('/api/cuentas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listCuentas => {
                selectEmpresa.innerHTML += `<option value="${listCuentas.cuenta_id}">${listCuentas.razon_social}</option>`
            })
            new Choices(selectEmpresa)
        })

}

async function listCuentaToUpdate() {
    let cuenta_id = document.querySelector('#idEmpresa').value
    
    await fetch('/api/cuentas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listCuentas => {
                if (listCuentas.cuenta_id == cuenta_id){
                    selectEmpresa.innerHTML += `<option selected value="${listCuentas.cuenta_id}">${listCuentas.razon_social}</option>`
                }else{
                    selectEmpresa.innerHTML += `<option value="${listCuentas.cuenta_id}">${listCuentas.razon_social}</option>`
                }
            })
            new Choices(selectEmpresa)
        })
}


window.addEventListener('load', () => {

    if(cuenta_id != null){
        listCuentaToUpdate()
    }else{
        listCuenta()
    }
    
})