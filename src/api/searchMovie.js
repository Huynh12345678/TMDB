import axios from 'axios';
import { no_poster } from '../assets';
import { API_KEY, API_URL, IMAGE_URL } from './Config';

export const searchMovie = async (query, page) => {
    try {
        const { data } = await axios.get(`${API_URL}search/movie`, {
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
                    ? IMAGE_URL + 'w220_and_h330_face' + movie.poster_path
                    : no_poster
            }))
        }
        return modifiedData;
    } catch (e) {
        console.log(e);
    }
}
