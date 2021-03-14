const selectRegistroTiempo = document.querySelector('#registro_tiempo')
const selectDiagnostico = document.querySelector('#diag_correcto')
const selectDespacho = document.querySelector('#despacho_correcto')
const selectGrupoAsig = document.querySelector('#grupo_asignado')
const selectUsuarioAsig = document.querySelector('#usuario_asignado')
const selectAsesor = document.querySelector('#asesor')

const divAsesor = document.querySelector('.divAsesor')
const divDiag = document.querySelector('#hito1_descripcion')
const divDespacho = document.querySelector('.divDespacho')

const hito1_id = document.querySelector('#idHito1').value

let choiceUsuarioAsig = ''

async function loadChoiceHito1() {

    await fetch(`/api/asesores`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listAsesor => {
                selectAsesor.innerHTML += `<option value="${listAsesor._id}">${listAsesor.alias} | ${listAsesor.nombre} ${listAsesor.apellido}</option>`
            })
            new Choices(selectAsesor, {position: 'bottom'})
        })

    selectAsesor.disabled = true

    await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectGrupoAsig.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            new Choices(selectGrupoAsig, {position: 'bottom'})
        })
    
    selectGrupoAsig.disabled = true

    const grupo_id = await selectGrupoAsig.value

    await fetch(`/api/usuario_asig/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listUsuarioAsig => {
                selectUsuarioAsig.innerHTML += `<option value="${listUsuarioAsig._id}">${listUsuarioAsig.nombre} ${listUsuarioAsig.apellido}</option>`
            })
            choiceUsuarioAsig = new Choices(selectUsuarioAsig, {position: 'bottom'})
        })
    
    
    selectUsuarioAsig.disabled = true

}

async function loadChoiceHito1ToUpdate() {

    const asesor_id = document.querySelector('#idAsesorHito1').value
    const grupoasig_id = document.querySelector('#idGrupoAsigHito1').value
    const usuarioasig_id = document.querySelector('#idUsuarioAsigHito1').value
    const registro_tiempo_id = document.querySelector('#idRegistroTiempoHito1').value
    const registro_diag_id = document.querySelector('#idRegistroDiagHito1').value
    const despacho_correcto_id = document.querySelector('#idDespachoHito1').value

    await fetch(`/api/asesores`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listAsesor => {
                if(listAsesor._id == asesor_id){
                    selectAsesor.innerHTML += `<option selected value="${listAsesor._id}">${listAsesor.alias} | ${listAsesor.nombre} ${listAsesor.apellido}</option>`
                }else{
                    selectAsesor.innerHTML += `<option value="${listAsesor._id}">${listAsesor.alias} | ${listAsesor.nombre} ${listAsesor.apellido}</option>`   
                }
            })
            new Choices(selectAsesor, {position: 'bottom'})
        })

    if(registro_tiempo_id == 'No'){
        selectRegistroTiempo.value = 'No'
        divAsesor.classList.remove('d-none')
        selectAsesor.disabled = false
    }else{
        selectAsesor.disabled = true
    }
    
    await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                if(listGrupoGics._id == grupoasig_id){
                    selectGrupoAsig.innerHTML += `<option selected value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                }else{
                    selectGrupoAsig.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                }
                
            })
            new Choices(selectGrupoAsig, {position: 'bottom'})
        })

    if(registro_diag_id == 'No'){
        selectDiagnostico.value = 'No'
        divDiag.disabled = false
    }

    const grupo_id = await selectGrupoAsig.value

    await fetch(`/api/usuario_asig/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listUsuarioAsig => {
                if(listUsuarioAsig._id== usuarioasig_id){
                    selectUsuarioAsig.innerHTML += `<option selected value="${listUsuarioAsig._id}">${listUsuarioAsig.nombre} ${listUsuarioAsig.apellido}</option>`
                }else{
                    selectUsuarioAsig.innerHTML += `<option value="${listUsuarioAsig._id}">${listUsuarioAsig.nombre} ${listUsuarioAsig.apellido}</option>`
                }
            })
            choiceUsuarioAsig = new Choices(selectUsuarioAsig, {position: 'bottom'})
        })

    if(despacho_correcto_id == 'No'){
        selectDespacho.value = 'No'
        divDespacho.classList.remove('d-none')
        selectGrupoAsig.disabled = false
        selectUsuarioAsig.disabled = false
    }else{
        selectGrupoAsig.disabled = true
        selectUsuarioAsig.disabled = true
    }

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

selectRegistroTiempo.addEventListener('change', async() => {
    if(selectRegistroTiempo.value == 'No'){
        divAsesor.classList.remove('d-none')
        selectAsesor.disabled = false
    }else{
        selectAsesor.disabled = true
        divAsesor.className = 'd-none'
    }
})

selectDiagnostico.addEventListener('change', async() => {
    if(selectDiagnostico.value == 'No'){
        divDiag.disabled = false
        divDiag.focus()
    }else{
        divDiag.value = ''
        divDiag.disabled = true
    }
})

selectDespacho.addEventListener('change', async() => {
    if(selectDespacho.value == 'No'){
        divDespacho.classList.remove('d-none')
        selectGrupoAsig.disabled = false
        selectUsuarioAsig.disabled = false
    }else{
        divDespacho.className = 'd-none'
        selectGrupoAsig.disabled = true
        selectUsuarioAsig.disabled = true
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
            window.location.reload()
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





// Hito 2
const selectAsignarPersonal = document.querySelector('#asignar_personal_hito2')
const selectInformarMotivo = document.querySelector('#informar_motivo_hito2')
const selectGrupoAsignadoHito2 = document.querySelector('#grupo_asignado_hito2')
const selectGrupoAsignado2Hito2 = document.querySelector('#grupo_asignado2_hito2')
const selectTecnicoHito2 = document.querySelector('#tecnico_hito2')
const selectTecnico2Hito2 = document.querySelector('#tecnico2_hito2')
const inputCelularTecHito2 = document.querySelector('#celular_tecnico_hito2')
const inputCelularTec2Hito2 = document.querySelector('#celular_tecnico2_hito2')
const selectInformarEscalHito2 = document.querySelector('#informar_escalamiento_hito2')
const selectPersonaContacHito2 = document.querySelector('#persona_contacto_hito2')
const selectLogroResultadoHito2 = document.querySelector('#logro_resultado_hito2')

const fechaAtencionHito2 = document.querySelector('#fecha_atencion_hito2')
const horaAtencionHito2 = document.querySelector('#hora_atencion_hito2')
const fechaAtencion2Hito2 = document.querySelector('#fecha_atencion2_hito2')
const horaAtencion2Hito2 = document.querySelector('#hora_atencion2_hito2')

const divAsignarPersonalTecnico = document.querySelector('.divAsignarPersonalTecnico')
const divAsignarPersonalTecnico2 = document.querySelector('.divAsignarPersonalTecnico2')
const divInformarMotivo = document.querySelector('.divInformarMotivo')
const divFechaAtencion = document.querySelector('.divFechaAtencion')
const divEscalamiento = document.querySelector('.divEscalamiento')
const divLogroResultado = document.querySelector('.divLogroResultado')
const divBtnAgregarEscalamiento = document.querySelector('.divBtnAgregarEscalamiento')
const divFechaAtencion2 = document.querySelector('.divFechaAtencion2')

const hito2_id = document.querySelector('#idHito2').value

let choiceGrupoAsignado = ''
let choiceGrupoAsignado2 = ''
let choiceGrupoEscal = ''

let choiceTecnicoHito2 = ''
let choiceTecnico2Hito2 = ''
let choiceEscalamientoHito2 = ''

async function loadChoiceHito2() {

    await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectGrupoAsignadoHito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                selectInformarEscalHito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                selectGrupoAsignado2Hito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            choiceGrupoAsignado = new Choices(selectGrupoAsignadoHito2, {position: 'bottom'})
            choiceGrupoAsignado2 = new Choices(selectInformarEscalHito2, {position: 'bottom'})
            choiceGrupoEscal = new Choices(selectGrupoAsignado2Hito2, {position: 'bottom'})
            selectInformarEscalHito2.disabled = true
            selectGrupoAsignado2Hito2.disabled = true
        })

    const grupo_id = await selectGrupoAsignadoHito2.value
    inputCelularTecHito2.value = ''

    await fetch(`/api/tecnicos/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            inputCelularTecHito2.value = data[0].celular
            inputCelularTec2Hito2.value = data[0].celular
            data.forEach(listTecnico => {
                selectTecnicoHito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                selectTecnico2Hito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
            })
            choiceTecnicoHito2 = new Choices(selectTecnicoHito2, {position: 'bottom'})
            choiceTecnico2Hito2 = new Choices(selectTecnico2Hito2, {position: 'bottom'})
            selectTecnico2Hito2.disabled = true
        })

    await fetch(`/api/escalamientos/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTecnico => {
                selectPersonaContacHito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
            })
            choiceEscalamientoHito2 = new Choices(selectPersonaContacHito2, {position: 'bottom'})
            selectPersonaContacHito2.disabled = true
        })

}

async function loadChoiceHito2ToUpdate() {

    const idAsigPerHito2 = document.querySelector('#idAsignarPersonalHito2').value
    const grupo_id = document.querySelector('#idGrupoAsignadoHito2').value
    const tecnico_id = document.querySelector('#idTecnicoHito2').value
    const idInformarMotivoHito2 = document.querySelector('#idInformarMotivoHito2').value
    const idLogroResultadoHito2 = document.querySelector('#idLogroResultadoHito2').value
    
    selectAsignarPersonal.value = idAsigPerHito2
    selectInformarMotivo.value = idInformarMotivoHito2
    selectLogroResultadoHito2.value = idLogroResultadoHito2

    if(selectAsignarPersonal.value == 'Si'){

        selectAsignarPersonal.disabled = true

        selectGrupoAsignadoHito2.innerHTML = ''

        await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                
                if(listGrupoGics._id == grupo_id){
                    selectGrupoAsignadoHito2.innerHTML += `<option selected value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                }else{
                    selectGrupoAsignadoHito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`   
                }
            })
            new Choices(selectGrupoAsignadoHito2, {position: 'bottom'})
        })

        inputCelularTecHito2.value = ''

        await fetch(`/api/tecnicos/${grupo_id}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(listTecnico => {
                    if(listTecnico._id == tecnico_id){
                        inputCelularTecHito2.value = listTecnico.celular
                        selectTecnicoHito2.innerHTML += `<option selected value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                    }else{
                        selectTecnicoHito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                    }
                })
                choiceTecnicoHito2 = new Choices(selectTecnicoHito2, {position: 'bottom'})
                selectTecnico2Hito2.disabled = true
            })


    }else{
        divAsignarPersonalTecnico.className = 'divAsignarPersonalTecnico col-lg-9 col-sm-6 d-none'
        divInformarMotivo.classList.remove('d-none')
        selectInformarMotivo.disabled = false
        selectGrupoAsignadoHito2.disabled = true
        selectAsignarPersonal.disabled = true

        if(selectInformarMotivo.value == '1'){
            divAsignarPersonalTecnico2.classList.remove('d-none')
            selectInformarMotivo.disabled = true
            fechaAtencionHito2.disabled = false
            horaAtencionHito2.disabled = false

            const grupo_asig2 = document.querySelector('#idGrupoAsignado2Hito2').value

            console.log(grupo_asig2)

            selectGrupoAsignado2Hito2.innerHTML = ''

                await fetch(`/api/grupos_gics`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(listGrupoGics => {
                        
                        if(listGrupoGics._id == grupo_asig2){
                            selectGrupoAsignado2Hito2.innerHTML += `<option selected value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                        }else{
                            selectGrupoAsignado2Hito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`   
                        }
                    })
                    new Choices(selectGrupoAsignado2Hito2, {position: 'bottom'})
                })

                inputCelularTec2Hito2.value = ''

                selectTecnico2Hito2.innerHTML = ''

                await fetch(`/api/tecnicos/${grupo_asig2}`)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listTecnico => {
                            if(listTecnico._id == tecnico_id){
                                inputCelularTec2Hito2.value = listTecnico.celular
                                selectTecnico2Hito2.innerHTML += `<option selected value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                            }else{
                                selectTecnico2Hito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                            }
                        })
                        choiceTecnico2Hito2 = new Choices(selectTecnico2Hito2, {position: 'bottom'})
                    })

                divAsignarPersonalTecnico2.classList.remove('d-none')
                selectTecnico2Hito2.disabled = false


        }else{

            selectInformarMotivo.disabled = true

            await fetch(`/api/grupos_gics`)
            .then(res => res.json())
            .then(data => {
                data.forEach(listGrupoGics => {
                    selectInformarEscalHito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                })
                new Choices(selectInformarEscalHito2, {position: 'bottom'})
            })

            grupo_escal = selectInformarEscalHito2.value

            await fetch(`/api/escalamientos/${grupo_escal}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(listTecnico => {
                    selectPersonaContacHito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                })
                choiceEscalamientoHito2 = new Choices(selectPersonaContacHito2, {position: 'bottom'})
            })


            divFechaAtencion.className = 'divFechaAtencion col-lg-8 col-sm-6 d-none'
            divEscalamiento.classList.remove('d-none')
            divBtnAgregarEscalamiento.classList.remove('d-none')
            divLogroResultado.classList.remove('d-none')
            selectLogroResultadoHito2.disabled = false
            tablaEscalamiento.classList.remove('d-none')

            await fetch(`/api/hito2/${hito2_id}`)
            .then(res => res.json())
            .then(data => {
                const grupo_parts = data.lista_escalamiento_grupo.split(',')
                const contacto_parts = data.lista_escalamiento_contacto.split(',')
                const resultado_parts = data.lista_escalamiento_resultado.split(',')

                for (let i = 0; i < grupo_parts.length; i++) {

                    cont += 1

                    const grupo = grupo_parts[i]
                    const contacto = contacto_parts[i]
                    const resultado = resultado_parts[i]

                    if(contacto == 'Francisco Tejada' || contacto == 'Enrique Busetich' || contacto == 'Mario Segura'){
                        fechaAtencion2Hito2.disabled = false
                        horaAtencion2Hito2.disabled = false
                        divFechaAtencion2.classList.remove('d-none')
                    }

                    arrayGrupo.push(grupo)
                    arrayContacto.push(contacto)
                    arrayResultado.push(resultado)

                    tablaEscalamiento.innerHTML += `
                                                <tbody>
                                                        <tr>
                                                            <td class="border-0 font-weight-bold">${grupo}<input type='hidden' id='tableEscalGrupo${cont}' name='tableEscalGrupo' value='${arrayGrupo}'></input></td>
                                                            <td class="border-0 font-weight-bold">${contacto}<input type='hidden' id='tableEscalContacto${cont}' name='tableEscalContacto' value='${arrayContacto}'></input></td>
                                                            <td class="border-0 font-weight-bold">${resultado}<input type='hidden' id='tableEscalResultado${cont}' name='tableEscalResultado' value='${arrayResultado}'></input></td>
                                                        </tr>
                                                    </tbody>
                                                `
                }
            
            })

            if(selectLogroResultadoHito2.value == 'Si'){

                divLogroResultado.className = 'divLogroResultado col-lg-3 col-sm-6 mb-4 d-none'
                divBtnAgregarEscalamiento.className = 'divBtnAgregarEscalamiento col-lg-3 col-sm-6 pt-4 d-none'

                const grupo_asig2 = document.querySelector('#idGrupoAsignado2Hito2').value

                await fetch(`/api/grupos_gics`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(listGrupoGics => {
                        
                        if(listGrupoGics._id == grupo_asig2){
                            selectGrupoAsignado2Hito2.innerHTML += `<option selected value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                        }else{
                            selectGrupoAsignado2Hito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`   
                        }
                    })
                    new Choices(selectGrupoAsignado2Hito2, {position: 'bottom'})
                })

                inputCelularTec2Hito2.value = ''

                selectTecnico2Hito2.innerHTML = ''

                await fetch(`/api/tecnicos/${grupo_id}`)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listTecnico => {
                            if(listTecnico._id == tecnico_id){
                                inputCelularTec2Hito2.value = listTecnico.celular
                                selectTecnico2Hito2.innerHTML += `<option selected value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                            }else{
                                selectTecnico2Hito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                            }
                        })
                        choiceTecnico2Hito2 = new Choices(selectTecnico2Hito2, {position: 'bottom'})
                    })

                divAsignarPersonalTecnico2.classList.remove('d-none')
                selectTecnico2Hito2.disabled = false
            }
        }

    }

}

