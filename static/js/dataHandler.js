export const dataHandler = {
    getSearch: async (usr_input) => {
        return await apiGet(`/api/search/${usr_input}`, usr_input)
    }
}

async function apiGet(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        return await response.json()
    }
}