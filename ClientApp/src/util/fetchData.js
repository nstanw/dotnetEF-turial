export const PREFIX = 'https://localhost:5001/api/Notes/'

export const fetchGet = (
    async (Url) => {
        try {
            const endpoint = Url;
            const response = await fetch(endpoint)
            const data = response.json();
            return data;
        } catch (error) {
            return error
        }
      
    }
)