selectAsignarPersonal.addEventListener('change', async() => {

    if(selectAsignarPersonal.value == 'No'){
        divAsignarPersonalTecnico.className = 'divAsignarPersonalTecnico col-lg-9 col-sm-6 d-none'
        selectInformarMotivo.disabled = false
        fechaAtencionHito2.disabled = false
        horaAtencionHito2.disabled = false
        selectGrupoAsignadoHito2.disabled = true
        selectTecnicoHito2.disabled = true
        selectGrupoAsignado2Hito2.disabled = false
        selectTecnico2Hito2.disabled = false
        divInformarMotivo.classList.remove('d-none')
        divAsignarPersonalTecnico2.classList.remove('d-none')
    }else{
        divInformarMotivo.className = 'divInformarMotivo col-lg-9 col-sm-6 d-none'
        divBtnAgregarEscalamiento.className = 'divBtnAgregarEscalamiento col-lg-3 col-sm-6 pt-4 d-none'
        divAsignarPersonalTecnico.classList.remove('d-none')
        selectInformarMotivo.value = '1'
        divEscalamiento.className = 'divEscalamiento col-lg-8 col-sm-6 d-none'
        selectLogroResultadoHito2.value = 'Si'
        divLogroResultado.className = 'divLogroResultado col-lg-3 col-sm-6 mb-4 d-none'
        divAsignarPersonalTecnico2.className = 'divAsignarPersonalTecnico2 col-lg-12 col-sm-6 mt-4 d-none'
        divFechaAtencion.classList.remove('d-none')
        selectLogroResultadoHito2.disabled = true
        selectInformarEscalHito2.disabled = true
        selectPersonaContacHito2.disabled = true
        selectGrupoAsignadoHito2.disabled = false
        selectTecnicoHito2.disabled = false
        selectInformarMotivo.disabled = true
        selectGrupoAsignado2Hito2.disabled = true
        selectTecnico2Hito2.disabled = true
    }

})

