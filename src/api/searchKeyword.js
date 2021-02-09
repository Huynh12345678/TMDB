import axios from 'axios';
import { API_KEY, API_URL } from './Config';

export const searchKeyword = async (query, page) => {
    try {
        const { data } = await axios.get(`${API_URL}search/keyword`, {
            params: {
                api_key: API_KEY,
                query,
                page
            }
        })
        const modifiedData = {
            ...data
        }
        return modifiedData;
    } catch (e) {
        console.log(e);
    }
}
