import axios from 'axios';
import { no_poster } from '../assets';
import { API_KEY, API_URL, IMAGE_URL } from './Config';

export const popularTv = async (query, page) => {
    try {
        const { data } = await axios.get(`${API_URL}tv/popular`, {
            params: {
                api_key: API_KEY,
                query,
                page
            }
        })
        const modifiedData = {
            ...data,
            results: data.results.map((tv) => ({
                ...tv,
                poster_path: tv.poster_path
                    ? IMAGE_URL + 'w300_and_h450_bestv2' + tv.poster_path
                    : no_poster
            }))
        }
        return modifiedData;
    } catch (e) {
        console.log(e);
    }
}
