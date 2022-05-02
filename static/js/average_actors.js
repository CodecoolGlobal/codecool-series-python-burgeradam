import {dataHandler} from "./dataHandler.js";

//create DOM elements
const getSection = document.querySelector('section')
const inputField = cr('input')
inputField.setAttribute('type', 'search')
const button = cr('button')
button.innerText = 'search'
const well_formatted_div = cr('div')
well_formatted_div.classList.add('well-formatted')
getSection.append(inputField, button, well_formatted_div)

//button event listener
button.addEventListener('click', () => {
    const inputValue = document.querySelector('input').value
    if (inputValue.length === 4) {
        dataHandler.getAverageActors(inputValue)
            .then(data => {
                // console.log(data)
                for (let divElement of data) {
                    const wellFormattedDiv = document.querySelector('div[class="well-formatted"]')
                    const divMainCard = cr('div')
                    wellFormattedDiv.append(divMainCard)

                    const divName = cr('div', divElement.name)
                    const divBirthday = cr('div', divElement.birthday)
                    const divRating = cr('div', divElement.average_rating)
                    divRating.setAttribute('class', 'rating')

                    divMainCard.append(divName, divBirthday, divRating)

                    divRating.addEventListener('click', (element) => {
                        element.target.innerText = (parseFloat(element.target.innerText) + 0.1).toFixed(2).toString()
                    })
                    divRating.addEventListener('contextmenu', (element) => {
                        element.preventDefault()
                        element.target.innerText = (parseFloat(element.target.innerText) - 0.1).toFixed(2).toString()
                    })
                }
            })
    } else {
        console.log("not enough character")
    }
})

function cr(tag_name, text) {
    const crElement = document.createElement(tag_name)
    if (text) {
        crElement.innerText = text
    }
    return crElement
}