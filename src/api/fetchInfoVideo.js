import axios from "axios";
import { API_YOUTUBE_KEY, API_YOUTUBE_URL, RUNTIME, INFO } from './Config';
import handleDate from './../helpers/handleDate';
const convert = (value) => {
    return value.substring(0, 10);
}
const time = (value) => {
    if (value.includes('M')) {
        var temp = value.substring(2);
        var temp1 = temp.split('M');
        var temp2 = temp1[1].replace('S', '');
        var minute = temp1[0];
        var second = temp2;
        if (second.length < 2) {
            return minute + ":0" + second
        } else {
            return minute + ":" + second
        }
    } else {
        var tempS = (value.substring(2)).replace('S', '');
        return '0:' + tempS;
    }
}
export const fetchInfoVideo = async (id) => {
    try {
        var info = {
            params: {
                key: API_YOUTUBE_KEY,
                id,
                part: INFO
            }
        }
        var runtime = {
            params: {
                key: API_YOUTUBE_KEY,
                id,
                part: RUNTIME
            }
        }
        const list = [];
        const populateData = (data) => { list.push(data) }
        await axios.all([
            axios.get(`${API_YOUTUBE_URL}`, info),
            axios.get(`${API_YOUTUBE_URL}`, runtime)
        ]).then(axios.spread((obj1, obj2) => {
            populateData(obj1.data);
            populateData(obj2.data);
        }));
        const data1 = list[0]; //info data
        const data2 = list[1]; //runtime data
        const checkData = {
            info: {
                channelTitle: data1.items[0].snippet.channelTitle,
                publishedAt: handleDate(convert(data1.items[0].snippet.publishedAt)),
                runtime: time(data2.items[0].contentDetails.duration),
                channelId: data1.items[0].snippet.channelId
            },
        }
        return checkData;
    } catch (e) {
        console.log(e);
    }
}