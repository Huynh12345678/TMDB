/* eslint-disable */
import { useState, useEffect } from 'react';
import axios from 'axios'
import '../../../scss/components/Slider.scss';
import { API_KEY, API_URL, IMAGE_URL, POSTER_SIZE } from './../../../api/Config'
import chuyenDoiUrl from './../../../helpers/urlSlug';
import { Link } from "react-router-dom";
//Moment js
import moment from 'moment';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
//material ui
import {
    makeStyles,
    Grid,
    Fade,
} from "@material-ui/core";
import CustomDoughnut from "../../Doughnut/CustomDoughnut";

const handleDate = (date) => {
    let dt = moment(date, "YYYY-MM-DD");
    return dt.format('ll');
}

const useStyles = makeStyles((theme) => ({
    styledDoughnut: {
        paddingRight: "0 !important",
    },
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '120px',
        height: '385px'
    },
}));
const Index = (props) => {
    const media_type = props.topRate;
    const [load, setLoad] = useState(true)
    const classes = useStyles();
    const [topRated, setTopRated] = useState(null)
    //  Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setLoad(true);
        const getList = setTimeout(async () => {
            try {
                await axios.get(`${API_URL}${media_type}/top_rated?api_key=${API_KEY}`)
                    .then((res) => {
                        var final = res.data.results.map((item) => ({
                            ...item,
                            media_type: media_type
                        }))
                        setTopRated(final);
                        setLoad(false);
                    })
            } catch (err) {
                console.log(err);
            }
        }, 300);
        return () => clearTimeout(getList);
    }, [media_type]);

    return (
        // ẩn hoặc hiện nhưng vẫn chạy xuống dưới ( vẫn xử lí dữ liệu ) 
        <Fade in={!load} timeout={500}>
            <div className="popular container mt-3 p-0" style={{ minHeight: '300px' }}>
                {topRated ? (
                    <Swiper
                        freeMode={true}
                        grabCursor={false}
                        centeredSlides={false}
                        spaceBetween={15}
                        slidesPerView={'auto'}
                        speed={400}
                        scrollbar={{ draggable: true }}
                    >
                        {
                            topRated.map((value, key) => {
                                return (
                                    <SwiperSlide key={key}>
                                        {
                                            value.media_type == 'movie' ?
                                                <>
                                                    <Link to={'/movie/' + value.id + '-' + chuyenDoiUrl(value.title)}><li><img className='img-fluid' src={IMAGE_URL + 'w220_and_h330_face' + value.poster_path} alt="" loading='lazy' /></li></Link>
                                                    <div className='doughnut'>
                                                        <Grid item className={classes.styledDoughnut}>
                                                            <CustomDoughnut vote_average={value.vote_average} size={50} size2={3} offAnimation={true} />
                                                        </Grid>
                                                    </div>
                                                    <div className='root'>
                                                        <Link to={'/movie/' + value.id + '-' + chuyenDoiUrl(value.title)} title={value.title}>{value.title}</Link>
                                                        <p>{handleDate(value.release_date)}</p>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <Link to={'/tv/' + value.id + '-' + chuyenDoiUrl(value.name)}><li><img className='img-fluid' src={IMAGE_URL + 'w220_and_h330_face' + value.poster_path} alt="" loading='lazy' /></li></Link>
                                                    <div className='doughnut'>
                                                        <Grid item className={classes.styledDoughnut}>
                                                            <CustomDoughnut vote_average={value.vote_average} size={50} size2={3} offAnimation={true} />
                                                        </Grid>
                                                    </div>
                                                    <div className='root'>
                                                        <Link to={'/tv/' + value.id + '-' + chuyenDoiUrl(value.name)} title={value.name}>{value.name}</Link>
                                                        <p>{handleDate(value.first_air_date)}</p>
                                                    </div>
                                                </>
                                        }
                                    </SwiperSlide>
                                )
                            })
                        }
                        <SwiperSlide className="d-flex justify-content-center align-items-center" style={{ width: '40px', top: '128px' }}><h4 style={{ paddingLeft: '0px' }}></h4></SwiperSlide>
                    </Swiper>) : null
                }
            </div>
        </Fade>
    );
};

export default Index;
