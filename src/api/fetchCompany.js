import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from './Config';
import { no_poster } from '../assets';
export const fetchCompany = async (id, page) => {
    try {
        const { data } = await axios.get(`${API_URL}company/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: 'movies',
                page
            },
        });
        const checkData = {
            ...data,
            logo_path: data.logo_path ? IMAGE_URL + 'h50_filter(negate,000,666)' + data.logo_path : null,
            movies: {
                ...data.movies,
                results: data.movies.results.map((item) => ({
                    ...item,
                    poster_path: item.poster_path ? IMAGE_URL + POSTER_SIZE + item.poster_path : no_poster
                }))
            }
        }
        return checkData;
    } catch (e) {
        console.log(e);
    }

}