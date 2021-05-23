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

const chbFecha = document.querySelector('#sin_fecha_hito2')

const hito2_id = document.querySelector('#idHito2').value

let choiceGrupo = ''
let choiceGrupo2 = ''
let choiceTecnico = ''
let choicePersonalEscalamiento = ''

async function loadChoiceHito2() {

    await LoadSelectGrupo(selectGrupoAsignadoHito2)
    const idGrupo = selectGrupoAsignadoHito2.value
    await LoadSelectTecnico(idGrupo, selectTecnicoHito2, inputCelularTecHito2)

}

async function loadChoiceHito2ToUpdate() {

    const idAsigPerHito2 = document.querySelector('#idAsignarPersonalHito2').value
    const grupo_id = document.querySelector('#idGrupoAsignadoHito2').value
    const tecnico_id = document.querySelector('#idTecnicoHito2').value
    const idInformarMotivoHito2 = document.querySelector('#idInformarMotivoHito2').value
    const idLogroResultadoHito2 = document.querySelector('#idLogroResultadoHito2').value

    const statusChb = document.querySelector('#statusChb').value

    const divChb = document.querySelector('.divCheckBox')
    
    selectAsignarPersonal.value = idAsigPerHito2
    selectInformarMotivo.value = idInformarMotivoHito2
    selectLogroResultadoHito2.value = idLogroResultadoHito2

    if(selectAsignarPersonal.value == 'Si'){

        selectAsignarPersonal.disabled = true

        await LoadSelectedGrupo(grupo_id, selectGrupoAsignadoHito2)
        await LoadSelectedTecnico(grupo_id, tecnico_id, selectTecnicoHito2, inputCelularTecHito2)

    }else{
        divAsignarPersonalTecnico.className = 'divAsignarPersonalTecnico col-lg-9 col-sm-6 d-none'
        divInformarMotivo.classList.remove('d-none')
        selectInformarMotivo.disabled = false
        selectGrupoAsignadoHito2.disabled = true
        selectAsignarPersonal.disabled = true

        if(selectInformarMotivo.value == '1'){
            divAsignarPersonalTecnico2.classList.remove('d-none')
            selectInformarMotivo.disabled = true

            if(statusChb == 'off'){
                fechaAtencionHito2.disabled = false
                horaAtencionHito2.disabled = false
                divChb.className = 'divCheckBox col-lg-4 col-sm-6 mb-4 d-none'
            }else{
                chbFecha.checked = true
            }
            

            const grupo_asig2 = document.querySelector('#idGrupoAsignado2Hito2').value

            await LoadSelectedGrupo2(grupo_asig2, selectGrupoAsignado2Hito2)
            await LoadSelectedTecnico(grupo_asig2, tecnico_id, selectTecnico2Hito2, inputCelularTec2Hito2)

            divAsignarPersonalTecnico2.classList.remove('d-none')
            selectTecnico2Hito2.disabled = false


        }else{

            selectInformarMotivo.disabled = true

            await LoadSelectGrupo(selectInformarEscalHito2)
            const idGrupo = selectInformarEscalHito2.value
            await LoadSelectPersonalEscalamiento(idGrupo, selectPersonaContacHito2)

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

                await LoadSelectedGrupo2(grupo_asig2, selectGrupoAsignado2Hito2)
                await LoadSelectedTecnico(grupo_id, tecnico_id, selectTecnico2Hito2, inputCelularTec2Hito2)

                divAsignarPersonalTecnico2.classList.remove('d-none')
                selectTecnico2Hito2.disabled = false
            }
        }

    }

}

async function LoadSelectGrupo(selectName){

    if(choiceGrupo.initialised !== undefined) choiceGrupo.destroy()

    await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            selectName.innerHTML = ''
            data.forEach(listGrupoGics => {
                selectName.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            choiceGrupo = new Choices(selectName, {position: 'bottom'})
        })

}

async function LoadSelectedGrupo(id, selectName){

    if(choiceGrupo.initialised !== undefined) choiceGrupo.destroy()

    await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
            
                if(listGrupoGics._id == id){
                    selectName.innerHTML += `<option selected value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                }else{
                    selectName.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`   
                }
            })
            choiceGrupo = new Choices(selectName, {position: 'bottom'})
        })

}

async function LoadSelectGrupo2(selectName){

    if(choiceGrupo2.initialised !== undefined) choiceGrupo2.destroy()

    await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            selectName.innerHTML = ''
            data.forEach(listGrupoGics => {
                selectName.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
            })
            choiceGrupo2 = new Choices(selectName, {position: 'bottom'})
        })

}

async function LoadSelectedGrupo2(id, selectName){

    if(choiceGrupo2.initialised !== undefined) choiceGrupo2.destroy()

    await fetch(`/api/grupos_gics`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listGrupoGics => {
            
                if(listGrupoGics._id == id){
                    selectName.innerHTML += `<option selected value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`
                }else{
                    selectName.innerHTML += `<option value="${listGrupoGics._id}">${listGrupoGics.grupo_gics}</option>`   
                }
            })
            choiceGrupo2 = new Choices(selectName, {position: 'bottom'})
        })

}

async function LoadSelectTecnico(id, selectName, inputName){

    if(choiceTecnico.initialised !== undefined) choiceTecnico.destroy()

    await fetch(`/api/tecnicos/${id}`)
        .then(res => res.json())
        .then(data => {
            inputName.value = data[0].celular
            selectName.innerHTML = ''
            data.forEach(listTecnico => {
                selectName.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
            })
            choiceTecnico = new Choices(selectName, {position: 'bottom'})
        })
        
}

