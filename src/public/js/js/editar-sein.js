const idSEIN = document.querySelector('#idSEIN').value
const listTension = document.querySelector('#listTension')
const inputTension = document.querySelector('#tension')
const inputIdTension = document.querySelector('#id_tension')

let cont = 0

listTension.innerHTML = ''

fetch('/api/sein/edit/' + idSEIN)
    .then(res => res.json())
    .then(data => {
        data.tension.forEach((element, index) => {
            if (index === 0) {
                inputTension.value = element.valor
                inputIdTension.value = element._id
                console.log(element._id)
            } else {
                crearInputTension(element.valor, element._id)
            }
        });
    })

btnTension.addEventListener('click', () => {
    crearInputTension('','')
})

function crearInputTension(valor, id) {
    cont += 1

    let divRow = document.createElement("div");
    divRow.setAttribute('class', 'row');
    divRow.id = 'tension' + cont
    listTension.appendChild(divRow);

    let divInput = document.createElement("div");
    divInput.setAttribute('class', 'col-10 mb-4');
    divRow.appendChild(divInput)

    let divBtn = document.createElement("div");
    divBtn.setAttribute('class', 'col-2 mb-4');
    divRow.appendChild(divBtn)

    let input = document.createElement("input")
    input.type = 'text'
    input.setAttribute('class', 'form-control')
    input.id = 'tension'
    input.name = 'tension'
    input.value = valor
    divInput.appendChild(input);

    //if(id !== ''){
        let hidden = document.createElement("input")
        hidden.type = 'hidden'
        hidden.setAttribute('class', 'form-control')
        hidden.id = 'id_tension'
        hidden.name = 'id_tension'
        hidden.value = id
        divInput.appendChild(hidden);
    //}

    let btn = document.createElement("a")
    btn.setAttribute('class', 'btn btn-primary float-right mt-0')
    btn.setAttribute('onclick', `borrarItem('#tension${cont}')`)
    btn.id = 'btnEliminar'
    divBtn.appendChild(btn);

    let span = document.createElement('span')
    span.setAttribute('class', 'fas fa-trash-alt')
    btn.appendChild(span)
}

function borrarItem(itemTension) {
    const divTension = document.querySelector(itemTension);
    divTension.parentNode.removeChild(divTension);
}

formSEIN.addEventListener('submit', (e) => {
    e.preventDefault()
    formSEIN.submit()
})