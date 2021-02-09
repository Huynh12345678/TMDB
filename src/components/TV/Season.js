import { useEffect, useState } from 'react';
import moment from 'moment';
import { API_KEY, API_URL, IMAGE_URL } from '../../api/Config';
import axios from 'axios';
import no_poster from '../../assets/no_poster.svg'
import handleDate from './../../helpers/handleDate';
export const handleDate2 = (date) => {
    let dt = moment(date, "YYYY-MM-DD");
    return dt.format('YYYY');
}
const Season = (props) => {
    const [season, setSeason] = useState(null);
    const id = props.tv.id;
    const name = props.tv.name;
    const check = props.tv.last_episode_to_air ? 'last_episode_to_air' : 'next_episode_to_air';
    const lastSeason = props.tv[check].season_number;
    const lastYear = props.tv[check].air_date;
    useEffect(() => {
        const getData = async (id) => {
            await axios.get(`${API_URL}tv/${id}/season/${lastSeason}`, {
                params: {
                    api_key: API_KEY
                }
            }).then((res) => {
                setSeason(res.data);
            })
        }
        getData(id)
    }, [id, lastSeason])
    return (
        <div className='season'>
            <h4 className='my-3 p-0' style={{ fontWeight: '600', fontSize: '22.4px' }}>Last Season</h4>
            <div className='d-flex details'>
                {
                    season &&
                    <>
                        <img style={{ backgroundColor: '#dbdbdb', maxWidth: '130px', minWidth: '130px', height: '195px' }} src={season.poster_path ? IMAGE_URL + 'w220_and_h330_face' + season.poster_path : no_poster} alt="" loading='lazy' />
                        <div className='box w-100 pl-4 pr-4 d-flex flex-column justify-content-center'>
                            <h4 className='p-0 m-0' style={{ fontWeight: '600' }}>Season {lastSeason}</h4>
                            <h6 style={{ fontWeight: 'bold' }}>{handleDate2(lastYear)} | {season.episodes.length} Episodes</h6>
                            {
                                season.overview ? <p className='pt-2 m-0'>{season.overview}</p> :
                                    <p className='pt-2 m-0'>Season {lastSeason} of {name} premiered on {handleDate(season.air_date)}.</p>
                            }
                        </div>
                    </>
                }
            </div>
            <div><hr style={{ margin: '30px 0px 10px 0px' }} /></div>
        </div>
    );
};

export default Season;