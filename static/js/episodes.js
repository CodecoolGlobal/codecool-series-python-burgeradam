import {dataHandler} from "./dataHandler.js";

const getEpisodes = async () => {
    dataHandler.getEpisodes()
        .then(tableData => {
            const table = document.createElement('table')
            const tableDiv = document.querySelector('div[class=table]')
            tableDiv.append(table)



            const thead = document.createElement('thead')
            table.append(thead)
            const trHead = document.createElement('tr')
            thead.append(trHead)
            const thTitle = document.createElement('th')
            thTitle.innerText = "Title"
            const thCount = document.createElement('th')
            thCount.innerText = "Episode count"
            trHead.append(thTitle, thCount)
            const tbody = document.createElement('tbody')
            table.append(tbody)
            tableData.forEach(element => {
                const tr = document.createElement('tr')
                if (element.count % 2 === 0) {
                    tr.style.background = '#b2ff9c'
                } else {
                    tr.style.background = '#8fa1fc'
                }
                tbody.append(tr)
                const tdTitle = document.createElement('td')
                tdTitle.innerText = element.title
                const tdEpisodecount = document.createElement('td')
                tdEpisodecount.innerText = element.count
                tr.append(tdTitle, tdEpisodecount)
                if (element.is_long) {
                    const content = `<i class="fa-compress"></i>`
                    tdEpisodecount.insertAdjacentHTML('beforeend', content)
                } else {
                    const content = `<i class="fa-expand"></i>`
                    tdEpisodecount.insertAdjacentHTML('beforeend', content)
                }
            })

        })
}


getEpisodes()