async function LoadSelectedTecnico(idGrupo, idTecnico, selectName, inputName){

    if(choiceTecnico.initialised !== undefined) choiceTecnico.destroy()

    await fetch(`/api/tecnicos/${idGrupo}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(listTecnico => {
                    if(listTecnico._id == idTecnico){
                        inputName.value = listTecnico.celular
                        selectName.innerHTML += `<option selected value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                    }else{
                        selectName.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                    }
                })
                choiceTecnico = new Choices(selectName, {position: 'bottom'})
            })

}

async function LoadTelefonoTecnico(id, inputName){

    await fetch(`/api/tecnicos`)
        .then(res => res.json())
        .then(data => {
            data.forEach(listTecnico => {
                if(listTecnico._id == id){
                    inputName.value = listTecnico.celular
                }
            })
        })
        
}

async function LoadSelectPersonalEscalamiento(id, selectName){

    if(choicePersonalEscalamiento.initialised !== undefined) choicePersonalEscalamiento.destroy()

    await fetch(`/api/escalamientos/${id}`)
        .then(res => res.json())
        .then(data => {
            selectName.innerHTML = ''
            data.forEach(listPersonal => {
                selectName.innerHTML += `<option value="${listPersonal._id}">${listPersonal.nombre} ${listPersonal.apellido}</option>`
            })
            choicePersonalEscalamiento = new Choices(selectName, {position: 'bottom'})
        })

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

        await LoadSelectGrupo2(selectGrupoAsignado2Hito2)
        const idGrupo = selectGrupoAsignado2Hito2.value
        await LoadSelectTecnico(idGrupo, selectTecnico2Hito2, inputCelularTec2Hito2)
        
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

        selectInformarEscalHito2.disabled = false
        selectPersonaContacHito2.disabled = false

        await LoadSelectGrupo(selectInformarEscalHito2)
        const idGrupo = selectInformarEscalHito2.value
        await LoadSelectPersonalEscalamiento(idGrupo, selectPersonaContacHito2)

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
        
    }

})

selectLogroResultadoHito2.addEventListener('change', async() => {

    if(selectLogroResultadoHito2.value == 'No'){
        divAsignarPersonalTecnico2.className = 'divAsignarPersonalTecnico2 col-lg-12 col-sm-6 mt-4 d-none'
        selectGrupoAsignado2Hito2.disabled = true
        selectTecnico2Hito2.disabled = true
    }else{
        
        selectGrupoAsignado2Hito2.disabled = false
        selectTecnico2Hito2.disabled = false

        await LoadSelectGrupo2(selectGrupoAsignado2Hito2)
        const idGrupo = selectGrupoAsignado2Hito2.value
        await LoadSelectTecnico(idGrupo, selectTecnico2Hito2, inputCelularTec2Hito2)

        divAsignarPersonalTecnico2.classList.remove('d-none')
    }

})

selectGrupoAsignadoHito2.addEventListener('change', async () => {

    const idGrupo = selectGrupoAsignadoHito2.value
    await LoadSelectTecnico(idGrupo, selectTecnicoHito2, inputCelularTecHito2)

})

selectInformarEscalHito2.addEventListener('change', async () => {

    const idGrupo = selectInformarEscalHito2.value
    await LoadSelectPersonalEscalamiento(idGrupo, selectPersonaContacHito2)

})

selectPersonaContacHito2.addEventListener('change', async () => {

    const contacto_id = await selectPersonaContacHito2.value

    if(contacto_id == '6042bea01c9a152cec8d62d1' || contacto_id == '6042beaf1c9a152cec8d62d2' || contacto_id == '6042bec11c9a152cec8d62d3'){
        
        divBtnAgregarEscalamiento.className = 'divBtnAgregarEscalamiento col-lg-3 col-sm-6 pt-4 d-none'
        divAsignarPersonalTecnico2.classList.remove('d-none')
        divFechaAtencion2.classList.remove('d-none')
        fechaAtencion2Hito2.disabled = false
        horaAtencion2Hito2.disabled = false
        selectGrupoAsignado2Hito2.disabled = false
        selectTecnico2Hito2.disabled = false
        selectLogroResultadoHito2.value = 'Si'
        btnAgregarTabla(selectInformarEscalHito2, selectPersonaContacHito2, selectLogroResultadoHito2, tablaEscalamiento)

        divLogroResultado.className = 'divLogroResultado col-lg-3 col-sm-6 mb-4 d-none'

        await LoadSelectGrupo2(selectGrupoAsignado2Hito2)
        const idGrupo = selectGrupoAsignado2Hito2.value
        await LoadSelectTecnico(idGrupo, selectTecnico2Hito2, inputCelularTec2Hito2)

    }

})

selectGrupoAsignado2Hito2.addEventListener('change', async () => {
    
    const idGrupo = selectGrupoAsignado2Hito2.value
    await LoadSelectTecnico(idGrupo, selectTecnico2Hito2, inputCelularTec2Hito2)

})

selectTecnicoHito2.addEventListener('change', async () => {

    const idTecnico = await selectTecnicoHito2.value
    await LoadTelefonoTecnico(idTecnico, inputCelularTecHito2)

})

selectTecnico2Hito2.addEventListener('change', async () => {

    const idTecnico = await selectTecnico2Hito2.value
    await LoadTelefonoTecnico(idTecnico, inputCelularTec2Hito2)

})

chbFecha.addEventListener('change', async () => {

    if(chbFecha.checked == true){
        fechaAtencionHito2.disabled = true
        horaAtencionHito2.disabled = true
    }else{
        fechaAtencionHito2.disabled = false
        horaAtencionHito2.disabled = false
    }
})

const baseDatos = []

