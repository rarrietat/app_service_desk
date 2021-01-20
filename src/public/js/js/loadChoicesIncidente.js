const selectEmpresa = document.querySelector('#empresa')
const selectContacto = document.querySelector('#contacto')
const selectMedioContacto = document.querySelector('#medioContacto')
const selectContrDisponible = document.querySelector('#contrDisponible')
const divContratoHoras = document.querySelector('#divContratoHoras')
const divContratoCare = document.querySelector('#divContratoCare')
const divTipoSoporte = document.querySelector('#tipoSoporte')
const divHrContratadas = document.querySelector('#hrContratadas')
const divHrDisponibles = document.querySelector('#hrDisponibles')
const divserviciosCare = document.querySelector('#serviciosCare')
const divTipoCare = document.querySelector('#tipoCare')
const divSinContrato = document.querySelector('#divSinContrato')

const horasDisponibles = document.querySelector('#horasDisponibles')
const tiempoIncidente = document.querySelector('#tiempoIncidente')

const fechaInicio = document.querySelector('#fechaInicio')
const fechaFin = document.querySelector('#fechaFin')
const horaInicio = document.querySelector('#hrInicio')
const horaFin = document.querySelector('#hrFin')

let cuenta_id = document.querySelector('#idEmpresa')

let choiceEmpresa = ''
let choiceContacto = ''
let choiceContrDisponible = ''

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

    await fetch(`/api/contratos_cuenta/${cuenta_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(async listContratos => {
                selectContrDisponible.innerHTML += `<option value="${listContratos.contrato_id}">${listContratos.nro_contrato} | ${listContratos.contrato}</option>`
            })
            choiceContrDisponible = new Choices(selectContrDisponible)
        })

    await fetch('/api/medio_contacto')
        .then(res => res.json())
        .then(data => {
            data.forEach(listMedioContacto => {
                selectMedioContacto.innerHTML += `<option value="${listMedioContacto.mediocont_id}">${listMedioContacto.medio_contacto}</option>`
            })
            new Choices(selectMedioContacto);
        })

    const contrato_id = selectContrDisponible.value

    if (contrato_id === '') {

        divContratoCare.className = 'd-none'
        divContratoHoras.className = 'd-none'
        divSinContrato.classList.remove('d-none')
        divSinContrato.className = 'col-lg-7 col-sm-12'

    } else {

        await fetch(`/api/contratos/${contrato_id}`)
            .then(res => res.json())
            .then(async data => {
                if (data[0].tipocont_id == 1) {

                    divContratoCare.className = 'd-none'
                    divSinContrato.className = 'd-none'

                    await fetch(`/api/contratos_horas/${contrato_id}`)
                        .then(res => res.json())
                        .then(data => {
                            divTipoSoporte.innerHTML = data[0].soporte
                            divHrContratadas.innerHTML = data[0].horas + ' horas'
                            divHrDisponibles.innerHTML = data[0].horas_disponibles + ' horas'
                            horasDisponibles.value = data[0].horas_disponibles
                        })

                } else {

                    divContratoHoras.className = 'd-none'
                    divSinContrato.className = 'd-none'

                    await fetch(`/api/contratos_care/${contrato_id}`)
                        .then(res => res.json())
                        .then(data => {

                            let s1 = ''
                            let s2 = ''
                            let s3 = ''
                            if (data[0].health_assure == 1) {
                                s1 = 'Health Assure'
                            }
                            if (data[0].smart_operate == 1) {
                                s2 = 'Smart Operate'
                            }
                            if (data[0].custom_onsite == 1) {
                                s3 = 'Custom Onsite'
                            }

                            if (data[0].tipocare_id == 1) {
                                divTipoCare.innerHTML = `<span class="badge badge-lg bg-light text-dark">${data[0].care}</span>`
                            }
                            if (data[0].tipocare_id == 2) {
                                divTipoCare.innerHTML = `<span class="badge badge-lg bg-secondary text-dark">${data[0].care}</span>`
                            }
                            if (data[0].tipocare_id == 3) {
                                divTipoCare.innerHTML = `<span class="badge badge-lg bg-info">${data[0].care}</span>`
                            }
                            if (data[0].tipocare_id == 4) {
                                divTipoCare.innerHTML = `<span class="badge badge-lg bg-dark">${data[0].care}</span>`
                            }



                            divserviciosCare.innerHTML = `<span class="badge badge-lg bg-light text-dark">${s1}</span>
                                                    <span class="badge badge-lg bg-light text-dark">${s2}</span>
                                                    <span class="badge badge-lg bg-light text-dark">${s3}</span>`

                        })
                }
            })

    }


    const fi = fechaInicio.value
    const ff = fechaFin.value
    const hi = horaInicio.value
    const hf = horaFin.value

    const tiempoSoporte = difHoras(fi, ff, hi, hf)

    document.querySelector('#difHoras').innerHTML = tiempoSoporte
    document.querySelector('#tiempoIncidente').value = tiempoSoporte

}

async function loadSelectChoicesToUpdate() {
    const cuenta_id = document.querySelector('#idEmpresa').value
    const contacto_id = document.querySelector('#idContacto').value
    const mediocont_id = document.querySelector('#idMedioContacto').value
    const contrato_id = document.querySelector('#idContrato').value

    await fetch('/api/cuentas')
        .then(res => res.json())
        .then(data => {
            data.forEach(listCuentas => {
                // if (listCuentas.cuenta_id == cuenta_id) {
                //     selectEmpresa.innerHTML += `<option selected value="${listCuentas.cuenta_id}">${listCuentas.razon_social}</option>`
                // } else {
                //     selectEmpresa.innerHTML += `<option value="${listCuentas.cuenta_id}">${listCuentas.razon_social}</option>`
                // }
                if (listCuentas.cuenta_id == cuenta_id) {
                    selectEmpresa.value = listCuentas.razon_social
                }
            })
            //new Choices(selectEmpresa);
        })

    await fetch(`/api/contactos/${cuenta_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listContactos => {
                if (listContactos.contacto_id == contacto_id) {
                    selectContacto.innerHTML += `<option selected value="${listContactos.contacto_id}">${listContactos.nombre_contacto} ${listContactos.apellido_contacto}</option>`
                } else {
                    selectContacto.innerHTML += `<option value="${listContactos.contacto_id}">${listContactos.nombre_contacto} ${listContactos.apellido_contacto}</option>`
                }
            })
            choiceContacto = new Choices(selectContacto);
        })

    await fetch('/api/medio_contacto')

        .then(res => res.json())
        .then(data => {
            data.forEach(listMedioContacto => {
                if (listMedioContacto.mediocont_id == mediocont_id) {
                    selectMedioContacto.innerHTML += `<option selected value="${listMedioContacto.mediocont_id}">${listMedioContacto.medio_contacto}</option>`
                } else {
                    selectMedioContacto.innerHTML += `<option value="${listMedioContacto.mediocont_id}">${listMedioContacto.medio_contacto}</option>`
                }
            })
            new Choices(selectMedioContacto);
        })


    await fetch(`/api/contratos_cuenta/${cuenta_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(async listContratos => {
                // if(listContratos.contrato_id == contrato_id){
                //     selectContrDisponible.innerHTML += `<option selected value="${listContratos.contrato_id}">${listContratos.nro_contrato} | ${listContratos.contrato}</option>`
                // }else{
                //     selectContrDisponible.innerHTML += `<option value="${listContratos.contrato_id}">${listContratos.nro_contrato} | ${listContratos.contrato}</option>`
                // }
                if (listContratos.contrato_id == contrato_id) {
                    selectContrDisponible.value = `${listContratos.nro_contrato} | ${listContratos.contrato}`
                }
            })
            //choiceContrDisponible = new Choices(selectContrDisponible)
        })


    await fetch(`/api/contratos/${contrato_id}`)
        .then(res => res.json())
        .then(async data => {

            if (data[0].tipocont_id == 1) {

                divContratoCare.className = 'd-none'
                divSinContrato.className = 'd-none'

                await fetch(`/api/contratos_horas/${contrato_id}`)
                    .then(res => res.json())
                    .then(data => {
                        divTipoSoporte.innerHTML = data[0].soporte
                        divHrContratadas.innerHTML = data[0].horas + ' horas'
                        divHrDisponibles.innerHTML = data[0].horas_disponibles + ' horas'
                        horasDisponibles.value = data[0].horas_disponibles
                    })

            } else {

                divContratoHoras.className = 'd-none'
                divSinContrato.className = 'd-none'

                await fetch(`/api/contratos_care/${contrato_id}`)
                    .then(res => res.json())
                    .then(data => {

                        let s1 = ''
                        let s2 = ''
                        let s3 = ''
                        if (data[0].health_assure == 1) {
                            s1 = 'Health Assure'
                        }
                        if (data[0].smart_operate == 1) {
                            s2 = 'Smart Operate'
                        }
                        if (data[0].custom_onsite == 1) {
                            s3 = 'Custom Onsite'
                        }

                        if (data[0].tipocare_id == 1) {
                            divTipoCare.innerHTML = `<span class="badge badge-lg bg-light text-dark">${data[0].care}</span>`
                        }
                        if (data[0].tipocare_id == 2) {
                            divTipoCare.innerHTML = `<span class="badge badge-lg bg-secondary text-dark">${data[0].care}</span>`
                        }
                        if (data[0].tipocare_id == 3) {
                            divTipoCare.innerHTML = `<span class="badge badge-lg bg-info">${data[0].care}</span>`
                        }
                        if (data[0].tipocare_id == 4) {
                            divTipoCare.innerHTML = `<span class="badge badge-lg bg-dark">${data[0].care}</span>`
                        }

                        divserviciosCare.innerHTML = `<span class="badge badge-lg bg-light text-dark">${s1}</span>
                                                    <span class="badge badge-lg bg-light text-dark">${s2}</span>
                                                    <span class="badge badge-lg bg-light text-dark">${s3}</span>`

                    })

            }

        })

    const fi = fechaInicio.value
    const ff = fechaFin.value
    const hi = horaInicio.value
    const hf = horaFin.value
    
    const tiempoSoporte = difHoras(fi, ff, hi, hf)
    
    document.querySelector('#difHoras').innerHTML = tiempoSoporte
    document.querySelector('#tiempoIncidente').value = tiempoSoporte

}


selectEmpresa.addEventListener('change', async () => {

    choiceContacto.destroy()
    choiceContrDisponible.destroy()

    const cuenta_id = await selectEmpresa.value

    selectContacto.innerHTML = ''
    selectContrDisponible.innerHTML = ''

    await fetch(`/api/contactos/${cuenta_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listContactos => {
                selectContacto.innerHTML += `<option value="${listContactos.contacto_id}">${listContactos.nombre_contacto} ${listContactos.apellido_contacto}</option>`
            })
            choiceContacto = new Choices(selectContacto);
        })

    await fetch(`/api/contratos_cuenta/${cuenta_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listContratos => {
                selectContrDisponible.innerHTML += `<option value="${listContratos.contrato_id}">${listContratos.nro_contrato} | ${listContratos.contrato}</option>`
            })
            choiceContrDisponible = new Choices(selectContrDisponible)
        })


    const contrato_id = selectContrDisponible.value


    if (contrato_id === '') {

        divContratoCare.className = 'd-none'
        divContratoHoras.className = 'd-none'
        divSinContrato.classList.remove('d-none')
        divSinContrato.className = 'col-lg-7 col-sm-12'

    } else {

        await fetch(`/api/contratos/${contrato_id}`)
            .then(res => res.json())
            .then(async data => {
                if (data[0].tipocont_id == 1) {
                    divContratoCare.className = 'd-none'
                    divSinContrato.className = 'd-none'
                    divContratoHoras.classList.remove('d-none')
                    divContratoHoras.className = 'col-lg-7 col-sm-12'

                    await fetch(`/api/contratos_horas/${contrato_id}`)
                        .then(res => res.json())
                        .then(data => {
                            divTipoSoporte.innerHTML = data[0].soporte
                            divHrContratadas.innerHTML = data[0].horas + ' horas'
                            divHrDisponibles.innerHTML = data[0].horas_disponibles + ' horas'
                            horasDisponibles.value = data[0].horas_disponibles
                        })

                } else {

                    divContratoHoras.className = 'd-none'
                    divSinContrato.className = 'd-none'
                    divContratoCare.classList.remove('d-none')
                    divContratoCare.className = 'col-lg-7 col-sm-12'

                    await fetch(`/api/contratos_care/${contrato_id}`)
                        .then(res => res.json())
                        .then(data => {
                            let s1 = ''
                            let s2 = ''
                            let s3 = ''
                            if (data[0].health_assure == 1) {
                                s1 = 'Health Assure'
                            }
                            if (data[0].smart_operate == 1) {
                                s2 = 'Smart Operate'
                            }
                            if (data[0].custom_onsite == 1) {
                                s3 = 'Custom Onsite'
                            }

                            if (data[0].tipocare_id == 1) {
                                divTipoCare.innerHTML = `<span class="badge badge-lg bg-light text-dark">${data[0].care}</span>`
                            }
                            if (data[0].tipocare_id == 2) {
                                divTipoCare.innerHTML = `<span class="badge badge-lg bg-secondary text-dark">${data[0].care}</span>`
                            }
                            if (data[0].tipocare_id == 3) {
                                divTipoCare.innerHTML = `<span class="badge badge-lg bg-info">${data[0].care}</span>`
                            }
                            if (data[0].tipocare_id == 4) {
                                divTipoCare.innerHTML = `<span class="badge badge-lg bg-dark">${data[0].care}</span>`
                            }

                            divserviciosCare.innerHTML = `<span class="badge badge-lg bg-light text-dark">${s1}</span>
                                                            <span class="badge badge-lg bg-light text-dark">${s2}</span>
                                                            <span class="badge badge-lg bg-light text-dark">${s3}</span>`

                        })
                }
            })

    }


})


selectContrDisponible.addEventListener('change', async () => {

    const contrato_id = selectContrDisponible.value

    await fetch(`/api/contratos/${contrato_id}`)
        .then(res => res.json())
        .then(async data => {
            if (data[0].tipocont_id == 1) {
                divContratoCare.className = 'd-none'
                divSinContrato.className = 'd-none'
                divContratoHoras.classList.remove('d-none')
                divContratoHoras.className = 'col-lg-7 col-sm-12'

                await fetch(`/api/contratos_horas/${contrato_id}`)
                    .then(res => res.json())
                    .then(data => {
                        divTipoSoporte.innerHTML = data[0].soporte
                        divHrContratadas.innerHTML = data[0].horas + ' horas'
                        divHrDisponibles.innerHTML = data[0].horas_disponibles + ' horas'
                        horasDisponibles.value = data[0].horas_disponibles
                    })

            } else {
                divContratoHoras.className = 'd-none'
                divSinContrato.className = 'd-none'
                divContratoCare.classList.remove('d-none')
                divContratoCare.className = 'col-lg-7 col-sm-12'

                await fetch(`/api/contratos_care/${contrato_id}`)
                    .then(res => res.json())
                    .then(data => {
                        let s1 = ''
                        let s2 = ''
                        let s3 = ''
                        if (data[0].health_assure == 1) {
                            s1 = 'Health Assure'
                        }
                        if (data[0].smart_operate == 1) {
                            s2 = 'Smart Operate'
                        }
                        if (data[0].custom_onsite == 1) {
                            s3 = 'Custom Onsite'
                        }

                        if (data[0].tipocare_id == 1) {
                            divTipoCare.innerHTML = `<span class="badge badge-lg bg-light text-dark">${data[0].care}</span>`
                        }
                        if (data[0].tipocare_id == 2) {
                            divTipoCare.innerHTML = `<span class="badge badge-lg bg-secondary text-dark">${data[0].care}</span>`
                        }
                        if (data[0].tipocare_id == 3) {
                            divTipoCare.innerHTML = `<span class="badge badge-lg bg-info">${data[0].care}</span>`
                        }
                        if (data[0].tipocare_id == 4) {
                            divTipoCare.innerHTML = `<span class="badge badge-lg bg-dark">${data[0].care}</span>`
                        }

                        divserviciosCare.innerHTML = `<span class="badge badge-lg bg-light text-dark">${s1}</span>
                                                        <span class="badge badge-lg bg-light text-dark">${s2}</span>
                                                        <span class="badge badge-lg bg-light text-dark">${s3}</span>`

                    })
            }
        })

})


function difHoras(fi, ff, hi, hf) {

    const partsFecIni = fi.split('/')
    const partsFecFin = ff.split('/')
    const fec_ini_inc = `${partsFecIni[2]}-${partsFecIni[1]}-${partsFecIni[0]}`
    const fec_fin_inc = `${partsFecFin[2]}-${partsFecFin[1]}-${partsFecFin[0]}`
    const fec_inicio = dayjs(fec_ini_inc).format('YYYY-MM-DD')
    const fec_fin = dayjs(fec_fin_inc).format('YYYY-MM-DD')
    const hr_inicio = hi
    const hr_fin = hf

    const inicio = dayjs(`${fec_inicio}${hr_inicio}`)
    const fin = dayjs(`${fec_fin}${hr_fin}`)

    const mins = fin.diff(inicio, "minutes", true)
    const totalHours = parseInt(mins / 60)
    const totalMins = dayjs().minute(mins).$m

    const tiempoSoporte = ("0" + Math.floor(totalHours)).slice(-2) + ':' + ("0" + totalMins).slice(-2)

    return tiempoSoporte

}

fechaInicio.addEventListener('changeDate', () => {

    const fi = fechaInicio.value
    const ff = fechaFin.value
    const hi = horaInicio.value
    const hf = horaFin.value

    const tiempoSoporte = difHoras(fi, ff, hi, hf)

    document.querySelector('#difHoras').innerHTML = tiempoSoporte
    tiempoIncidente.value = tiempoSoporte

})

fechaFin.addEventListener('changeDate', () => {

    const fi = fechaInicio.value
    const ff = fechaFin.value
    const hi = horaInicio.value
    const hf = horaFin.value

    const tiempoSoporte = difHoras(fi, ff, hi, hf)

    document.querySelector('#difHoras').innerHTML = tiempoSoporte
    tiempoIncidente.value = tiempoSoporte

})

horaInicio.addEventListener('change', () => {

    const fi = fechaInicio.value
    const ff = fechaFin.value
    const hi = horaInicio.value
    const hf = horaFin.value

    const tiempoSoporte = difHoras(fi, ff, hi, hf)

    document.querySelector('#difHoras').innerHTML = tiempoSoporte
    tiempoIncidente.value = tiempoSoporte

})

horaFin.addEventListener('change', () => {

    const fi = fechaInicio.value
    const ff = fechaFin.value
    const hi = horaInicio.value
    const hf = horaFin.value

    const tiempoSoporte = difHoras(fi, ff, hi, hf)

    document.querySelector('#difHoras').innerHTML = tiempoSoporte
    tiempoIncidente.value = tiempoSoporte

})

window.addEventListener('load', () => {

    if (cuenta_id != null) {
        loadSelectChoicesToUpdate()
    } else {
        loadSelectChoices()
    }

})