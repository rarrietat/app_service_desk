const file = document.querySelector('#fileUpload')
const listFile = document.querySelector('#listFile')
let averia = document.querySelector('#averia')

file.addEventListener('change', async () => {

    const formAsignarAveria = document.querySelector('#formAsignarAveria')
    data = new FormData(formAsignarAveria)
    console.log(data)

    averia.innerHTML = ''

    if(file.files.length != 0){

        await fetch('/asignacion/upload', {
            method: "POST",
            body: data
        })
        .then(async res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(async (file) => {
            console.log(file)

            file.forEach(async element => {

                let nro_incidencia = element['ID de la incidencia']
                let cliente = element['Empresa cliente']
                let resumen = element['Resumen']
                let estado_inc = element['Estado de la incidencia']
                let prioridad = element['Prioridad']
                let segmento = element['Apellidos del cliente']
                let plazo = element['Nombre del cliente']
                let fecha = element['Fecha de notificación']
                let estado_sla = element['Estado de resolución de SLA']
                let escalado = element['¿Escalado?']
                let grupo_asignado = element['Grupo asignado']
                let usuario_asignado = element['Usuario asignado']
                let nota = element['Notas']
                let tipo_inc = element['Tipo de incidencia']

                averia.innerHTML += `<tr>
                                        <td class="h5">${nro_incidencia}</td>
                                        <td class="h5">${cliente}</td>
                                        <td class="limitTextColum">${resumen}</td>
                                        <td>${estado_inc}</td>
                                        <td>${prioridad}</td>
                                        <td>${segmento}</td>
                                        <td>${plazo}</td>
                                        <td>${fecha}</td>
                                        <td>${estado_sla}</td>
                                        <td class="h5">${escalado}</td>
                                        <td class="h5">${grupo_asignado}</td>
                                        <td class="h5">${usuario_asignado}</td>
                                        <td class="limitTextColum">${nota}</td>
                                        <td class="h5">${tipo_inc}</td>
                                        <td class="h5">${element.usuario}</td>
                                    </tr>`
        
            })
        })
        .catch((error) => {
            console.log(error);
        })


    }

    formAsignarAveria.reset()
    
})

// async function itemFilesToUpdate() {

//     const incidente_id = document.querySelector('#idIncidente').value

//     console.log(incidente_id)

//     await fetch('/api/files_incidente/'+incidente_id)
//     .then(res => res.json())
//     .then(data => {
//         data.forEach(async listFiles => {
//             await addItemFile(listFiles.ruta_file, listFiles.name_file)
//         })
//     })

// }

// function addItemFile(ruta_file, name_file) {

//     const ruta = `${ruta_file}${name_file}`

//     cont += 1

//     let div = document.createElement("div")
//     div.id = 'fileCot' + cont
//     listFile.appendChild(div)

//     let input = document.createElement("input")
//     input.type = 'hidden'
//     input.name = 'listFile'
//     input.value = name_file
//     div.appendChild(input)

//     let span = document.createElement("a")
//     span.innerHTML = name_file
//     span.id = `fileCot${cont}_name`
//     span.setAttribute('href', ruta)
//     span.setAttribute('download', name_file)
//     span.setAttribute('target', '_blank')
//     span.setAttribute('class', 'text-info')
//     div.appendChild(span)

//     let a = document.createElement("a")
//     a.type = 'button'
//     a.setAttribute('class', 'btn btn-xs btn-danger mx-2')
//     a.setAttribute('onclick', `borrarItem('#fileCot${cont}')`)
//     div.appendChild(a)

//     let spanIcon = document.createElement("span")
//     spanIcon.setAttribute('class', 'fas fa-trash-alt')
//     a.appendChild(spanIcon)
// }

// async function borrarItem(itemFile) {

//     const nro_incidente = document.querySelector('#idNroIncidente').value
//     const divFile = document.querySelector(itemFile)
//     const name_file = document.querySelector(`${itemFile}_name`).text

//     Swal.fire({
//         title: '¿Estás seguro?',
//         text: "¡No podrás revertir esto!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: '¡Sí, bórralo!',
//         cancelButtonText: 'Cancelar'
//     }).then(async (result) => {
//         if (result.isConfirmed) {

//             await fetch(`/incidente/delete_file/${nro_incidente}/${name_file}`)
//                 .then(async res => {
//                     if (res.ok) {
//                         console.log(res.status)
//                         divFile.parentNode.removeChild(divFile)
//                     }
//                 })

//         }
//     })

// }

// window.addEventListener('load', () => {

//     if(incidente_id != null){
//         itemFilesToUpdate()
//     }

// })