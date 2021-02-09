import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from './Config';
import { no_poster } from '../assets';
export const fetchKeyword = async (id, page) => {
    try {
        const { data } = await axios.get(`${API_URL}keyword/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "movies",
                page
            },
        });
        const checkData = {
            ...data,
            movies: {
                ...data.movies,
                results: data.movies.results.map((item) => ({
                    ...item,
                    poster_path: item.poster_path ? IMAGE_URL + 'w220_and_h330_face' + item.poster_path : no_poster
                }))
            }
        }
        return checkData;
    } catch (e) {
        console.log(e);
    }
}