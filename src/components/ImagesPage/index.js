import Top from '../PeoplePage/Top';
import TopTv from '../TV/PeopleTvPage/Top';
import Backdrops from './Backdrops/Backdrops';
import Posters from './Posters/Posters';
import { useEffect, useState } from "react";
import { fetchPeople } from '../../api/fetchPeople';
import { fetchPeopleTv } from '../../api/fetchPeopleTv';
import Loader from '../Loading/Loader';
import Footer from '../Footer/Footer';
import { useMediaQuery } from 'react-responsive'
import '../../css/Top.scss';
const IMAGES = ({ match }) => {
    const mediaType = match.params.mediaType;
    const type = match.params.type;
    const [top, setTop] = useState(null);
    const [load, setLoad] = useState(true);
    const data = {
        id: match.params.id,
        title: match.params.title
    };
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    useEffect(() => {
        const getData = async () => {
            setLoad(true);
            if (mediaType === 'movie') {
                await fetchPeople(match.params.id).then((res) => {
                    const hihi = new Image();
                    hihi.src = res.item.poster_path;
                    hihi.onload = () => {
                        setTop(res.item);
                        setLoad(false);
                    }
                });
            } else {
                await fetchPeopleTv(match.params.id).then((res) => {
                    const hihi = new Image();
                    hihi.src = res.item.poster_path;
                    hihi.onload = () => {
                        setTop(res.item);
                        setLoad(false);
                    }
                });
            }
        }
        getData()
    }, [match.params.id, mediaType])
    return load ? <Loader />
        :
        <>
            {
                mediaType === 'movie' ? <Top data={data} url={top} /> : <TopTv data={data} url={top} />
            }
            <div className='container' style={{ maxWidth: '1300px', padding: !isMobileDevice ? '30px 31px 0px 31px' : '15px 15px 0px 15px' }}>
                {
                    type === 'backdrops' ? <Backdrops /> : <Posters />
                }
            </div>
            <Footer />
        </>
};

export default IMAGES;