selectInformarMotivo.addEventListener('change', async() => {

    if(selectInformarMotivo.value == '2'){
        
        choiceGrupoAsignado.destroy()
        choiceGrupoAsignado2.destroy()
        choiceGrupoEscal.destroy()
        choiceEscalamientoHito2.destroy()
        choiceTecnicoHito2.destroy()
        choiceTecnico2Hito2.destroy()

        selectInformarEscalHito2.disabled = false
        selectPersonaContacHito2.disabled = false

        selectGrupoAsignadoHito2.innerHTML = ''
        selectInformarEscalHito2.innerHTML = ''
        selectGrupoAsignado2Hito2.innerHTML = ''

        await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectGrupoAsignadoHito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                selectInformarEscalHito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                selectGrupoAsignado2Hito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            choiceGrupoAsignado = new Choices(selectGrupoAsignadoHito2, {position: 'bottom'})
            choiceGrupoAsignado2 = new Choices(selectInformarEscalHito2, {position: 'bottom'})
            selectGrupoAsignado2Hito2.disabled = false
            choiceGrupoEscal = new Choices(selectGrupoAsignado2Hito2, {position: 'bottom'})
            
        })

        const grupo_id = await selectGrupoAsignadoHito2.value
        inputCelularTecHito2.value = ''

        selectTecnicoHito2.innerHTML = ''
        selectTecnico2Hito2.innerHTML = ''
        await fetch(`/api/tecnicos/${grupo_id}`)
            .then(res => res.json())
            .then(data => {
                inputCelularTecHito2.value = data[0].celular
                inputCelularTec2Hito2.value = data[0].celular
                data.forEach(listTecnico => {
                    selectTecnicoHito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                    selectTecnico2Hito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                })
                choiceTecnicoHito2 = new Choices(selectTecnicoHito2, {position: 'bottom'})
                choiceTecnico2Hito2 = new Choices(selectTecnico2Hito2, {position: 'bottom'})
                selectTecnicoHito2.disabled = true
            })

        selectPersonaContacHito2.innerHTML = ''

        await fetch(`/api/escalamientos/${grupo_id}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(listTecnico => {
                    selectPersonaContacHito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                })
                choiceEscalamientoHito2 = new Choices(selectPersonaContacHito2, {position: 'bottom'})
            })

        selectLogroResultadoHito2.value = 'Si'
        divFechaAtencion.className = 'divFechaAtencion col-lg-8 col-sm-6 d-none'
        divEscalamiento.classList.remove('d-none')
        divLogroResultado.classList.remove('d-none')
        divAsignarPersonalTecnico2.classList.remove('d-none')
        divBtnAgregarEscalamiento.classList.remove('d-none')
        selectLogroResultadoHito2.disabled = false
        selectGrupoAsignado2Hito2.disabled = false
        selectInformarEscalHito2.disabled = false
        selectPersonaContacHito2.disabled = false
        fechaAtencionHito2.disabled = true
        horaAtencionHito2.disabled = true
    }else{
        divEscalamiento.className = 'divEscalamiento col-lg-8 col-sm-6 d-none'
        divLogroResultado.className = 'divLogroResultado col-lg-3 col-sm-6 mb-4 d-none'
        divAsignarPersonalTecnico2.className = 'divAsignarPersonalTecnico2 col-lg-12 col-sm-6 mt-4 d-none'
        divBtnAgregarEscalamiento.className = 'divBtnAgregarEscalamiento col-lg-3 col-sm-6 pt-4 d-none'
        divFechaAtencion.classList.remove('d-none')
        divAsignarPersonalTecnico2.classList.remove('d-none')
        selectInformarEscalHito2.disabled = true
        selectPersonaContacHito2.disabled = true
        selectLogroResultadoHito2.disabled = true
        fechaAtencionHito2.disabled = false
        horaAtencionHito2.disabled = false
        choiceGrupoAsignado.destroy()
        choiceGrupoAsignado2.destroy()
        choiceGrupoEscal.destroy()
        choiceEscalamientoHito2.destroy()
        choiceTecnicoHito2.destroy()
        choiceTecnico2Hito2.destroy()
        
    }

})

selectLogroResultadoHito2.addEventListener('change', async() => {

    if(selectLogroResultadoHito2.value == 'No'){
        divAsignarPersonalTecnico2.className = 'divAsignarPersonalTecnico2 col-lg-12 col-sm-6 mt-4 d-none'
        selectGrupoAsignado2Hito2.disabled = true
        selectTecnico2Hito2.disabled = true
    }else{
        divAsignarPersonalTecnico2.classList.remove('d-none')
        selectGrupoAsignado2Hito2.disabled = false
        selectTecnico2Hito2.disabled = false
    }

})

selectGrupoAsignadoHito2.addEventListener('change', async () => {

    choiceTecnicoHito2.destroy()
    selectTecnicoHito2.innerHTML = ''

    const grupo_id = await selectGrupoAsignadoHito2.value
    inputCelularTecHito2.value = ''

    await fetch(`/api/tecnicos/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            inputCelularTecHito2.value = data[0].celular
            data.forEach(listTecnico => {
                selectTecnicoHito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
            })
            choiceTecnicoHito2 = new Choices(selectTecnicoHito2, {position: 'bottom'})
        })

})

