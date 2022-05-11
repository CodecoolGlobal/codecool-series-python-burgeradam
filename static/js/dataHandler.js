export const dataHandler = {
    getShowInfo: (show_id) => {
        return apiGet(`/api/show-info/${show_id}`)
    }
}

async function apiGet(url) {
    const response = await fetch(url, {
        method: 'GET'
    })
    if (response.ok) {
        return await response.json()
    }
}