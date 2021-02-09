// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import chuyenDoiUrl from './../../helpers/urlSlug'
import { Link } from "react-router-dom";
const KnowFor = (props) => {
    const person = props.person;
    return (
        <>
            <h3>Know For</h3>
            {
                person.movie_credits.cast.length !== 0 ? (
                    <Swiper
                        freeMode={true}
                        grabCursor={false}
                        centeredSlides={false}
                        spaceBetween={14}
                        slidesPerView={'auto'}
                        speed={400}
                    >
                        {
                            person.movie_credits.cast.slice(0, 10).map((value, index) => (
                                <SwiperSlide key={index}>
                                    {
                                        // {/* check xem nó là movie hay tv nữa */}
                                        (<Link to={'/movie/' + value.id + '-' + chuyenDoiUrl(value.title)}><img className='img-fluid' src={value.poster_path} alt="" /></Link>)
                                    }

                                    {/* check xem nó là movie hay tv nữa */}
                                    <Link to={'/movie/' + value.id + '-' + chuyenDoiUrl(value.title)}><p className='text-center'>{value.title}</p></Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>) : (
                        <Swiper
                            freeMode={true}
                            grabCursor={false}
                            centeredSlides={false}
                            spaceBetween={14}
                            slidesPerView={'auto'}
                            speed={400}
                        >
                            {
                                person.movie_credits.crew.slice(0, 10).map((value, index) => (
                                    <SwiperSlide key={index}>
                                        {
                                            // {/* check xem nó là movie hay tv nữa */}
                                            (<Link to={'/movie/' + value.id + '-' + chuyenDoiUrl(value.title)}><img src={value.poster_path} alt="" /></Link>)
                                        }

                                        {/* check xem nó là movie hay tv nữa */}
                                        <Link to={'/movie/' + value.id + '-' + chuyenDoiUrl(value.title)}><p className='text-center'>{value.title}</p></Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    )
            }
        </>
    );
};

export default KnowFor;