import axios from 'axios';
import { no_poster } from '../assets';
import { API_KEY, API_URL, IMAGE_URL } from './Config';

export const popularMovie = async (query, page) => {
    try {
        const { data } = await axios.get(`${API_URL}movie/popular`, {
            params: {
                api_key: API_KEY,
                query,
                page
            }
        })
        const modifiedData = {
            ...data,
            results: data.results.map((movie) => ({
                ...movie,
                poster_path: movie.poster_path
                    ? IMAGE_URL + 'w300_and_h450_bestv2' + movie.poster_path
                    : no_poster
            }))
        }
        return modifiedData;
    } catch (e) {
        console.log(e);
    }
}
