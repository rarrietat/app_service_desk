async function btnModalOportunidad(opor_id) {

    const idOpor = document.querySelector('#modalIdOpor')
    const nroOpor = document.querySelector('#modalOporNroOpor')
    const empresa = document.querySelector('#modalOporEmpresa')
    const contacto = document.querySelector('#modalOporContacto')
    const fecInicio = document.querySelector('#modalOporFecInicio')
    const fecFin = document.querySelector('#modalOporFecFin')
    const origen = document.querySelector('#modalOporOrigen')
    const precioEstimado = document.querySelector('#modalOporPrecio')
    const deal = document.querySelector('#modalOporDeal')
    const statusDeal = document.querySelector('#modalOporStatusDeal')
    const statusOp = document.querySelector('#modalOporStatusOp')
    const userPreventa = document.querySelector('#modalOporUserPreventa')
    const probabilidad = document.querySelector('#modalOporProbabilidad')
    const desc = document.querySelector('#modalOporDesc')
    const modalBtnEditOpor = document.querySelector('#modalBtnEditOpor')

    idOpor.value = opor_id

    await fetch('/api/oportunidades/'+opor_id)
        .then(res => res.json())
        .then(data => {
            data.forEach(async listOpor => {
                nroOpor.innerHTML = 'Oportunidad nro. '+listOpor.nro_opor
                fecInicio.innerHTML = listOpor.fec_creacion_opor
                fecFin.innerHTML = listOpor.fec_cierre_opor
                desc.innerHTML = listOpor.descripcion
                precioEstimado.innerHTML = listOpor.precio_estimado

                await fetch('/api/cuenta/'+listOpor.cuenta_id)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listCuenta => {
                            empresa.innerHTML = listCuenta.razon_social
                        })
                    })

                await fetch('/api/contacto/'+listOpor.contacto_id)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listContacto => {
                            contacto.innerHTML = listContacto.nombre_contacto + ' ' + listContacto.apellido_contacto
                        })
                    })

                await fetch('/api/origen_lead/'+listOpor.origenle_id)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listOrigen => {
                            origen.innerHTML = listOrigen.origen
                        })
                    })

                await fetch('/api/deal/'+listOpor.opor_id)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listDeal => {
                            deal.innerHTML = listDeal.nro_deal_id
                            statusDeal.innerHTML = listDeal.status_deal
                        })
                    })
                    
                await fetch('/api/status_oportunidad/'+listOpor.statusop_id)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listStatusOp => {
                            statusOp.innerHTML = listStatusOp.status_opor
                        })
                    })

                await fetch('/api/usuario/'+listOpor.user_preventa)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listUser => {
                            userPreventa.innerHTML = listUser.nombre + ' ' + listUser.apellido
                        })
                    })

                await fetch('/api/probabilidad/'+listOpor.prob_id)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listProb => {
                            probabilidad.innerHTML = listProb.porcentaje +'%'
                        })
                    })
            })
        })

    modalBtnEditOpor.href = '/oportunidad/edit/'+opor_id
    modalBtnAddAct.href = '/actividad/add/'+opor_id

}

function btnModalActividad(actividad_id) {

    const formAction = document.querySelector('#modalFormAct')
    formAction.action = `/actividad/editStatus/${actividad_id}?_method=PUT`
    
}

function btnModalAgregarContacto() {

    const cuenta_id = document.querySelector('#empresa').value
    document.querySelector('#modalAddContacEmpresa').value = cuenta_id

}