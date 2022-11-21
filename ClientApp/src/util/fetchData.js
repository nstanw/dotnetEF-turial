export const PREFIX = 'https://localhost:5001/api/Notes/'

export const patchAPI = async (endpoint, data) => {
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const dataRespose = response.json();
        return dataRespose;
}

export const getAPI = async (endpoint) => {
        const response = await fetch(endpoint)
        const dataRespose = response.json();
        return dataRespose;
}