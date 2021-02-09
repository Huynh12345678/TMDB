import { memo, useState } from 'react';
import Banner1 from './../components/Banner/Banner1';
import Slider from './../components/HomePage/Slider';
import SliderTrending from './../components/HomePage/Trending/SliderTrending';
import './../css/index.scss';
import Footer from '../components/Footer/Footer';
import Banner2 from '../components/Banner/Banner2';
import './../css/Home.scss';
import Trailer from '../components/HomePage/Trailer';
import _ from 'lodash';
import TopRated from '../components/HomePage/TopRated';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    selector: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
        borderRadius: '30px',
        padding: '4px 20px',
        background: 'rgb(var(--darkBlue))',
        color: 'white',
        fontWeight: '600',
        lineHeight: '1.5',
        verticalAlign: 'middle',
        fontFamily: 'var(--font)',
        '&::before': {
            content: 'none',
        },
        '&::after': {
            content: 'none',
        },
        "& svg": {
            display: 'none'
        },
        "& .MuiSelect-select.MuiSelect-select": {
            padding: '0',
            background: 'linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%);',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            "&::after": {
                "content": "\"\"",
                "width": "16px",
                "height": "16px",
                "background": "url(\"https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-221-chevron-down-e38bfea9df2c34a300157424b5aa481c58addc01323bfe4106d78b9650d5a1d5.svg\") no-repeat",
                "display": "inline-flex",
                "filter": "invert(89%) sepia(21%) saturate(454%) hue-rotate(75deg) brightness(104%) contrast(99%)",
                "marginLeft": "6px",
                "paddingBottom": "2.5px",
            }
        },
    },
    selector2: {
        background: 'linear-gradient(to right, rgba(var(--lighterGreen), 1) 0%, rgba(var(--lightGreen), 1) 100%)',
        color: 'black',
        "& .MuiSelect-select.MuiSelect-select": {
            color: 'black',
            background: 'rgba(var(--darkBlue), 1);',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            "&::after": {
                "filter": "invert(9%) sepia(53%) saturate(1778%) hue-rotate(188deg) brightness(99%) contrast(94%)",
                "paddingBottom": "3px",
            }
        }
    },
    ul: {
        display: 'flex',
        margin: '0',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    }
}));
const Home = () => {
    const classes = useStyles();
    const [popular_select, setPopularSelect] = useState("On TV");
    const [topRated_select, setTopRatedSelect] = useState("TV");
    const [trailer_select, setTrailerSelect] = useState("Streaming");
    const [trending_select, setTrendingSelect] = useState("Today");
    const handleChange = (event) => {
        setPopularSelect(event.target.value);
    };
    const handleChange2 = (event) => {
        setTopRatedSelect(event.target.value);
    };
    const handleChange3 = (event) => {
        setTrailerSelect(event.target.value);
    };
    const handleChange4 = (event) => {
        setTrendingSelect(event.target.value);
    };
    const [slider, setSlider] = useState('tv');
    const [trend, setTrend] = useState('day');
    const [trailer, setTrailer] = useState('airing_today');
    const [media_type, setMedia] = useState('tv');
    const [url, setUrl] = useState(null);
    const [topRate, setTopRate] = useState('tv');
    const getUrl = _.debounce((value) => {
        setUrl(value);
    }, 0)
    const backdrop = {
        transition: 'all 0.5s',
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    }
    const backgroundTrailer = {
        background: `linear-gradient(to right, rgba(var(--darkBlue), 0.75) 0%, rgba(var(--darkBlue), 0.75) 100%)`
    }
    return (
        <>
            <Banner1 />
            <div className="choose container mt-3 pl-2 d-flex" id='popular'>
                <h2 className='pl-3 pl-lg-4 mr-md-4 mr-3' style={{ fontSize: '24px' }}>What's Popular</h2>
                <ul className={classes.ul + ' ul_home'} style={{ listStyle: 'none' }}>
                    <li className={slider === 'tv' ? ('s1 on') : ('s1')} onClick={() => setSlider('tv')}><span>On TV</span></li>
                    <li className={slider === 'movie' ? ('s2 on') : ('s2')} onClick={() => setSlider('movie')}><span>In Theaters</span></li>
                </ul>
                <Select
                    value={popular_select}
                    onChange={handleChange}
                    className={classes.selector}
                >
                    <MenuItem onClick={() => setSlider('tv')} value="On TV">On TV</MenuItem>
                    <MenuItem onClick={() => setSlider('movie')} value="In Theaters">In Theaters</MenuItem>
                </Select>
            </div>
            <Slider slider={slider} />
            <div className="choose container mt-3 pl-2 d-flex" id='top_rated'>
                <h2 className='pl-3 pl-lg-4 mr-md-4 mr-3' style={{ fontSize: '24px' }}>Top Rated</h2>
                <ul className={classes.ul + ' ul_home'} style={{ listStyle: 'none' }}>
                    <li className={topRate === 'tv' ? ('s1 on') : ('s1')} onClick={() => setTopRate('tv')}><span>TV</span></li>
                    <li className={topRate === 'movie' ? ('s2 on') : ('s2')} onClick={() => setTopRate('movie')}><span>Movies</span></li>
                </ul>
                <Select
                    value={topRated_select}
                    onChange={handleChange2}
                    className={classes.selector}
                >
                    <MenuItem onClick={() => setTopRate('tv')} value="TV">TV</MenuItem>
                    <MenuItem onClick={() => setTopRate('movie')} value="Movies">Movies</MenuItem>
                </Select>
            </div>
            <TopRated topRate={topRate} />
            <div id='trailer' style={backdrop} className='container p-0'>
                <div style={backgroundTrailer}>
                    <div className="choose container pl-2 d-flex">
                        <h2 className='pl-3 pl-lg-4 mr-md-4 mr-3' style={{ fontSize: '24px' }}>Latest Trailers</h2>
                        <ul className={classes.ul + ' ul_home'} style={{ listStyle: 'none' }}>
                            <li className={trailer === 'airing_today' ? ('s1 on') : ('s1')} onClick={() => { setTrailer('airing_today'); setMedia('tv') }}><span>Streaming</span></li>
                            <li className={trailer === 'on_the_air' ? ('s2 on') : ('s2')} onClick={() => { setTrailer('on_the_air'); setMedia('tv') }}><span>On TV</span></li>
                            <li className={trailer === 'now_playing' ? ('s3 on') : ('s3')} onClick={() => { setTrailer('now_playing'); setMedia('movie') }}><span>In Theaters</span></li>
                        </ul>
                        <Select
                            value={trailer_select}
                            onChange={handleChange3}
                            className={classes.selector + ' ' + classes.selector2}
                        >
                            <MenuItem onClick={() => { setTrailer('airing_today'); setMedia('tv') }} value="Streaming">Streaming</MenuItem>
                            <MenuItem onClick={() => { setTrailer('on_the_air'); setMedia('tv') }} value="On TV">On TV</MenuItem>
                            <MenuItem onClick={() => { setTrailer('now_playing'); setMedia('movie') }} value="In Theaters">In Theaters</MenuItem>
                        </Select>
                    </div>
                    <Trailer trailer={trailer} media_type={media_type} getUrl={getUrl} />
                </div>
            </div>
            <div className="choose container mt-3 pl-2 d-flex" id='trending'>
                <h2 className='pl-3 pl-lg-4 mr-md-4 mr-3' style={{ fontSize: '24px' }}>Trending</h2>
                <ul className={classes.ul + ' ul_home'} style={{ listStyle: 'none' }}>
                    <li className={trend === 'day' ? ('s1 on') : ('s1')} onClick={() => setTrend('day')}><span>Today</span></li>
                    <li className={trend === 'week' ? ('s2 on') : ('s2')} onClick={() => setTrend('week')}><span>This Week</span></li>
                </ul>
                <Select
                    value={trending_select}
                    onChange={handleChange4}
                    className={classes.selector}
                >
                    <MenuItem onClick={() => setTrend('day')} value="Today">Today</MenuItem>
                    <MenuItem onClick={() => setTrend('week')} value="This week">This week</MenuItem>
                </Select>
            </div>
            <SliderTrending trend={trend} />
            <Banner2 />
            <Footer />
        </>
    );
};

export default memo(Home);