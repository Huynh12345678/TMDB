import axios from "axios";
import { API_KEY, API_URL } from './Config';
export const fetchPopular = async (type) => {
    try {
        const { data } = await axios.get(`${API_URL}${type}/popular`, {
            params: {
                api_key: API_KEY,
            },
        });
        const checkData = data.results.map((item) => ({
            ...item,
            // backdrop_path: item.backdrop_path ? IMAGE_URL + 'w1280' + item.backdrop_path : no_image
        }))
        return checkData;

    } catch (e) {
        console.log(e);
    }
}