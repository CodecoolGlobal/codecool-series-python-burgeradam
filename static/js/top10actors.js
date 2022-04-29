const getAlliTag = document.querySelectorAll('i')
getAlliTag.forEach( iTag => {
    iTag.addEventListener('click', () => {
    iTag.classList.toggle('medal')
    })
})