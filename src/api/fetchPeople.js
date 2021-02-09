import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from './Config';
import { no_user } from '../assets';
import { no_poster } from '../assets';
export const fetchPeople = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: 'credits'
            },
        });

        const lastData = {
            ...data.credits,
            cast: data.credits.cast.map((item) => ({
                ...item,
                profile_path: item.profile_path ? IMAGE_URL + 'w220_and_h330_face' + item.profile_path : no_user,
            })),
            crew: data.credits.crew.map((item) => ({
                ...item,
                profile_path: item.profile_path ? IMAGE_URL + 'w94_and_h141_face' + item.profile_path : no_user,
            })),
            item: {
                poster_path: data.poster_path ? IMAGE_URL + POSTER_SIZE + data.poster_path : no_poster,
                title: data.title,
                date: data.release_date
            }
        }
        return lastData

    } catch (e) {
        console.log(e);
    }
}