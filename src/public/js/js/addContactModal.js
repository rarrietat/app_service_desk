const myForm = document.querySelector('#modalFormAddContac')
const modalAgregarContacto = document.querySelector('#modal-agregarContacto')

myForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const cuenta_id = document.querySelector('#modalAddContacEmpresa').value
    const selectContacto = document.querySelector('#contacto')
    choiceContacto.destroy()
    selectContacto.innerHTML = ''

    const closeModal = document.querySelector('#modal-agregarContacto .close')

    const data = new FormData(myForm)
    const object = {}
    data.forEach(function (value, key) {
        object[key] = value
    })
    const dataJson = JSON.stringify(object)

    await fetch('/api/add_contacto_modal', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataJson
        })
        .then(async res => {
            if (res.ok) {
                fetch(`/api/contactos/${cuenta_id}`)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(listContactos => {
                            selectContacto.innerHTML += `<option value="${listContactos.contacto_id}">${listContactos.nombre_contacto} ${listContactos.apellido_contacto}</option>`
                        })
                        choiceContacto = new Choices(selectContacto);
                    })
                closeModal.click()
                return res.json() // <- parseamos el response y lo devolvemos a nuestra función
            }
        })
        .then((resParsed) => {
            console.log(resParsed); // <- mostramos los datos recibidos, luego de ser parseados
        })
        .catch((error) => {
            console.log(error);
        })

})

modalAgregarContacto.addEventListener('hidden.bs.modal', function () {
    myForm.reset()
})