function btnAgregarTabla(s1, s2, s3, table){

    function Escalamiento(grupo, contacto, resultado){
        this.grupo = grupo
        this.contacto = contacto
        this.resultado = resultado
    }

    const grupo = s1.options[s1.selectedIndex].text
    const contacto = s2.options[s2.selectedIndex].text
    const resultado = s3.options[s3.selectedIndex].text
    newEscalamiento = new Escalamiento(grupo, contacto, resultado)

    agregarBaseHito2(grupo, contacto, resultado, table)

    table.classList.remove('d-none')

}

const tablaEscalamiento = document.querySelector('#tablaEscalamiento')
let cont = 0

var arrayGrupo = new Array()
var arrayContacto = new Array()
var arrayResultado = new Array()

function agregarBaseHito2(group, contac, resul, table){
    cont += 1
    baseDatos.push(newEscalamiento)
    arrayGrupo.push(group)
    arrayContacto.push(contac)
    arrayResultado.push(resul)


    table.innerHTML += `
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

    if(idAsigPerHito2 != ''){
        selectAsignarPersonal.disabled = false
    }

    if(idInformarMotivoHito2 != ''){
        selectInformarMotivo.disabled = false
    }

    if(selectLogroResultadoHito2.value != ''){
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


// Hito 3
let selectRequiereDesplazamiento = document.querySelector('#req_desplaz_hito3')
let selectHorarioAcordado = document.querySelector('#horario_acordado_hito3')
let SelectTecnicoResponde = document.querySelector('#tecnico_responde_hito3')
const SelectHorarioIndicado = document.querySelector('#horario_indicado_hito3')
const SelectEscalamientoHito3 = document.querySelector('#informar_escalamiento_hito3')
const selectContactoHito3 = document.querySelector('#persona_contacto_hito3')
let selectLogroResultadoHito3 = document.querySelector('#logro_resultado_hito3')
const selectTecnicoHito3 = document.querySelector('#tecnico_hito3')
const selectTecnico2Hito3 = document.querySelector('#tecnico2_hito3')

const divDesplazarPersonalTecnico = document.querySelector('.divDesplazarPersonalTecnico')
const divDesplazamientoSi = document.querySelector('.divDesplazamientoSi')
const divDesplazamientoNo = document.querySelector('.divDesplazamientoNo')
const divTecnicoRespondeSi = document.querySelector('.divTecnicoRespondeSi')
const divTecnicoRespondeNo = document.querySelector('.divTecnicoRespondeNo')
const divLogroResultadoHito3 = document.querySelector('.divLogroResultadoHito3')
const divBtnAgregarEscalamientoHito3 = document.querySelector('.divBtnAgregarEscalamientoHito3')
const divTecnicoInfoHito3 = document.querySelector('.divTecnicoInfoHito3')

const formHito3 = document.querySelector('#formHito3')

const tablaEscalamiento2 = document.querySelector('#tablaEscalamiento2')

const idGrupoAsignado = document.querySelector('#idGrupoAsignadoHito3').value
const idTecnicoAsignado = document.querySelector('#idTecnicoHito3').value
const idGrupoAsignado2 = document.querySelector('#idGrupoAsignado2Hito3').value
const idTecnicoAsignado2 = document.querySelector('#idTecnico2Hito3').value

const inputCelularTecHito3 = document.querySelector('#celular_tecnico_hito3')
const inputCelularTec2Hito3 = document.querySelector('#celular_tecnico2_hito3')

const hito3_id = document.querySelector('#idHito3').value

let choiceTecnicoHito3 = ''
 

async function loadChoiceHito3() {

    await LoadSelectedTecnicoHito3(idGrupoAsignado, idTecnicoAsignado, selectTecnicoHito3, inputCelularTecHito3)

}

async function loadChoiceHito3ToUpdate(){

    const idDesplazamientoHito3 = document.querySelector('#idDesplazamientoHito3').value
    const idHorarioAcordadoHito3 = document.querySelector('#idHorarioAcordadoHito3').value
    const idTecnicoRespondeHito3 = document.querySelector('#idTecnicoRespondeHito3').value
    const idHorarioIndicadoHito3 = document.querySelector('#idHorarioIndicadoHito3').value
    const idLogroResultadoHito3 = document.querySelector('#idLogroResultadoHito3').value
    
    const idTecnicoAsignadoBD = document.querySelector('#idTecnicoHito3bd').value

    selectRequiereDesplazamiento.value = idDesplazamientoHito3
    selectHorarioAcordado.value = idHorarioAcordadoHito3
    SelectTecnicoResponde.value = idTecnicoRespondeHito3
    SelectHorarioIndicado.value = idHorarioIndicadoHito3
    selectLogroResultadoHito3.value = idLogroResultadoHito3
    

    selectRequiereDesplazamiento.disabled = true
    selectHorarioAcordado.disabled = true
    SelectTecnicoResponde.disabled = true
    SelectHorarioIndicado.disabled = true

    if(selectRequiereDesplazamiento.value == 'Si'){
        if(selectHorarioAcordado.value == 'Si'){
            await LoadSelectedTecnicoHito3(idGrupoAsignado, idTecnicoAsignadoBD, selectTecnicoHito3, inputCelularTecHito3)
        }else{
            divDesplazamientoSi.className = 'divDesplazamientoSi col-lg-5 col-sm-6 d-none'
            divDesplazamientoNo.classList.remove('d-none')
            if(SelectTecnicoResponde.value == 'Si'){

                divTecnicoRespondeSi.classList.remove('d-none')

                if(SelectHorarioIndicado.value == 'No'){
                    divTecnicoRespondeNo.classList.remove('d-none')
                    await LoadTableEscalamientoHito3()
                    if(selectLogroResultadoHito3.value == 'Si'){
                        divTecnicoInfoHito3.classList.remove('d-none')
                        await LoadSelectedTecnicoHito3(idGrupoAsignado, idTecnicoAsignadoBD, selectTecnico2Hito3, inputCelularTec2Hito3)
                        divTecnicoRespondeNo.className = 'divTecnicoRespondeNo d-none'
                    }
                }

            }else{

                divTecnicoRespondeNo.classList.remove('d-none')
                await LoadTableEscalamientoHito3()
                if(selectLogroResultadoHito3.value == 'Si'){
                    divTecnicoInfoHito3.classList.remove('d-none')
                    await LoadSelectedTecnicoHito3(idGrupoAsignado, idTecnicoAsignadoBD, selectTecnico2Hito3, inputCelularTec2Hito3)
                    divTecnicoRespondeNo.className = 'divTecnicoRespondeNo d-none'
                }

            }
        }

    }else{
        divDesplazarPersonalTecnico.className = 'divDesplazarPersonalTecnico col-lg-4 col-sm-6 mb-4 d-none'
        divDesplazamientoSi.className = 'divDesplazamientoSi col-lg-5 col-sm-6 d-none'
    }

}

async function LoadSelectedTecnicoHito3(idGrupo, idTecnico, selectName, inputName){

    if(choiceTecnicoHito3.initialised !== undefined) choiceTecnicoHito3.destroy()

    await fetch(`/api/tecnicos/${idGrupo}`)
            .then(res => res.json())
            .then(data => {
                selectName.innerHTML = ''
                data.forEach(listTecnico => {
                    if(listTecnico._id == idTecnico){
                        inputName.value = listTecnico.celular
                        selectName.innerHTML += `<option selected value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                    }else{
                        selectName.innerHTML += `<option value="${listTecnico._id}">${listTecnico.nombre} ${listTecnico.apellido}</option>`
                    }
                })
                choiceTecnicoHito3 = new Choices(selectName, {position: 'bottom'})
            })

}

