const selectEmpresa = document.querySelector('#empresa')
const selectTipoContrato = document.querySelector('#tipoContrato')
const selectTipoSoporte = document.querySelector('#tipoSoporte')
const selectTipoCare = document.querySelector('#tipoCare')

const divContratoHoras = document.querySelector('#divContratoHoras')
const divContratoCare = document.querySelector('#divContratoCare')

const health_assure = document.querySelector('#health_assure')
const smart_operate = document.querySelector('#smart_operate')
const custom_onsite = document.querySelector('#custom_onsite')

let cuenta_id = document.querySelector('#idEmpresa')

let choiceTipoCare = ''
let choiceTipoSoporte = ''

async function loadSelectCheckbox() {

    await fetch('/api/cuentas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listCuentas => {
                selectEmpresa.innerHTML += `<option value="${listCuentas.cuenta_id}">${listCuentas.razon_social}</option>`
            })
            new Choices(selectEmpresa);
        })

    await fetch(`/api/tipo_contratos`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoContrato => {
                selectTipoContrato.innerHTML += `<option value="${listTipoContrato.tipocont_id}">${listTipoContrato.contrato}</option>`
            })
            new Choices(selectTipoContrato);
        })

    // await fetch(`/api/tipo_care`)
    //     .then(res => res.json())
    //     .then(data => {
    //         data.forEach(listTipoCare => {
    //             selectTipoCare.innerHTML += `<option value="${listTipoCare.tipocare_id}">${listTipoCare.care}</option>`
    //         })
    //         new Choices(selectTipoCare);
    //     })

    await fetch(`/api/tipo_soporte`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoSoporte => {
                selectTipoSoporte.innerHTML += `<option value="${listTipoSoporte.tiposop_id}">${listTipoSoporte.soporte}</option>`
            })
            choiceTipoSoporte = new Choices(selectTipoSoporte);
        })

}

async function loadSelectCheckboxToUpdate() {
    const cuenta_id = document.querySelector('#idEmpresa').value
    const tipocont_id = document.querySelector('#idTipoContrato').value
    const tiposop_id = document.querySelector('#idTipoSoporte').value
    const tipocare_id = document.querySelector('#idTipoCare').value
    const contcare_id = document.querySelector('#idContratoCare').value

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
            new Choices(selectEmpresa);
        })

    await fetch(`/api/tipo_contratos`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoContrato => {
                if (listTipoContrato.tipocont_id == tipocont_id){
                    selectTipoContrato.innerHTML += `<option selected value="${listTipoContrato.tipocont_id}">${listTipoContrato.contrato}</option>`
                }else{
                    selectTipoContrato.innerHTML += `<option value="${listTipoContrato.tipocont_id}">${listTipoContrato.contrato}</option>`
                }
            })
            new Choices(selectTipoContrato);
        })

    if(tipocont_id == 2){
        divContratoHoras.className = 'd-none'
        divContratoCare.classList.remove('d-none')

        await fetch(`/api/tipo_care`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoCare => {
                if (listTipoCare.tipocare_id == tipocare_id){
                    selectTipoCare.innerHTML += `<option selected value="${listTipoCare.tipocare_id}">${listTipoCare.care}</option>`
                }else{
                    selectTipoCare.innerHTML += `<option value="${listTipoCare.tipocare_id}">${listTipoCare.care}</option>`
                }
                
            })
            choiceTipoCare = new Choices(selectTipoCare);
        })

        await fetch(`/api/care_servicios/${contcare_id}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(listCareServicios => {

                    if (listCareServicios.health_assure === 1){
                        health_assure.checked = true
                        smart_operate.disabled = false
                    }

                    if (listCareServicios.smart_operate === 1){
                        smart_operate.checked = true
                        smart_operate.disabled = false
                    }

                    if (listCareServicios.custom_onsite === 1){
                        custom_onsite.checked = true
                    }
                    
                })
            })

        if(health_assure.checked === true){
            health_assure.value = 1
        }else{
            health_assure.value = 0
        }

        if(smart_operate.checked === true){
            smart_operate.value = 1
        }else{
            smart_operate.value = 0
        }

        if(custom_onsite.checked === true){
            custom_onsite.value = 1
        }else{
            custom_onsite.value = 0
        }
    
            
    }else{
        divContratoCare.className = 'd-none'
        divContratoHoras.classList.remove('d-none')

        await fetch(`/api/tipo_soporte`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoSoporte => {
                if (listTipoSoporte.tiposop_id == tiposop_id){
                    selectTipoSoporte.innerHTML += `<option selected value="${listTipoSoporte.tiposop_id}">${listTipoSoporte.soporte}</option>`
                }else{
                    selectTipoSoporte.innerHTML += `<option value="${listTipoSoporte.tiposop_id}">${listTipoSoporte.soporte}</option>`
                }
            })
            choiceTipoSoporte = new Choices(selectTipoSoporte);
        })
    }
}

selectTipoContrato.addEventListener('change', async () => {

    const tipocont_id = selectTipoContrato.value

    if(tipocont_id == 2){

        choiceTipoSoporte.destroy()
        selectTipoSoporte.innerHTML = ''

        divContratoHoras.className = 'd-none'
        divContratoCare.classList.remove('d-none')

        await fetch(`/api/tipo_care`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoCare => {
                selectTipoCare.innerHTML += `<option value="${listTipoCare.tipocare_id}">${listTipoCare.care}</option>`
            })
            choiceTipoCare = new Choices(selectTipoCare);
        })

    }else{

        choiceTipoCare.destroy()
        selectTipoCare.innerHTML = ''

        divContratoCare.className = 'd-none'
        divContratoHoras.classList.remove('d-none')

        await fetch(`/api/tipo_soporte`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTipoSoporte => {
                selectTipoSoporte.innerHTML += `<option value="${listTipoSoporte.tiposop_id}">${listTipoSoporte.soporte}</option>`
            })
            choiceTipoSoporte = new Choices(selectTipoSoporte);
        })
    }

})


health_assure.addEventListener('change', () => {

    if(health_assure.checked === true){
        health_assure.value = 1
        smart_operate.disabled = false
    }else{
        health_assure.value = 0
        smart_operate.checked = false
        smart_operate.disabled = true
    }

})

smart_operate.addEventListener('change', () => {

    if(smart_operate.checked === true){
        smart_operate.value = 1
    }else{
        smart_operate.value = 0
    }

})

custom_onsite.addEventListener('change', () => {

    if(custom_onsite.checked === true){
        custom_onsite.value = 1
    }else{
        custom_onsite.value = 0
    }

})

window.addEventListener('load', () => {

    if(cuenta_id != null){
        loadSelectCheckboxToUpdate()
        
    }else{
        loadSelectCheckbox()
    }

})