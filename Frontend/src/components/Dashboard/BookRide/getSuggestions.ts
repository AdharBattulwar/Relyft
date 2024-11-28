import axios from "axios"

export const getSuggestions = async (query: string) => {
    const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=en&country=in&limit=10&session_token=[GENERATED-UUID]&proximity=-83.748708,42.265837&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`)
    return response;
}