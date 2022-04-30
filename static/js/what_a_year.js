const getDivs = document.querySelectorAll('div[class="box"]')

const rating_aggregation = {
    value: 0,
    marked: 0
}

getDivs.forEach(element => {
    element.addEventListener('click', () => {
        const tableStyle = element.children[0]
        tableStyle.classList.toggle('marked')
        if (tableStyle.getAttribute('class') === 'marked') {
            const get_rating = element.querySelector('div[rating]').innerHTML
            rating_aggregation.value += parseInt(get_rating)
            rating_aggregation.marked += 1
        } else {
            const get_rating = element.querySelector('div[rating]').innerHTML
            rating_aggregation.value -= parseInt(get_rating)
            rating_aggregation.marked -= 1
        }
        counting()
    })
})

function counting() {
    pTag.innerText = (rating_aggregation.value / rating_aggregation.marked).toFixed(2)
}

const pTag = document.createElement('p')
const getRatingDiv = document.querySelector('div[rating_aggregation]')
getRatingDiv.append(pTag)
