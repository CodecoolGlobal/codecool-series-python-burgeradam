import {dataHandler} from "./dataHandler.js";

const getAllShows = document.querySelectorAll('tr[data-show-id]')
const divCard = document.querySelector('.card')


getAllShows.forEach( (element) => {
    element.addEventListener('mouseenter', mouseEnterHandler, {capture: true})  // false - bubbling upwards (default), true - bubbling downwards, capture is not necessary
    element.addEventListener('mouseout', () => {
        deleteTable()
    })
})

function mouseEnterHandler (e) {
        const getDataShowId = e.currentTarget.dataset.showId
        dataHandler.getActors(getDataShowId)
            .then(data => {
                createActorTable(data)
            })
    }

function deleteTable () {
    const getActorsTable = document.querySelector('table#actors')
    if (getActorsTable) {
        divCard.removeChild(getActorsTable)
    }
}

function createActorTable (data) {
    deleteTable()
    const table = cr('table')
    table.id = 'actors'
    divCard.append(table)
    const thead = cr('thead')
    const tbody = cr('tbody')
    table.append(thead, tbody)
    const headTr = cr('tr')
    thead.append(headTr)

    const thActor = cr('th', 'Actor')
    const thAge = cr('th', 'Age')
    const thChars = cr('th', 'Number of characters')
    headTr.append(thActor, thAge, thChars)

    for (let row of data) {
        const tr = cr('tr')
        tbody.append(tr)
        const tdActor = cr('td', row.name)
        const tdAge = cr('td', row.age)
        const tdChars = cr('td', row.num_of_chars)
        tr.append(tdActor,  tdAge, tdChars)
    }
}

function cr(tagName, text) {
    const createDocument = document.createElement(tagName)
    if (text) {
        createDocument.innerText = text
    }
    return createDocument
}