async function LoadTableEscalamientoHito3(){

    await LoadSelectGrupo(SelectEscalamientoHito3)
    const idGrupo = SelectEscalamientoHito3.value
    await LoadSelectPersonalEscalamiento(idGrupo, selectContactoHito3)

    tablaEscalamiento2.classList.remove('d-none')

    await fetch(`/api/hito3/${hito3_id}`)
    .then(res => res.json())
    .then(data => {
        const grupo_parts = data.lista_escalamiento_grupo.split(',')
        const contacto_parts = data.lista_escalamiento_contacto.split(',')
        const resultado_parts = data.lista_escalamiento_resultado.split(',')

        for (let i = 0; i < grupo_parts.length; i++) {

            contHito3 += 1

            const grupo = grupo_parts[i]
            const contacto = contacto_parts[i]
            const resultado = resultado_parts[i]

            if(contacto == 'Francisco Tejada' || contacto == 'Enrique Busetich' || contacto == 'Mario Segura'){
                // fechaAtencion2Hito2.disabled = false
                // horaAtencion2Hito2.disabled = false
                // divFechaAtencion2.classList.remove('d-none')
            }

            arrayGrupoHito3.push(grupo)
            arrayContactoHito3.push(contacto)
            arrayResultadoHito3.push(resultado)

            tablaEscalamiento2.innerHTML += `
                                        <tbody>
                                                <tr>
                                                    <td class="border-0 font-weight-bold">${grupo}<input type='hidden' id='tableEscalGrupoHito3_${contHito3}' name='tableEscalGrupoHito3' value='${arrayGrupoHito3}'></input></td>
                                                    <td class="border-0 font-weight-bold">${contacto}<input type='hidden' id='tableEscalContactoHito3_${contHito3}' name='tableEscalContactoHito3' value='${arrayContactoHito3}'></input></td>
                                                    <td class="border-0 font-weight-bold">${resultado}<input type='hidden' id='tableEscalResultadoHito3_${contHito3}' name='tableEscalResultadoHito3' value='${arrayResultadoHito3}'></input></td>
                                                </tr>
                                            </tbody>
                                        `
        }
                
    })

}

function btnAgregarTablaHito3(s1, s2, s3, table){

    function EscalamientoHito3(grupo, contacto, resultado){
        this.grupo = grupo
        this.contacto = contacto
        this.resultado = resultado
    }

    const grupo = s1.options[s1.selectedIndex].text
    const contacto = s2.options[s2.selectedIndex].text
    const resultado = s3.options[s3.selectedIndex].text
    newEscalamientoHito3 = new EscalamientoHito3(grupo, contacto, resultado)

    agregarBaseHito3(grupo, contacto, resultado, table)
    table.classList.remove('d-none')

}

let contHito3 = 0
const baseDatosHito3 = []
var arrayGrupoHito3 = new Array()
var arrayContactoHito3 = new Array()
var arrayResultadoHito3 = new Array()

