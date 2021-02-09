import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL, BACKDROP_SIZE, VIDEO_URL } from './Config';
import { no_user } from '../assets';
import { no_image } from '../assets';
import { no_poster } from '../assets';
export const fetchTv = async (id) => {
    var requestEN = {
        params: {
            api_key: API_KEY,
            append_to_response: 'credits,videos,recommendations,keywords,images'
        },
    }
    var requestVI = {
        params: {
            api_key: API_KEY,
            language: 'vi'
        },
    }
    const list = [];
    const populateData = (data) => { list.push(data) }
    await axios.all([
        axios.get(`${API_URL}tv/${id}`, requestEN),
        axios.get(`${API_URL}tv/${id}`, requestVI)
    ]).then(axios.spread((obj1, obj2) => {
        populateData(obj1.data);
        populateData(obj2.data);
    }));
    const data = list[0]; //English data
    const dataAlt = list[1]; //Vietnamese data
    const checkData = {
        ...data,
        name: dataAlt.name,
        nameEN: data.name,
        genres: dataAlt.genres,
        media_type: 'tv',
        poster_path: data.poster_path ? IMAGE_URL + 'w500' + data.poster_path : no_poster,
        backdrop_path: data.backdrop_path ? IMAGE_URL + BACKDROP_SIZE + data.backdrop_path : no_image,
        first_air_date: data.first_air_date,
        tagline: dataAlt.tagline ? dataAlt.tagline : data.tagline,
        overview: dataAlt.overview ? dataAlt.overview : data.overview,
        credits: {
            crew: data.credits.crew.slice(0, 9).map((value, key) => ({
                ...value,
                profile_path: value.profile_path ? IMAGE_URL + 'w220_and_h330_face' + value.profile_path : no_user,
            })),
            cast: data.credits.cast.slice(0, 9).map((value, key) => ({
                ...value,
                profile_path: value.profile_path ? IMAGE_URL + 'w220_and_h330_face' + value.profile_path : no_user,
            }))
        },
        videos: data.videos.results.length !== 0
            ?

            data.videos.results.map((item, key) => ({ ...item, url: VIDEO_URL + item.key }))
            : []
        ,
        recommendations: data.recommendations.results ? (data.recommendations.results.slice(0, 8).map((value, key) => ({
            ...value,
            backdrop_path: value.backdrop_path ? IMAGE_URL + 'w500_and_h282_face' + value.backdrop_path : no_image,
        }))) : ("We don't have enough data to suggest any movies based on Santana. You can help by rating movies you've seen.")
        ,
        keywords: data.keywords.results ? (data.keywords.results.map((value, key) => ({ ...value }))) : ([])
        ,
        images:
        {
            backdrop_path: data.images.backdrops ? data.images.backdrops.map((value, key) => ({
                ...value,
                url: IMAGE_URL + 'w533_and_h300_bestv2' + value.file_path,
                url_original: IMAGE_URL + 'original' + value.file_path
            })) : 'This backdrops is unavailable'
            ,
            poster_path: data.images.posters ? data.images.posters.map((value, key) => ({
                ...value,
                url: IMAGE_URL + 'w220_and_h330_face' + value.file_path,
                url_original: IMAGE_URL + 'original' + value.file_path
            })) : 'This posters is unavailable'
        }

    }
    return checkData
}