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
            tdColorize()
        })
}

buttons.forEach(element => {
    element.addEventListener('click', () => {
        dataHandling(element);
    })
})

function tdColorize() {
    const tdElements = document.querySelectorAll('td')
    tdElements.forEach(element => {
        element.addEventListener('click', () => {
            element.classList.toggle('colorize')
        })
    })
}

function createTable(data) {
    const table = createElment('table')
    divCard.append(table)
    const thead = createElment('thead')
    const trHead = createElment('tr')
    thead.appendChild(trHead)
    const thTitle = createElment('th', 'Title')
    const thYear = createElment('th', 'Year')
    const thRating = createElment('th', 'Rating')
    trHead.append(thTitle, thYear, thRating)
    const tbody = createElment('tbody')
    for (let row of data) {
        const tr = createElment('tr')
        tbody.append(tr)
        const tdTitle = createElment('td' , row.title)
        const tdYear = createElment('td', row.year)
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
