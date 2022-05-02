export const dataHandler = {
    getActors: async () => {
        return await apiGet('/api/most_active')
    }
}

async function apiGet(url) {
    const response = await fetch(url, {
        method: 'GET'
    })
    if (response.ok) {
        return response.json()
    }
}