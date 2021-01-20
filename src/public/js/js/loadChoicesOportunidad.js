const selectEmpresa = document.querySelector('#empresa')
const selectContacto = document.querySelector('#contacto')
const selectOrigen = document.querySelector('#origen')
const selectUserPreventa = document.querySelector('#preventa')
const selectProbabilidad = document.querySelector('#probabilidad')
const selectStatusOp = document.querySelector('#statusOp')
const selectStatusDeal = document.querySelector('#statusDeal')
const selectAMMarca = document.querySelector('#amMarca')
const selectProveedor = document.querySelector('#proveedor')
const selectTecnologia = document.querySelector('#tecnologia')

let cuenta_id = document.querySelector('#idEmpresa')

let choiceEmpresa = ''
let choiceContacto = ''

let choiceAMMarca = ''
let choiceProveedor = ''
let choiceTecnologia = ''

async function loadSelectChoices() {

    await fetch('/api/cuentas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listCuentas => {
                selectEmpresa.innerHTML += `<option value="${listCuentas.cuenta_id}">${listCuentas.razon_social}</option>`
            })
            new Choices(selectEmpresa);
        })

    const cuenta_id = await selectEmpresa.value

    await fetch(`/api/contactos/${cuenta_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listContactos => {
                selectContacto.innerHTML += `<option value="${listContactos.contacto_id}">${listContactos.nombre_contacto} ${listContactos.apellido_contacto}</option>`
            })
            choiceContacto = new Choices(selectContacto);
        })

    await fetch('/api/origen_leads')
        .then(res => res.json())
        .then(data => {
            data.forEach(listOrigenLeads => {
                selectOrigen.innerHTML += `<option value="${listOrigenLeads.origenle_id}">${listOrigenLeads.origen}</option>`
            })
            new Choices(selectOrigen);
        })

    await fetch('/api/user_preventa')
        .then(res => res.json())
        .then(data => {
            data.forEach(listUserPreventa => {
                selectUserPreventa.innerHTML += `<option value="${listUserPreventa.usuario_id}">${listUserPreventa.nombre} ${listUserPreventa.apellido}</option>`
            })
            new Choices(selectUserPreventa);
        })

    await fetch('/api/probabilidades')
        .then(res => res.json())
        .then(data => {
            data.forEach(listProbailidades => {
                selectProbabilidad.innerHTML += `<option value="${listProbailidades.prob_id}">${listProbailidades.porcentaje}%</option>`
            })
            new Choices(selectProbabilidad);
        })

    await fetch('/api/status_oportunidad')
        .then(res => res.json())
        .then(data => {
            data.forEach(listStatusOp => {
                selectStatusOp.innerHTML += `<option value="${listStatusOp.statusop_id}">${listStatusOp.status_opor}</option>`
            })
            new Choices(selectStatusOp);
        })

    await fetch('/api/status_deals')
        .then(res => res.json())
        .then(data => {
            data.forEach(listStatusDeals => {
                selectStatusDeal.innerHTML += `<option value="${listStatusDeals.statusde_id}">${listStatusDeals.status_deal}</option>`
            })
            new Choices(selectStatusDeal);
        })

    await fetch('/api/am_marcas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listAMMarca => {
                selectAMMarca.innerHTML += `<option value="${listAMMarca.ammarca_id}">${listAMMarca.nombre_ammarca} ${listAMMarca.apellido_ammarca} | ${listAMMarca.marca}</option>`
            })
            choiceAMMarca = new Choices(selectAMMarca, {
                silent: false,
                removeItemButton: true,
                position: 'bottom',
            })
        })

    await fetch('/api/proveedores')
        .then(res => res.json())
        .then(data => {
            data.forEach(listProveedores => {
                selectProveedor.innerHTML += `<option value="${listProveedores.proveedor_id}">${listProveedores.proveedor}</option>`
            })
            choiceProveedor = new Choices(selectProveedor, {
                silent: false,
                removeItemButton: true,
                position: 'bottom',
            })
        })

    await fetch('/api/tecnologias')
        .then(res => res.json())
        .then(data => {
            data.forEach(listTecnologias => {
                selectTecnologia.innerHTML += `<option value="${listTecnologias.tecnologia_id}">${listTecnologias.tecnologia} | ${listTecnologias.marca}</option>`
            })
            choiceTecnologia = new Choices(selectTecnologia, {
                silent: false,
                removeItemButton: true,
                position: 'bottom',
            })
        })

}

async function loadSelectChoicesToUpdate() {
    const cuenta_id = document.querySelector('#idEmpresa').value
    const contacto_id = document.querySelector('#idContacto').value
    const origenle_id = document.querySelector('#idOrigen').value
    const usuario_id = document.querySelector('#idPreventa').value
    const prob_id = document.querySelector('#idProbabilidad').value
    const statusop_id = document.querySelector('#idStatusOp').value
    const statusde_id = document.querySelector('#idEstatusDeal').value
    const oporammarca_id = document.querySelector('#idAMMarca').value.split(",")
    const oporproveedor_id = document.querySelector('#idProveedor').value.split(",")
    const oportec_id = document.querySelector('#idTecnologia').value.split(",")

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

    await fetch(`/api/contactos/${cuenta_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listContactos => {
                if (listContactos.contacto_id == contacto_id){
                    selectContacto.innerHTML += `<option selected value="${listContactos.contacto_id}">${listContactos.nombre_contacto} ${listContactos.apellido_contacto}</option>`
                }else{
                    selectContacto.innerHTML += `<option value="${listContactos.contacto_id}">${listContactos.nombre_contacto} ${listContactos.apellido_contacto}</option>`
                }
            })
            choiceContacto = new Choices(selectContacto);
        })

    await fetch('/api/origen_leads')
        .then(res => res.json())
        .then(data => {
            data.forEach(listOrigenLeads => {
                if (listOrigenLeads.origenle_id == origenle_id){
                    selectOrigen.innerHTML += `<option selected value="${listOrigenLeads.origenle_id}">${listOrigenLeads.origen}</option>`
                }else{
                    selectOrigen.innerHTML += `<option value="${listOrigenLeads.origenle_id}">${listOrigenLeads.origen}</option>`
                }
            })
            new Choices(selectOrigen);
        })

    await fetch('/api/user_preventa')
        .then(res => res.json())
        .then(data => {
            data.forEach(listUserPreventa => {
                if (listUserPreventa.usuario_id == usuario_id){
                    selectUserPreventa.innerHTML += `<option selected value="${listUserPreventa.usuario_id}">${listUserPreventa.nombre} ${listUserPreventa.apellido}</option>`
                }else{
                    selectUserPreventa.innerHTML += `<option value="${listUserPreventa.usuario_id}">${listUserPreventa.nombre} ${listUserPreventa.apellido}</option>`
                }
            })
            new Choices(selectUserPreventa);
        })

    await fetch('/api/probabilidades')
        .then(res => res.json())
        .then(data => {
            data.forEach(listProbailidades => {
                if (listProbailidades.prob_id == prob_id){
                    selectProbabilidad.innerHTML += `<option selected value="${listProbailidades.prob_id}">${listProbailidades.porcentaje}%</option>`
                }else{
                    selectProbabilidad.innerHTML += `<option value="${listProbailidades.prob_id}">${listProbailidades.porcentaje}%</option>`
                }
            })
            new Choices(selectProbabilidad);
        })

    await fetch('/api/status_oportunidad')
        .then(res => res.json())
        .then(data => {
            data.forEach(listStatusOp => {
                if (listStatusOp.statusop_id == statusop_id){
                    selectStatusOp.innerHTML += `<option selected value="${listStatusOp.statusop_id}">${listStatusOp.status_opor}</option>`
                }else{
                    selectStatusOp.innerHTML += `<option value="${listStatusOp.statusop_id}">${listStatusOp.status_opor}</option>`
                }
            })
            new Choices(selectStatusOp);
        })

    await fetch('/api/status_deals')
        .then(res => res.json())
        .then(data => {
            data.forEach(listStatusDeals => {
                if (listStatusDeals.statusde_id == statusde_id){
                    selectStatusDeal.innerHTML += `<option selected value="${listStatusDeals.statusde_id}">${listStatusDeals.status_deal}</option>`
                }else{
                    selectStatusDeal.innerHTML += `<option value="${listStatusDeals.statusde_id}">${listStatusDeals.status_deal}</option>`
                }
            })
            new Choices(selectStatusDeal);
        })

    await fetch('/api/am_marcas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listAMMarca => {
                selectAMMarca.innerHTML += `<option value="${listAMMarca.ammarca_id}">${listAMMarca.nombre_ammarca} ${listAMMarca.apellido_ammarca} | ${listAMMarca.marca}</option>`
            })
            choiceAMMarca = new Choices(selectAMMarca, {
                silent: false,
                removeItemButton: true,
                position: 'bottom',
            })
            choiceAMMarca.setChoiceByValue(oporammarca_id)
        })

    await fetch('/api/proveedores')
        .then(res => res.json())
        .then(data => {
            data.forEach(listProveedores => {
                selectProveedor.innerHTML += `<option value="${listProveedores.proveedor_id}">${listProveedores.proveedor}</option>`
            })
            choiceProveedor = new Choices(selectProveedor, {
                silent: false,
                removeItemButton: true,
                position: 'bottom',
            })
            choiceProveedor.setChoiceByValue(oporproveedor_id)
        })

    await fetch('/api/tecnologias')
        .then(res => res.json())
        .then(data => {
            data.forEach(listTecnologias => {
                selectTecnologia.innerHTML += `<option value="${listTecnologias.tecnologia_id}">${listTecnologias.tecnologia} | ${listTecnologias.marca}</option>`
            })
            choiceTecnologia = new Choices(selectTecnologia, {
                silent: false,
                removeItemButton: true,
                position: 'bottom',
            })
            choiceTecnologia.setChoiceByValue(oportec_id)
        })

}

selectEmpresa.addEventListener('change', async () => {

    choiceContacto.destroy()

    const cuenta_id = await selectEmpresa.value

    selectContacto.innerHTML = ''

    await fetch(`/api/contactos/${cuenta_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listContactos => {
                selectContacto.innerHTML += `<option value="${listContactos.contacto_id}">${listContactos.nombre_contacto} ${listContactos.apellido_contacto}</option>`
            })
            choiceContacto = new Choices(selectContacto);
        })

})

window.addEventListener('load', () => {

    if(cuenta_id != null){
        loadSelectChoicesToUpdate()
    }else{
        loadSelectChoices()
    }

})