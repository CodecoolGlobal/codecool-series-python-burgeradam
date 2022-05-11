import {dataHandler} from "./dataHandler.js";

const select = document.querySelector('select')
const divCard = document.querySelector('div[class="card"]')

//creating listener for select
select.addEventListener('change', () => {
    const showId = select.options[select.selectedIndex].dataset.showId
    if (showId === 'false') {
        divCard.innerHTML = ''
    } else {
    dataHandler.getShowInfo(showId)
        .then(data => {
            deleteTable()
            createTable(data)
        })
    }
})

function deleteTable() {
    divCard.innerHTML = ''
}

function createTable(show_info) {
    const table = document.createElement('table')
    const tHead = document.createElement('thead')
    const trHead = document.createElement('tr')
    tHead.append(trHead)

    //creating title rows
    const thYear = document.createElement('th')
    thYear.innerText = 'Year'
    const thNumOfSeasons = document.createElement('th')
    thNumOfSeasons.innerText = 'Number of seasons'
    const thRating = document.createElement('th')
    thRating.innerText = 'Rating'
    trHead.append(thYear, thNumOfSeasons, thRating)

    //creating body rows
    const tBody = document.createElement('tbody')

    const tr = document.createElement('tr')
    const tdYear = document.createElement('td')
    tdYear.innerText = show_info[0].year
    const tdNumOfSeasons = document.createElement('td')
    tdNumOfSeasons.innerText = show_info[0].num_of_seasons
    const tdRating = document.createElement('td')
    tdRating.innerText = '*'.repeat(show_info[0].rating)
    tr.append(tdYear, tdNumOfSeasons, tdRating)
    tBody.append(tr)

    table.append(tHead, tBody)
    divCard.append(table)
}