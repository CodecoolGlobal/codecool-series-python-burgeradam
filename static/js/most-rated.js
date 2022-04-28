import {dataHandler} from "./dataHandler.js";

const paginationInfo = {
    offset: 0,
    button: 0,
    sortingSelector: 'rating',
    sortingDirection: 'DESC'
}

function init() {
    createTable(paginationInfo.offset);
    pagination()
    sorting()
}

const flushTableContent = () => {
    const tableBody = document.querySelector('tbody')
    const table = document.querySelector('table')
    const emptyBody = document.createElement('tbody')
    table.replaceChild(emptyBody, tableBody)
}

const createTable = async (offset = 0,
                           selector = paginationInfo.sortingSelector,
                           filter_direction = paginationInfo.sortingDirection) => {
    dataHandler.getTable(offset, selector, filter_direction)
        .then(shows => {
            const tbody = document.querySelector('tbody')
            const headers = ['title', 'year', 'runtime', 'rating', 'genres', 'trailer', 'homepage']

            for (let length = 0; length < shows.length; length++) {
                const tr = document.createElement('tr')
                tbody.append(tr)

                for (let i = 0; i < headers.length; i++) {
                    const tdTitle = document.createElement('td')
                    tr.append(tdTitle)
                    if (!shows[length][headers[i]]) {
                        tdTitle.innerText = "no URL"
                    } else if (Object.values(headers)[i] === 'title' ||
                        Object.values(headers)[i] === 'trailer' ||
                        Object.values(headers)[i] === 'homepage') {
                        const link = document.createElement('a')
                        tdTitle.append(link)
                        link.setAttribute('target', '_blank')
                        link.setAttribute('href', shows[length][headers[i]])
                        link.innerText = shows[length][headers[i]]
                    } else {
                        tdTitle.innerText = shows[length][headers[i]]
                    }
                }
            }
        })
}

const pagination = async () => {
    dataHandler.getLength()
        .then(all_show_length => {
            const allRecord = all_show_length[0].count
            const allPages = Math.floor(all_show_length[0].count / 15)  //988 records were found instead of 1011
            for (let page = -1; page < allPages + 1; page++) {
                if (page === allPages) {
                    const nextButton = document.createElement('a')
                    nextButton.innerText = ">>"
                    const paginationDiv = document.querySelector('div[class=pagination]')
                    paginationDiv.append(nextButton)
                    nextButton.addEventListener('click', () => {
                        if (paginationInfo.button < allRecord) {
                            flushTableContent()
                            paginationInfo.button += 15
                            createTable(paginationInfo.button)
                        }
                    })
                } else if (page === -1) {
                    const previousButton = document.createElement('a')
                    previousButton.innerText = "<<"
                    const paginationDiv = document.querySelector('div[class=pagination]')
                    paginationDiv.append(previousButton)
                    previousButton.addEventListener('click', () => {
                        if (paginationInfo.button !== 0) {
                            flushTableContent()
                            paginationInfo.button -= 15
                            createTable(paginationInfo.button)
                        }
                    })
                } else {
                    const anchor = document.createElement('a')
                    anchor.setAttribute('page', page)
                    anchor.addEventListener("click", () => {
                        flushTableContent()
                        const page = anchor.getAttribute('page')
                        paginationInfo.offset = page * 15
                        paginationInfo.button = page * 15
                        createTable(paginationInfo.offset)
                        paginationInfo.offset = 0
                    })
                    anchor.innerText = (page + 1).toString()
                    const paginationDiv = document.querySelector('div[class = pagination]')
                    paginationDiv.append(anchor)
                }
            }
        })
}

const sorting = () => {
    const th_list = document.querySelectorAll('th[header_name]')
    th_list.forEach(element => {
        element.addEventListener('click', () => {
            const headerName = element.getAttribute('header_name')
            const direction = element.getAttribute('direction')
            paginationInfo.offset = 0
            paginationInfo.button = 0
            flushTableContent()
            if (direction === 'DESC') {
                createTable(0, headerName, 'DESC')
                paginationInfo.sortingSelector = headerName
                paginationInfo.sortingDirection = 'DESC'
                element.setAttribute('direction', '')
                const spanDiv = element.children[0]
                removeArrows()
                const content = `<i class='fas fa-angle-double-down' style='color: white'></i>`
                spanDiv.insertAdjacentHTML('beforeend', content)
            } else {
                createTable(0, headerName, 'ASC')
                paginationInfo.sortingSelector = headerName
                paginationInfo.sortingDirection = 'ASC'
                element.setAttribute('direction', 'DESC')
                const spanDiv = element.children[0]
                removeArrows()
                const content = `<i class='fas fa-angle-double-up' style='color: white'></i>`
                spanDiv.insertAdjacentHTML('beforeend', content)
            }
        })
    })
}

const removeArrows = () => {
    const th_list = document.querySelectorAll('th[header_name]')
    th_list.forEach(element => {
        const elementChild = element.children[0]
        if (elementChild.children[0]) {
            elementChild.removeChild(elementChild.children[0])
        }
    })
}


init()