function agregarBaseHito3(group, contac, resul, table){

    contHito3 += 1
    baseDatosHito3.push(newEscalamientoHito3)
    arrayGrupoHito3.push(group)
    arrayContactoHito3.push(contac)
    arrayResultadoHito3.push(resul)

    table.innerHTML += `
    <tbody>
            <tr>
                <td class="border-0 font-weight-bold">${newEscalamientoHito3.grupo}<input type='hidden' id='tableEscalGrupoHito3_${contHito3}' name='tableEscalGrupoHito3' value='${arrayGrupoHito3}'></input></td>
                <td class="border-0 font-weight-bold">${newEscalamientoHito3.contacto}<input type='hidden' id='tableEscalContactoHito3_${contHito3}' name='tableEscalContactoHito3' value='${arrayContactoHito3}'></input></td>
                <td class="border-0 font-weight-bold">${newEscalamientoHito3.resultado}<input type='hidden' id='tableEscalResultadoHito3_${contHito3}' name='tableEscalResultadoHito3' value='${arrayResultadoHito3}'></input></td>
            </tr>
        </tbody>
    `
        
    selectRequiereDesplazamiento.disabled = true
    selectHorarioAcordado.disabled = true
    SelectTecnicoResponde.disabled = true
    SelectHorarioIndicado.disabled = true

    if(selectLogroResultadoHito3.value == 'Si'){

        divBtnAgregarEscalamientoHito3.className = 'divBtnAgregarEscalamientoHito3 col-lg-3 col-sm-6 pt-4 d-none' 
        divLogroResultadoHito3.className = 'divLogroResultadoHito3 col-lg-3 col-sm-6 mb-4 d-none'

    }

    
    
}

selectRequiereDesplazamiento.addEventListener('change', async () => {

    if(selectRequiereDesplazamiento.value == 'No'){
        divDesplazarPersonalTecnico.className = 'divDesplazarPersonalTecnico col-lg-4 col-sm-6 mb-4 d-none'
        divDesplazamientoSi.className = 'divDesplazamientoSi col-lg-5 col-sm-6 d-none'
        divDesplazamientoNo.className = 'divDesplazamientoNo col-lg-5 col-sm-6 d-none'
        divTecnicoRespondeSi.className = 'divTecnicoRespondeSi d-none'
        divTecnicoRespondeNo.className = 'divTecnicoRespondeNo d-none'
        selectHorarioAcordado.value = 'Si'
        SelectTecnicoResponde.value = 'Si'
        divTecnicoInfoHito3.className = 'divTecnicoInfoHito3 row mt-4 d-none'
    }else{

        divDesplazarPersonalTecnico.classList.remove('d-none')
        divDesplazamientoSi.classList.remove('d-none')
    }

})

selectHorarioAcordado.addEventListener('change', async () => {

    if(selectHorarioAcordado.value == 'No'){
        divDesplazamientoSi.className = 'divDesplazamientoSi col-lg-5 col-sm-6 d-none'
        divDesplazamientoNo.classList.remove('d-none')
        divTecnicoRespondeSi.classList.remove('d-none')
    }else{
        divDesplazamientoNo.className = 'divDesplazamientoNo col-lg-5 col-sm-6 d-none'
        divDesplazamientoSi.classList.remove('d-none')
        divTecnicoRespondeSi.className = 'divTecnicoRespondeSi d-none'
        divTecnicoRespondeNo.className = 'divTecnicoRespondeNo d-none'
        SelectTecnicoResponde.value = 'Si'
        SelectHorarioIndicado.value = 'Si'

        await LoadSelectedTecnicoHito3(idGrupoAsignado, idTecnicoAsignado, selectTecnicoHito3, inputCelularTecHito3)
        divTecnicoInfoHito3.className = 'divTecnicoInfoHito3 row mt-4 d-none'
        
    }

})

SelectTecnicoResponde.addEventListener('change', async () => {

    if(SelectTecnicoResponde.value == 'No'){

        await LoadSelectGrupo(SelectEscalamientoHito3)
        const idGrupo = SelectEscalamientoHito3.value
        await LoadSelectPersonalEscalamiento(idGrupo, selectContactoHito3)

        await LoadSelectedTecnicoHito3(idGrupoAsignado2, idTecnicoAsignado2, selectTecnico2Hito3, inputCelularTec2Hito3)

        divTecnicoRespondeSi.className = 'divTecnicoRespondeSi d-none'
        divTecnicoRespondeNo.classList.remove('d-none')
        divTecnicoInfoHito3.classList.remove('d-none')
    }else{
        divTecnicoRespondeNo.className = 'divTecnicoRespondeNo d-none'
        divTecnicoRespondeSi.classList.remove('d-none')
        divTecnicoInfoHito3.className = 'divTecnicoInfoHito3 row mt-4 d-none'
    }

})

SelectHorarioIndicado.addEventListener('change', async () => {

    if(SelectHorarioIndicado.value == 'No'){

        await LoadSelectGrupo(SelectEscalamientoHito3)
        const idGrupo = SelectEscalamientoHito3.value
        await LoadSelectPersonalEscalamiento(idGrupo, selectContactoHito3)

        divTecnicoRespondeNo.classList.remove('d-none')

        await LoadSelectedTecnicoHito3(idGrupoAsignado2, idTecnicoAsignado2, selectTecnico2Hito3, inputCelularTec2Hito3)
        divTecnicoInfoHito3.classList.remove('d-none')
    }else{
        divTecnicoRespondeNo.className = 'divTecnicoRespondeNo d-none'
        divTecnicoInfoHito3.className = 'divTecnicoInfoHito3 row mt-4 d-none'
        divTecnicoInfoHito3.disabled = false
    }

})

SelectEscalamientoHito3.addEventListener('change', async () => {

    const idGrupo = SelectEscalamientoHito3.value
    await LoadSelectPersonalEscalamiento(idGrupo, selectContactoHito3)

})

