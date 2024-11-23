import axios from "axios"

export const getSuggestions = async (query: string) => {
    const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=en&country=in&limit=10&session_token=[GENERATED-UUID]&proximity=-83.748708,42.265837&access_token=pk.eyJ1IjoiYWRoYXJiYXR0dWx3YXIiLCJhIjoiY20zbzVqcTJ2MDAwcTJrcXVtNnZ5Y3cwOCJ9.TgqFqGcmxuiRIzShx4DPRA`)
    console.log(response);
    return response;
}