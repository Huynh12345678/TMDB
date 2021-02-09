import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from './Config';
import { no_image } from '../assets';

export const fetchTrailer = async (type, media_type) => {
    try {
        const { data } = await axios.get(`${API_URL}${media_type}/${type}`, {
            params: {
                api_key: API_KEY,
            },
        });
        const test = [];
        await Promise.all(data.results.map( //fix return promise pending
            async (item) => {
                await fetchTrailerKey(media_type, item.id).then((res) => {
                    test.push({
                        ...item,
                        backdrop_path: item.backdrop_path ? IMAGE_URL + 'w710_and_h400_multi_faces' + item.backdrop_path : no_image,
                        background: item.backdrop_path ? IMAGE_URL + 'w1920_and_h427_multi_faces' + item.backdrop_path : null,
                        trailer: res.results,
                        title: media_type === 'movie' ? item.title : item.name,
                    })
                })
            }
        ))
        return test
    } catch (e) {
        console.log(e);
    }
}

export const fetchTrailerKey = async (media_type, id) => {
    try {
        const { data } = await axios.get(`${API_URL}${media_type}/${id}/videos`, {
            params: {
                api_key: API_KEY,
            },
        });
        const lastData = {
            results: data.results.length ? (data.results[1] ? data.results[1] : data.results[0]) : { key: 'đéo có key' }
        }
        return lastData
    } catch (e) {
        console.log(e);
    }
}