import {dataHandler} from "./dataHandler.js";

const getDivCard = document.querySelector('div[class="card"]')

dataHandler.getActors()
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            createDiv(data[i])
        }
        colorize_div(data)
    })

function createDiv(data) {
    const divCard = cr('div')
    divCard.classList.add('name_card')
    const getSection = document.querySelector('section')
    getSection.append(divCard)

    const divUpper = cr('div', `${data.name} (${data.age})`)
    const divBottom = cr('div', `${data.number_of_shows} show(s)`)
    divCard.append(divUpper, divBottom)
}

function cr(tagName, text) {
    const element = document.createElement(tagName)
    if (text) {
        element.innerText = text
    }
    return element
}

function colorize_div(data) {
    const getDivNameCard = document.querySelectorAll('div[class="name_card"]')
    console.log(data)

    for (let i = 0; i < getDivNameCard.length; i++) {
        getDivNameCard[i].addEventListener('mouseenter', () => {
            if (data[i].dead_or_alive === 'alive') {
                    getDivNameCard[i].classList.add('green')
                } else if (data[i].dead_or_alive === 'deceased') {
                    getDivNameCard[i].classList.add('red')
                } else {
                    getDivNameCard[i].classList.add('fictional')
                }
        })
        getDivNameCard[i].addEventListener('mouseout', () => {
            getDivNameCard[i].classList.remove('green', 'red', 'fictional')
        })
    }
}

