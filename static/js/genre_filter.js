import {dataHandler} from "./dataHandler.js";

const section = document.querySelector('section')

const divCard = document.createElement('div')
divCard.classList.add('card')
section.append(divCard)

const buttons = document.querySelectorAll('button[class="genre_filter"]')

function dataHandling(element) {
    const genreId = element.dataset.genreId
    dataHandler.getFilteredShow(genreId)
        .then(data => {
            divCard.innerHTML = ''
            createTable(data)
        })
}

buttons.forEach(element => {
    element.addEventListener('click', () => {
        dataHandling(element);
    })
})


function createTable(data) {
    const table = createElment('table')
    divCard.append(table)
    const thead = createElment('thead')
    const trHead = createElment('tr')
    thead.appendChild(trHead)
    const thTitle = createElment('th', data.title)
    const thYear = createElment('th', data.date_part)
    const thRating = createElment('th', data.rating)
    trHead.append(thTitle, thYear, thRating)
    const tbody = createElment('tbody')
    for (let row of data) {
        const tr = createElment('tr')
        tbody.append(tr)
        const tdTitle = createElment('td' , row.title)
        const tdYear = createElment('td', row.date_part)
        const tdRating = createElment('td', row.rating)
        tr.append(tdTitle, tdYear, tdRating)
    }
    table.append(thead, tbody)
}

function createElment(tag_name, text) {
    const element = document.createElement(tag_name)
    if (text) {
        element.innerText = text
    }
    return element
}