selectContactoHito3.addEventListener('change', async () => {

    const contacto_id = await selectContactoHito3.value

    if(contacto_id == '6042bea01c9a152cec8d62d1' || contacto_id == '6042beaf1c9a152cec8d62d2' || contacto_id == '6042bec11c9a152cec8d62d3'){
        
        divBtnAgregarEscalamientoHito3.className = 'divBtnAgregarEscalamientoHito3 col-lg-3 col-sm-6 pt-4 d-none'
        selectLogroResultadoHito3.value = 'Si'
        btnAgregarTablaHito3(SelectEscalamientoHito3, selectContactoHito3, selectLogroResultadoHito3, tablaEscalamiento2)

        divLogroResultadoHito3.className = 'divLogroResultadoHito3 col-lg-3 col-sm-6 mb-4 d-none'
        divTecnicoInfoHito3.classList.remove('d-none')
        selectTecnico2Hito3.disabled = false
        await LoadSelectedTecnicoHito3(idGrupoAsignado2, idTecnicoAsignado2, selectTecnico2Hito3, inputCelularTec2Hito3)

    }

})

selectLogroResultadoHito3.addEventListener('change', async () => {

    if(selectLogroResultadoHito3.value == 'No'){

        divTecnicoInfoHito3.className = 'divTecnicoInfoHito3 row mt-4 d-none'
        selectTecnico2Hito3.disabled = true

    }else{

        selectTecnico2Hito3.disabled = false
        await LoadSelectedTecnicoHito3(idGrupoAsignado2, idTecnicoAsignado2, selectTecnico2Hito3, inputCelularTec2Hito3)
        
        divTecnicoInfoHito3.classList.remove('d-none')
        

    }

})

selectTecnicoHito3.addEventListener('change', async () => {

    const idTecnico = await selectTecnicoHito3.value
    await LoadTelefonoTecnico(idTecnico, inputCelularTecHito3)

})

selectTecnico2Hito3.addEventListener('change', async () => {

    const idTecnico = await selectTecnico2Hito3.value
    await LoadTelefonoTecnico(idTecnico, inputCelularTec2Hito3)

})

