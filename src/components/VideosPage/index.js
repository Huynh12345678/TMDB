import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Top from '../PeoplePage/Top';
import TopTv from '../TV/PeopleTvPage/Top';
import { fetchPeople } from '../../api/fetchPeople';
import { fetchPeopleTv } from '../../api/fetchPeopleTv';
import Loader from '../Loading/Loader';
import VideosResults from './VideosResults';
import { Grid } from "@material-ui/core";
import VideoList from "./VideoList";
import Footer from '../Footer/Footer'
import { useMediaQuery } from 'react-responsive'
import '../../css/Top.scss';
 
const Main = ({ match }) => {
    const mediaType = match.params.mediaType;
    const type = match.params.type;
    const videos = useSelector((state) => state.videos)
    const [top, setTop] = useState(null);
    const [load, setLoad] = useState(true);
    const data = {
        id: match.params.id,
        title: match.params.title
    };
    const item = {
        Trailers: 'Trailers',
        Teasers: 'Teasers',
        Clips: 'Clips',
        Scenes: 'Behind the Scenes',
        Bloopers: 'Bloopers',
        Featurettes: 'Featurettes',
        Opening: 'Opening Credits'
    }
    const options = {
        Trailers: videos.filter((item) => (item.type === 'Trailer')),
        Teasers: videos.filter((item) => (item.type === 'Teaser')),
        Clips: videos.filter((item) => (item.type === 'Clip')),
        Scenes: videos.filter((item) => (item.type === 'Behind the Scenes')),
        Bloopers: videos.filter((item) => (item.type === 'Bloopers')),
        Featurettes: videos.filter((item) => (item.type === 'Featurette')),
        Opening: videos.filter((item) => (item.type === 'Opening Credits')),
    }
    // console.log(options);
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
    }, [mediaType, match.params.id])
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    return load ? <Loader /> :
        <>
            {
                mediaType === 'movie' ? <Top data={data} url={top} /> : <TopTv data={data} url={top} />
            }
            <div className='container' style={{ maxWidth: '1300px', padding: !isMobileDevice ? '30px 31px' : '30px 15px' }}>
                <Grid container spacing={3}>
                    <Grid item md={3} xs={12}>
                        <VideosResults
                            params={type}
                            data={data}
                            videos={videos}
                            options={options}
                            mediaType={mediaType}
                        />
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <section style={{ minHeight: !isMobileDevice ? '552px' : 'auto' }}>
                            <VideoList
                                item={item}
                                title={top.title}
                                type={type}
                                movies={options[type]}
                            />
                        </section>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
};

export default Main;