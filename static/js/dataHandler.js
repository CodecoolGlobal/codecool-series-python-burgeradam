export const dataHandler = {
    getActors: async (inputId) => {
        return await apiGet(`/api/actors/${inputId}`)
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