selectInformarEscalHito2.addEventListener('change', async () => {

    choiceEscalamientoHito2.destroy()
    selectPersonaContacHito2.innerHTML = ''

    const grupo_id = await selectInformarEscalHito2.value

    await fetch(`/api/escalamientos/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listContacto => {
                selectPersonaContacHito2.innerHTML += `<option value="${listContacto._id}">${listContacto.nombre} ${listContacto.apellido}</option>`
            })
            choiceEscalamientoHito2 = new Choices(selectPersonaContacHito2, {position: 'bottom'})
        })

})

selectPersonaContacHito2.addEventListener('change', async () => {

    const contacto_id = await selectPersonaContacHito2.value
    const idLogroResultadoHito2 = document.querySelector('#idLogroResultadoHito2').value

    if(contacto_id == '6042bea01c9a152cec8d62d1' || contacto_id == '6042beaf1c9a152cec8d62d2' || contacto_id == '6042bec11c9a152cec8d62d3'){
        divBtnAgregarEscalamiento.className = 'divBtnAgregarEscalamiento col-lg-3 col-sm-6 pt-4 d-none'
        divAsignarPersonalTecnico2.classList.remove('d-none')
        divFechaAtencion2.classList.remove('d-none')
        fechaAtencion2Hito2.disabled = false
        horaAtencion2Hito2.disabled = false
        selectGrupoAsignado2Hito2.disabled = false
        selectTecnico2Hito2.disabled = false
        selectLogroResultadoHito2.value = 'Si'
        btnAgregarTabla()

        divLogroResultado.className = 'divLogroResultado col-lg-3 col-sm-6 mb-4 d-none'

        if(idLogroResultadoHito2 == ''){
            choiceGrupoEscal.destroy()
            choiceTecnico2Hito2.destroy()
        }

        selectGrupoAsignado2Hito2.innerHTML = ''

        await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
                selectGrupoAsignado2Hito2.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            choiceGrupoAsignado2 = new Choices(selectGrupoAsignado2Hito2, {position: 'bottom'})
        })

        const grupo_id = selectGrupoAsignado2Hito2.value
        inputCelularTecHito2.value = ''
        selectTecnico2Hito2.innerHTML = ''
        
        await fetch(`/api/tecnicos/${grupo_id}`)
            .then(res => res.json())
            .then(data => {
                inputCelularTec2Hito2.value = data[0].celular
                data.forEach(listTecnico => {
                    selectTecnico2Hito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                })
                choiceTecnico2Hito2 = new Choices(selectTecnico2Hito2, {position: 'bottom'})
            })
    }

})

selectGrupoAsignado2Hito2.addEventListener('change', async () => {

    choiceTecnico2Hito2.destroy()
    selectTecnico2Hito2.innerHTML = ''

    const grupo_id = await selectGrupoAsignado2Hito2.value
    inputCelularTec2Hito2.value = ''

    await fetch(`/api/tecnicos/${grupo_id}`)
        .then(res => res.json())
        .then(data => {
            inputCelularTec2Hito2.value = data[0].celular
            data.forEach(listTecnico => {
                selectTecnico2Hito2.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
            })
            choiceTecnico2Hito2 = new Choices(selectTecnico2Hito2, {position: 'bottom'})
        })

})

selectTecnicoHito2.addEventListener('change', async () => {

    inputCelularTecHito2.innerHTML = ''

    const tecnico_id = await selectTecnicoHito2.value

    await fetch(`/api/tecnicos`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTecnico => {
                if(listTecnico._id == tecnico_id){
                    inputCelularTecHito2.value = listTecnico.celular
                }
            })
        })

})

selectTecnico2Hito2.addEventListener('change', async () => {

    inputCelularTec2Hito2.innerHTML = ''

    const tecnico_id = await selectTecnico2Hito2.value

    await fetch(`/api/tecnicos`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTecnico => {
                if(listTecnico._id == tecnico_id){
                    inputCelularTec2Hito2.value = listTecnico.celular
                }
            })
        })

})

const baseDatos = []

function btnAgregarTabla(){

    function Escalamiento(grupo, contacto, resultado){
        this.grupo = grupo
        this.contacto = contacto
        this.resultado = resultado
    }

    const grupo = selectInformarEscalHito2.options[selectInformarEscalHito2.selectedIndex].text
    const contacto = selectPersonaContacHito2.options[selectPersonaContacHito2.selectedIndex].text
    const resultado = selectLogroResultadoHito2.options[selectLogroResultadoHito2.selectedIndex].text
    newEscalamiento = new Escalamiento(grupo, contacto, resultado)
    agregarBase()
    tablaEscalamiento.classList.remove('d-none')
}

const tablaEscalamiento = document.querySelector('#TablaEscalamiento')
const demo = document.querySelector('#escalamientoshito2')
let cont = 0

var arrayGrupo = new Array()
var arrayContacto = new Array()
var arrayResultado = new Array()

function agregarBase(){
    const grupo = selectInformarEscalHito2.options[selectInformarEscalHito2.selectedIndex].text
    const contacto = selectPersonaContacHito2.options[selectPersonaContacHito2.selectedIndex].text
    const resultado = selectLogroResultadoHito2.options[selectLogroResultadoHito2.selectedIndex].text
    cont += 1
    baseDatos.push(newEscalamiento)
    arrayGrupo.push(grupo)
    arrayContacto.push(contacto)
    arrayResultado.push(resultado)


    tablaEscalamiento.innerHTML += `
    <tbody>
            <tr>
                <td class="border-0 font-weight-bold">${newEscalamiento.grupo}<input type='hidden' id='tableEscalGrupo${cont}' name='tableEscalGrupo' value='${arrayGrupo}'></input></td>
                <td class="border-0 font-weight-bold">${newEscalamiento.contacto}<input type='hidden' id='tableEscalContacto${cont}' name='tableEscalContacto' value='${arrayContacto}'></input></td>
                <td class="border-0 font-weight-bold">${newEscalamiento.resultado}<input type='hidden' id='tableEscalResultado${cont}' name='tableEscalResultado' value='${arrayResultado}'></input></td>
            </tr>
        </tbody>
    `

    selectAsignarPersonal.disabled = true
    selectInformarMotivo.disabled = true
}

const formHito2 = document.querySelector('#formHito2')

formHito2.addEventListener("submit", async function (e) {
    e.preventDefault()

    const idAsigPerHito2 = document.querySelector('#idAsignarPersonalHito2').value
    const idInformarMotivoHito2 = document.querySelector('#idInformarMotivoHito2').value
    const idLogroResultadoHito2 = document.querySelector('#idLogroResultadoHito2').value

    console.log(idLogroResultadoHito2)

    if(idAsigPerHito2 == 'Si' || idAsigPerHito2 == 'No'){
        selectAsignarPersonal.disabled = false
    }

    if(idInformarMotivoHito2 == '1' || idInformarMotivoHito2 == '2'){
        selectInformarMotivo.disabled = false
    }

    if(selectLogroResultadoHito2.value == 'No' || selectLogroResultadoHito2.value == 'Si'){
        selectAsignarPersonal.disabled = false
        selectInformarMotivo.disabled = false
    }


    data = new FormData(formHito2)
    const object = {}
    data.forEach(function (value, key) {
        object[key] = value
    })
    const dataJson = JSON.stringify(object)
    console.log(dataJson)
    await fetch('/api/update_hito2', {
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
            window.location.reload()
        })
        .catch((error) => {
            console.log(error);
        })

})

window.addEventListener('load', () => {

    if(hito1_id != ''){
        loadChoiceHito1ToUpdate()
    }else{
        loadChoiceHito1()
    }

    if(hito2_id != ''){
        loadChoiceHito2ToUpdate()
    }else{
        loadChoiceHito2()
    }

})