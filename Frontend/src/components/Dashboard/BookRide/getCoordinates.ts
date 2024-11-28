import axios from "axios"

const getCoordinates = async (address_mapboxId: string) => {
    const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/retrieve/${address_mapboxId}?session_token=[GENERATED-UUID]&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`)
    return response.data.features[0].geometry.coordinates;
}

export default getCoordinates