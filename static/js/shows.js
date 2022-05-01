const rowTitle = document.querySelectorAll('td[title]')
const rowActors = document.querySelectorAll('td[actors]')
let i = -1

const counter = (element) => {
    if (element) {
        i++
    }
    return i
}

rowTitle.forEach(element => {
    const index = counter(element)
    element.addEventListener('mouseenter', () => {
        rowActors[index].classList.add('colorize')
    })
    element.addEventListener('mouseout', () => {
        rowActors[index].classList.remove('colorize')
    })
})


i = -1
rowActors.forEach(element => {
    const index = counter(element)
    element.addEventListener('mouseenter', () => {
        rowTitle[index].classList.add('colorize')
    })
    element.addEventListener('mouseout', () => {
        rowTitle[index].classList.remove('colorize')
    })
})
