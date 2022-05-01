const row = document.querySelectorAll('td[title]')
row.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const get_td = document.querySelectorAll('td[actors]')

        get_td.classList.add('colorize')
    })
    element.addEventListener('mouseout', () => {
        const get_td = document.querySelector('td[actors]')
        get_td.classList.remove('colorize')
    })
})