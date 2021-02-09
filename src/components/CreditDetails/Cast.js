/* eslint-disable */
import { Swiper, SwiperSlide } from 'swiper/react';
import chuyenDoiUrl from './../../helpers/urlSlug';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Fade } from "@material-ui/core";

const Cast = (props) => {
    const movie = props.movie;
    const [imgsLoaded, setImgsLoaded] = useState(false);
    var english = /[^\x00-\x7F]+/;
    useEffect(() => {
        //Preload cast's images
        const loadImage = (image) => {
            return new Promise((resolve, reject) => {
                const loadImg = new Image();
                loadImg.src = image.profile_path;
                // wait 2 seconds to simulate loading time
                loadImg.onload = () =>
                    // setTimeout(() => {
                    resolve(image.url);
                // }, 0);
                loadImg.onerror = (err) => reject(err);
            });
        };
        Promise.all(movie.credits.cast.slice(0, 6).map((image) => loadImage(image)))
            .then(() => setImgsLoaded(true))
            .catch((err) => console.log("Failed to load images", err))
    }, [])
    return (
        <div className='cast'>
            <h3 className='mb-3 pl-0'>Top Billed Cast</h3>
            {
                movie.credits.cast.length !== 0 ?
                    (<Swiper
                        freeMode={true}
                        grabCursor={false}
                        centeredSlides={false}
                        spaceBetween={15}
                        slidesPerView={'auto'}
                        speed={400}
                    >
                        {
                            movie.credits.cast.map((value, key) => {
                                return (
                                    <SwiperSlide key={key} style={{ boxShadow: imgsLoaded ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none' }}>
                                        {
                                            !english.test(value.name) ? //true => english, false => not english
                                                (imgsLoaded ?
                                                    <Fade in={imgsLoaded} timeout={600} >
                                                        <div>
                                                            <Link to={'/person/' + value.id + '-' + chuyenDoiUrl(value.name)}><img style={{ height: '228px', width: '152px', backgroundColor: '#dbdbdb' }} src={value.profile_path} alt="" loading='eager' /></Link>
                                                            <div className='root'>
                                                                <Link to={'/person/' + value.id + '-' + chuyenDoiUrl(value.name)}><h5>{value.name}</h5></Link>
                                                                <p>{value.character}</p>
                                                            </div>
                                                        </div>
                                                    </Fade>
                                                    :
                                                    <>
                                                        <Skeleton variant="rect" width={152} height={228} animation="wave" />
                                                        <Skeleton />
                                                        <Skeleton />
                                                        <Skeleton />
                                                    </>)
                                                :
                                                (imgsLoaded ?
                                                    <Fade in={imgsLoaded} timeout={600} >
                                                        <div>
                                                            <Link to={'/person/' + value.id + '-' + 'invalid-name'}><img style={{ height: '228px', width: '152px', backgroundColor: '#dbdbdb' }} src={value.profile_path} alt="" loading='eager' /></Link>
                                                            <div className='root'>
                                                                <Link to={'/person/' + value.id + '-' + 'invalid-name'}><h5>{value.name}</h5></Link>
                                                                <p>{value.character}</p>
                                                            </div>
                                                        </div>
                                                    </Fade>
                                                    :
                                                    <>
                                                        <Skeleton variant="rect" width={152} height={228} animation="wave" />
                                                        <Skeleton />
                                                        <Skeleton />
                                                        <Skeleton />
                                                    </>)
                                        }
                                    </SwiperSlide>
                                )
                            })
                        }
                        <SwiperSlide className="d-flex justify-content-center align-items-center" style={{ width: '100px', top: '128px' }}><Link to={'/movie/' + movie.id + '-' + chuyenDoiUrl(movie.titleEN) + '/cast'}><h4 style={{ paddingLeft: '0px' }}><i className="fa fa-arrow-right" aria-hidden="true"></i></h4></Link></SwiperSlide>
                    </Swiper>) : (<p>Unavailable</p>)
            }
            <Link to={'/movie/' + movie.id + '-' + chuyenDoiUrl(movie.titleEN) + '/cast'} className='dkmn pl-0' style={{ fontWeight: '600', fontSize: '1.1em', color: 'black', textDecoration: 'none' }}>Full Cast & Crew</Link>
            <br />
            <div className='hr pl-0'> <hr style={{ margin: '16px 0px 10px 0px' }} /></div>
        </div >
    );
};

export default Cast;