formHito3.addEventListener("submit", async function (e) {
    e.preventDefault()

    const idDesplazamientoHito3 = document.querySelector('#idDesplazamientoHito3').value
    const idHorarioAcordadoHito3 = document.querySelector('#idHorarioAcordadoHito3').value
    const idTecnicoRespondeHito3 = document.querySelector('#idTecnicoRespondeHito3').value
    const idHorarioIndicadoHito3 = document.querySelector('#idHorarioIndicadoHito3').value

    if(idDesplazamientoHito3 != ''){
        selectRequiereDesplazamiento.disabled = false
    }

    if(idHorarioAcordadoHito3 != ''){
        selectHorarioAcordado.disabled = false
    }

    if(idTecnicoRespondeHito3 != ''){
        SelectTecnicoResponde.disabled = false
    }

    if(idHorarioIndicadoHito3 != ''){
       SelectHorarioIndicado.disabled = false
    }

    if(selectLogroResultadoHito3.value != ''){
        selectRequiereDesplazamiento.disabled = false
        selectHorarioAcordado.disabled = false
        SelectTecnicoResponde.disabled = false
        SelectHorarioIndicado.disabled = false
    }


    data = new FormData(formHito3)
    const object = {}
    data.forEach(function (value, key) {
        object[key] = value
    })
    const dataJson = JSON.stringify(object)

    await fetch('/api/update_hito3', {
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



// Hito 4


const formHito4 = document.querySelector('#formHito4')

const selectSolucion = document.querySelector('#solucion_hito4')
const selectValida = document.querySelector('#valida_hito4')
const selectMotivo = document.querySelector('#motivo_hito4')
const selectEscalamientoHito4 = document.querySelector('#informar_escalamiento_hito4')
const selectContactoHito4 = document.querySelector('#persona_contacto_hito4')
const selectLogroResultadoHito4 = document.querySelector('#logro_resultado_hito4')
const selectTipoSolucionHito4 = document.querySelector('#tipo_solucion_hito4')
const selectTipoSolucion2Hito4 = document.querySelector('#tipo_solucion2_hito4')

const inputCorreccionHito4 = document.querySelector('#correccion_hito4')

const tablaEscalamientoHito4 = document.querySelector('#tablaEscalamientoHito4')

const divSolucionSi = document.querySelector('.divSolucionSi')
const divSolucionSi2 = document.querySelector('.divSolucionSi2')
const divMotivo = document.querySelector('.divMotivo')
const divEscalamientoHito4 = document.querySelector('.divEscalamientoHito4')
const divPrueba = document.querySelector('.divPrueba')
const divBtnAgregarEscalamientoHito4 = document.querySelector('.divBtnAgregarEscalamientoHito4')
const divLogroResultadoHito4 = document.querySelector('.divLogroResultadoHito4')

const hito4_id = document.querySelector('#idHito4').value

async function loadChoiceHito4ToUpdate(){

    const idSolucionHito4 = document.querySelector('#idSolucionHito4').value
    const idValidaHito4 = document.querySelector('#idValidaHito4').value
    const idMotivoHito4 = document.querySelector('#idMotivoHito4').value
    const idLogroResultadoHito4 = document.querySelector('#idLogroResultadoHito4').value
    const idTipoSolucionHito4 = document.querySelector('#idTipoSolucionHito4').value
    const idTipoSolucion2Hito4 = document.querySelector('#idTipoSolucion2Hito4').value
    

    selectSolucion.value = idSolucionHito4
    selectValida.value = idValidaHito4
    selectMotivo.value = idMotivoHito4
    selectLogroResultadoHito4.value = idLogroResultadoHito4
    selectTipoSolucionHito4.value = idTipoSolucionHito4

    if(idTipoSolucion2Hito4 != '') selectTipoSolucion2Hito4.value = idTipoSolucion2Hito4

    selectSolucion.disabled = true
    selectValida.disabled = true
    selectMotivo.disabled = true

    if(selectSolucion.value == 'Si'){

        if(selectValida.value == 'No' && selectMotivo.value == '1'){
            divMotivo.classList.remove('d-none')
            if(selectLogroResultadoHito4.value == 'Si'){
                await LoadTableEscalamientoHito4()
                divSolucionSi2.classList.remove('d-none')
            }else{
                await LoadTableEscalamientoHito4()
                divEscalamientoHito4.classList.remove('d-none')
            }
        }

        if(selectValida.value == 'No' && selectMotivo.value == '2'){
            divMotivo.classList.remove('d-none')
            divPrueba.classList.remove('d-none')
        }

    }else{
        divSolucionSi.className = 'divSolucionSi col-lg-9 col-sm-6 d-none'
        divMotivo.classList.remove('d-none')

        if(selectMotivo.value == '1' && selectLogroResultadoHito4.value == 'Si'){
            await LoadTableEscalamientoHito4()
            divSolucionSi2.classList.remove('d-none')
        }

        if(selectMotivo.value == '1' && selectLogroResultadoHito4.value == 'No'){
            await LoadTableEscalamientoHito4()
            divEscalamientoHito4.classList.remove('d-none')
        }

        if(selectMotivo.value == '2'){
            divPrueba.classList.remove('d-none')
        }
    }

}

async function LoadTableEscalamientoHito4(){

    await LoadSelectGrupo(selectEscalamientoHito4)
    const idGrupo = selectEscalamientoHito4.value
    await LoadSelectPersonalEscalamiento(idGrupo, selectContactoHito4)

    tablaEscalamientoHito4.classList.remove('d-none')

    await fetch(`/api/hito4/${hito4_id}`)
    .then(res => res.json())
    .then(data => {
        const grupo_parts = data.lista_escalamiento_grupo.split(',')
        const contacto_parts = data.lista_escalamiento_contacto.split(',')
        const resultado_parts = data.lista_escalamiento_resultado.split(',')

        for (let i = 0; i < grupo_parts.length; i++) {

            contHito4 += 1

            const grupo = grupo_parts[i]
            const contacto = contacto_parts[i]
            const resultado = resultado_parts[i]

            arrayGrupoHito4.push(grupo)
            arrayContactoHito4.push(contacto)
            arrayResultadoHito4.push(resultado)

            tablaEscalamientoHito4.innerHTML += `
                                        <tbody>
                                                <tr>
                                                    <td class="border-0 font-weight-bold">${grupo}<input type='hidden' id='tableEscalGrupoHito4_${contHito4}' name='tableEscalGrupoHito4' value='${arrayGrupoHito4}'></input></td>
                                                    <td class="border-0 font-weight-bold">${contacto}<input type='hidden' id='tableEscalContactoHito4_${contHito4}' name='tableEscalContactoHito4' value='${arrayContactoHito4}'></input></td>
                                                    <td class="border-0 font-weight-bold">${resultado}<input type='hidden' id='tableEscalResultadoHito4_${contHito4}' name='tableEscalResultadoHito4' value='${arrayResultadoHito4}'></input></td>
                                                </tr>
                                            </tbody>
                                        `
        }
                
    })

}

selectSolucion.addEventListener('change', async ()=> {

    if(selectSolucion.value == 'No'){
        divSolucionSi.className = 'divSolucionSi col-lg-9 col-sm-6 d-none'
        divMotivo.classList.remove('d-none')
        divEscalamientoHito4.classList.remove('d-none')
        divPrueba.className = 'divPrueba col-lg-6 col-sm-6 d-none'
        selectMotivo.value = '1'

        await LoadSelectGrupo(selectEscalamientoHito4)
        const idGrupo = selectEscalamientoHito4.value
        await LoadSelectPersonalEscalamiento(idGrupo, selectContactoHito4)

    }else{
        selectValida.value = 'Si'
        divSolucionSi.classList.remove('d-none')
        divMotivo.className = 'divMotivo col-lg-3 col-sm-6 d-none'
        divEscalamientoHito4.className = 'divEscalamientoHito4 d-none'
        divPrueba.className = 'divPrueba col-lg-6 col-sm-6 d-none'
        selectMotivo.value = '1'
    }

})

selectValida.addEventListener('change', async ()=>{

    if(selectValida.value === 'No'){
        divMotivo.classList.remove('d-none')
        divEscalamientoHito4.classList.remove('d-none')

        await LoadSelectGrupo(selectEscalamientoHito4)
        const idGrupo = selectEscalamientoHito4.value
        await LoadSelectPersonalEscalamiento(idGrupo, selectContactoHito4)
    }else{
        divMotivo.className = 'divMotivo col-lg-3 col-sm-6 d-none'
        divEscalamientoHito4.className = 'divEscalamientoHito4 d-none'
        divPrueba.className = 'divPrueba col-lg-6 col-sm-6 d-none'
        selectMotivo.value = '1'
    }
})

selectMotivo.addEventListener('change', async ()=> {

    if(selectMotivo.value == '1'){
        divPrueba.className = 'divPrueba col-lg-6 col-sm-6 d-none'
        divEscalamientoHito4.classList.remove('d-none')
    }

    if(selectMotivo.value == '2'){
        divEscalamientoHito4.className = 'divEscalamientoHito4 d-none'
        divPrueba.classList.remove('d-none')
    }

})

selectEscalamientoHito4.addEventListener('change', async () => {

    const idGrupo = selectEscalamientoHito4.value
    await LoadSelectPersonalEscalamiento(idGrupo, selectContactoHito4)

})

selectContactoHito4.addEventListener('change', async () => {

    const contacto_id = await selectContactoHito4.value

    if(contacto_id == '6042bea01c9a152cec8d62d1' || contacto_id == '6042beaf1c9a152cec8d62d2' || contacto_id == '6042bec11c9a152cec8d62d3'){
        
        divEscalamientoHito4.className = 'divEscalamientoHito4 d-none'
        selectLogroResultadoHito4.value = 'Si'
        btnAgregarTablaHito4(selectEscalamientoHito4, selectContactoHito4, selectLogroResultadoHito4, tablaEscalamientoHito4)

        divLogroResultadoHito4.className = 'divLogroResultadoHito4 col-lg-3 col-sm-6 mb-4 d-none'
        divSolucionSi2.classList.remove('d-none')

    }

})

function btnAgregarTablaHito4(s1, s2, s3, table){

    function EscalamientoHito4(grupo, contacto, resultado){
        this.grupo = grupo
        this.contacto = contacto
        this.resultado = resultado
    }

    const grupo = s1.options[s1.selectedIndex].text
    const contacto = s2.options[s2.selectedIndex].text
    const resultado = s3.options[s3.selectedIndex].text
    newEscalamientoHito4 = new EscalamientoHito4(grupo, contacto, resultado)

    agregarBaseHito4(grupo, contacto, resultado, table)
    table.classList.remove('d-none')

}

let contHito4 = 0
const baseDatosHito4 = []
var arrayGrupoHito4 = new Array()
var arrayContactoHito4 = new Array()
var arrayResultadoHito4 = new Array()

function agregarBaseHito4(group, contac, resul, table){

    contHito4 += 1
    baseDatosHito4.push(newEscalamientoHito4)
    arrayGrupoHito4.push(group)
    arrayContactoHito4.push(contac)
    arrayResultadoHito4.push(resul)

    table.innerHTML += `
    <tbody>
            <tr>
                <td class="border-0 font-weight-bold">${newEscalamientoHito4.grupo}<input type='hidden' id='tableEscalGrupoHito4_${contHito4}' name='tableEscalGrupoHito4' value='${arrayGrupoHito4}'></input></td>
                <td class="border-0 font-weight-bold">${newEscalamientoHito4.contacto}<input type='hidden' id='tableEscalContactoHito4_${contHito4}' name='tableEscalContactoHito4' value='${arrayContactoHito4}'></input></td>
                <td class="border-0 font-weight-bold">${newEscalamientoHito4.resultado}<input type='hidden' id='tableEscalResultadoHito4_${contHito4}' name='tableEscalResultadoHito4' value='${arrayResultadoHito4}'></input></td>
            </tr>
        </tbody>
    `
        
    selectSolucion.disabled = true
    selectMotivo.disabled = true
    selectValida.disabled = true
    selectTipoSolucionHito4.disabled = true
    inputCorreccionHito4.disabled = true

    if(selectLogroResultadoHito4.value == 'Si'){

        divEscalamientoHito4.className = 'divEscalamientoHito4 d-none'
        divLogroResultadoHito4.className = 'divLogroResultadoHito4 col-lg-3 col-sm-6 mb-4 d-none'
        divSolucionSi2.classList.remove('d-none')

    }

}

formHito4.addEventListener("submit", async function (e) {
    e.preventDefault()

    // const idDesplazamientoHito3 = document.querySelector('#idDesplazamientoHito3').value
    // const idHorarioAcordadoHito3 = document.querySelector('#idHorarioAcordadoHito3').value
    // const idTecnicoRespondeHito3 = document.querySelector('#idTecnicoRespondeHito3').value
    // const idHorarioIndicadoHito3 = document.querySelector('#idHorarioIndicadoHito3').value

    // if(idDesplazamientoHito3 != ''){
    //     selectRequiereDesplazamiento.disabled = false
    // }

    // if(idHorarioAcordadoHito3 != ''){
    //     selectHorarioAcordado.disabled = false
    // }

    // if(idTecnicoRespondeHito3 != ''){
    //     SelectTecnicoResponde.disabled = false
    // }

    // if(idHorarioIndicadoHito3 != ''){
    //    SelectHorarioIndicado.disabled = false
    // }

    selectSolucion.disabled = false
    selectTipoSolucionHito4.disabled = false
    inputCorreccionHito4.disabled = false
    selectValida.disabled = false
    selectMotivo.disabled = false


    data = new FormData(formHito4)
    const object = {}
    data.forEach(function (value, key) {
        object[key] = value
    })
    const dataJson = JSON.stringify(object)

    await fetch('/api/update_hito4', {
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


// Hito 5

const formHito5 = document.querySelector('#formHito5')
const selectTipoAveria = document.querySelector('#tipo_averia_hito5')
const hito5_id = document.querySelector('#idHito5').value

async function loadChoiceHito5ToUpdate(){

    const idTipoAveria = document.querySelector('#idTipoAveria').value
    selectTipoAveria.value = idTipoAveria

}

formHito5.addEventListener("submit", async function (e) {
    e.preventDefault()

    data = new FormData(formHito5)
    const object = {}
    data.forEach(function (value, key) {
        object[key] = value
    })
    const dataJson = JSON.stringify(object)

    await fetch('/api/update_hito5', {
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

window.addEventListener('load', async () => {

    if(hito1_id != ''){
        await loadChoiceHito1ToUpdate()
    }else{
        await loadChoiceHito1()
    }

    if(hito2_id != ''){
        await loadChoiceHito2ToUpdate()
    }else{
        await loadChoiceHito2()
    }

    if(hito3_id != ''){
        await loadChoiceHito3ToUpdate()
    }else{
        await loadChoiceHito3()
    }

    if(hito4_id != ''){
        await loadChoiceHito4ToUpdate()
    }

    if(hito5_id != ''){
        await loadChoiceHito5ToUpdate()
    }

})