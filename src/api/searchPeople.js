import axios from 'axios';
import { no_user } from '../assets';
import { API_KEY, API_URL, IMAGE_URL } from './Config';

export const searchPeople = async (query, page) => {
    try {
        const { data } = await axios.get(`${API_URL}search/person`, {
            params: {
                api_key: API_KEY,
                query,
                page
            }
        })
        const modifiedData = {
            ...data,
            results: data.results.map((item) => ({
                ...item,
                poster_path: item.profile_path
                    ? IMAGE_URL + 'w220_and_h330_face' + item.profile_path
                    : no_user
            }))
        }
        return modifiedData;
    } catch (e) {
        console.log(e);
    }
}
