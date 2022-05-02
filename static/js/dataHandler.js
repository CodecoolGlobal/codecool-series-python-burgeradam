export const dataHandler = {
    getAverageActors: async (user_input) => {
        return await apiGet(`/api/get_year/${user_input}`)
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