import axios from 'axios';
import { API_KEY, API_URL, IMAGE_URL } from './Config';

export const searchCompany = async (query, page) => {
    try {
        const { data } = await axios.get(`${API_URL}search/company`, {
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
                logo_path: item.logo_path ? IMAGE_URL + 'h30' + item.logo_path : null
            }))
        }
        return modifiedData;
    } catch (e) {
        console.log(e);
    }
}
