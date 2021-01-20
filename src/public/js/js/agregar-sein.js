const formSEIN = document.querySelector('#formSEIN')
const listTension = document.querySelector('#listTension')
const btnTension = document.querySelector('#btnTension')

let cont = 0

listTension.innerHTML = ''

btnTension.addEventListener('click', () => {
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
    input.id = 'tension' + cont
    input.name = 'tension'
    divInput.appendChild(input);

    let btn = document.createElement("a")
    btn.setAttribute('class', 'btn btn-primary float-right mt-0')
    btn.setAttribute('onclick', `borrarItem('#tension${cont}')`)
    btn.id = 'btnEliminar'
    divBtn.appendChild(btn);

    let span = document.createElement('span')
    span.setAttribute('class', 'fas fa-trash-alt')
    btn.appendChild(span)

})

function borrarItem(itemTension) {
    const divTension = document.querySelector(itemTension);
    divTension.parentNode.removeChild(divTension);
}

formSEIN.addEventListener('submit', (e) => {
    e.preventDefault()
    formSEIN.submit()
})