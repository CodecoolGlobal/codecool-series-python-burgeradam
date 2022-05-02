import {dataHandler} from "./dataHandler.js";


const section =document.querySelector('section')
const divCard = document.createElement('div')
divCard.classList.add('card')
section.append(divCard)

const get_user_input = () => {
    return  document.querySelector('input[type="search"]').value
}

const input = document.querySelector('input')
input.addEventListener('input',  () => {
    dataHandler.getSearch(get_user_input())
        .then(tableData => {
            flushTable()
            createTable(tableData)
        })
})

function flushTable () {
    if (document.querySelector('table')) {
        const getTable = document.querySelector('table')
        divCard.removeChild(getTable)
    }
}

function createTable(data) {
    const table = document.createElement('table')
    divCard.append(table)
    const thead = document.createElement('thead')
    const thTitle = document.createElement('th')
    thTitle.innerText = "Title"
    const thRating = document.createElement('th')
    thRating.innerText = "Rating"
    const thYear = document.createElement('th')
    thYear.innerText = "Start date"
    const thTrailer = document.createElement('th')
    thTrailer.innerText = "Trailer"
    thead.append(thTitle, thRating, thYear, thTrailer)
    const tbody = document.createElement('tbody')
    table.append(thead, tbody)
    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('tr')

        const tdTitle = document.createElement('td')
        tdTitle.innerText = data[i].title
        tr.appendChild(tdTitle)

        const tdRating = document.createElement('td')
        tdRating.innerText = data[i].rating
        tr.appendChild(tdRating)

        const tdYear = document.createElement('td')
        tdYear.innerText = data[i].year
        tr.appendChild(tdYear)

        const tdTrailer = document.createElement('td')
        tr.appendChild(tdTrailer)
        const button = document.createElement('button')
        tdTrailer.appendChild(button)
        button.innerText = "Watch trailer"
        button.addEventListener('click',  () => {
        })

        //data[i].trailer
        tbody.append(tr)
    }
}