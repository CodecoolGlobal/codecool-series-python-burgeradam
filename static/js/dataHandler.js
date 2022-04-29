export let dataHandler = {
    getEpisodes: async function () {
        return await apiGet('/api/episodes')
    }
}

async function apiGet(url) {
    let response = await fetch(url, {
        method: 'GET'
    });
    if (response.ok) {
        return await response.json();
    }
}