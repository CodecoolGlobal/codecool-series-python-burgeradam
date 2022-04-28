export let dataHandler = {
    getTable: async function (offset, selector, filter_direction) {
        return await apiGet(`/shows/most-rated/${offset}/${selector}/${filter_direction}`)
        // the board is retrieved and then the callback function is called with the board
    },
    getLength: async function () {
        return await apiGet(`/shows/length`)
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}
