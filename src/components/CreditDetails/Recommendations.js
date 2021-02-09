import chuyenDoiUrl from './../../helpers/urlSlug';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { Link } from "react-router-dom";
import moment from 'moment';

const handleDate = (date) => {
    let dt = moment(date, "YYYY-MM-DD");
    return dt.format('DD/MM/YYYY');
}
const Recommendations = (props) => {
    const movie = props.movie;
    return (
        <div className='recommendations' >
            <h3>Recommendations</h3>
            {
                (movie.recommendations.length !== 0 ? (<Swiper
                    freeMode={true}
                    grabCursor={false}
                    centeredSlides={false}
                    spaceBetween={19}
                    slidesPerView={'auto'}
                    speed={400}
                >
                    {
                        movie.recommendations.map((value, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link to={'/movie/' + value.id + '-' + chuyenDoiUrl(value.title)}>
                                        <img className='img-fluid' src={value.backdrop_path} alt="" style={{ objectFit: 'cover', width: '250px', height: '141px' }} loading='lazy' />
                                    </Link>
                                    <div className='d-flex justify-content-between'>
                                        <Link to={'/movie/' + value.id + '-' + chuyenDoiUrl(value.title)}>{value.title}</Link>
                                        <p>{value.vote_average * 10 + '%'}</p>
                                    </div>
                                    <div className="meta position-absolute ">
                                        <span className="release_date d-flex align-items-center"><span className="calendar_icon d-inline-flex mr-1" style={{ width: '16px', height: '16px' }}></span>{handleDate(value.release_date)}</span>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    {
                        <SwiperSlide className="d-flex justify-content-center align-items-center" style={{ width: '0px', top: '128px' }}><h4 style={{ paddingLeft: '0px' }}> </h4></SwiperSlide>
                    }

                </Swiper>) : <p/* className='pError'*/>We don't have enough data to suggest any movies based on Santana. You can help by rating movies you've seen.</p>)
            }

        </div>
    );
};

export default Recommendations;