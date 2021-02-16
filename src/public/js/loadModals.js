async function btnModalAsignacion(asig_id) {

    const idAsig = document.querySelector('#modalIdAsig')
    const nro_incidencia = document.querySelector('#modalAsigNroInc')
    const cliente = document.querySelector('#modalAsigCliente')
    const resumen = document.querySelector('#modalAsigResumen')
    const estado_inc = document.querySelector('#modalAsigEstInc')
    const prioridad = document.querySelector('#modalAsigPrioridad')
    const segmento = document.querySelector('#modalAsigSegmento')
    const plazo = document.querySelector('#modalAsigPlazo')
    const fecha = document.querySelector('#modalAsigFecha')
    const estado_sla = document.querySelector('#modalAsigEstSla')
    const escalado = document.querySelector('#modalAsigEscalado')
    const grupo_asig = document.querySelector('#modalAsigGrupo')
    const usuario_asig = document.querySelector('#modalAsigUsuario')
    const nota = document.querySelector('#modalAsigNota')
    const tipo_inc = document.querySelector('#modalAsigTipo')
    const usuario = document.querySelector('#modalAsigAsesor')

    idAsig.value = asig_id
    
    await fetch('/api/asignacion/'+asig_id)
        .then(res => res.json())
        .then(data => {
            nro_incidencia.innerHTML = 'Incidencia nro. '+data.nro_incidencia
            nota.innerHTML = data.nota
            cliente.innerHTML = data.cliente
            resumen.innerHTML = data.resumen
            estado_inc.innerHTML = data.estado_inc
            prioridad.innerHTML = data.prioridad
            segmento.innerHTML = data.segmento
            plazo.innerHTML = data.plazo
            grupo_asig.innerHTML = data.grupo_asignado
            usuario_asig.innerHTML = data.usuario_asignado
            fecha.innerHTML = data.fecha
            estado_sla.innerHTML = data.estado_sla
            escalado.innerHTML = data.escalado
            tipo_inc.innerHTML = data.tipo_inc
            usuario.innerHTML = data.usuario
        })

    // modalBtnEditOpor.href = '/oportunidad/edit/'+opor_id
    // modalBtnAddAct.href = '/actividad/add/'+opor_id

}