export const dataHandler = {
    getFilteredShow: (user_input) => {
        return getApi(`/api/filtered_shows/${user_input}`)
    }
}

async function getApi(url) {
    const response = await fetch(url)
    if (response.ok) {
        return await response.json()
    }
}