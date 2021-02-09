import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { Link } from "react-router-dom";
import chuyenDoiUrl from './../../helpers/urlSlug';
import { Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { Fade } from "@material-ui/core";

const Cast = (props) => {
    const tv = props.tv;
    const [imgsLoaded, setImgsLoaded] = useState(false);
    useEffect(() => {
        //Preload cast's images
        const loadImage = async (image) => {
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
        Promise.all(tv.credits.cast.slice(0, 6).map((image) => loadImage(image)))
            .then(() => setImgsLoaded(true))
            .catch((err) => console.log("Failed to load images", err))
    }, [tv.credits.cast])
    return (
        <div className='cast'>
            <h3 className='mb-3 pl-0'>Series Cast</h3>
            {tv.credits.cast.length !== 0 ?
                (<Swiper
                    freeMode={true}
                    grabCursor={false}
                    centeredSlides={false}
                    spaceBetween={15}
                    slidesPerView={'auto'}
                    speed={400}
                >
                    {
                        tv.credits.cast.slice(0, 9).map((value, key) => {
                            return (
                                <SwiperSlide key={key} style={{ boxShadow: imgsLoaded ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none' }}>
                                    {
                                        imgsLoaded ?
                                            <Fade in={imgsLoaded} timeout={600} >
                                                <div>
                                                    <Link to={'/person/' + value.id + '-' + chuyenDoiUrl(value.name)}><img style={{ width: '152px', height: '228px', backgroundColor: '#dbdbdb' }} src={value.profile_path} alt="" loading='eager' /></Link>
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
                                            </>
                                    }
                                </SwiperSlide>
                            )
                        })
                    }
                    <SwiperSlide className="d-flex justify-content-center align-items-center" style={{ width: '100px', top: '128px' }}><Link to={'/tv/' + tv.id + '-' + chuyenDoiUrl(tv.nameEN) + '/cast'}><h4 style={{ paddingLeft: '0px' }}><i className="fa fa-arrow-right" aria-hidden="true"></i> </h4></Link></SwiperSlide>
                </Swiper>) : (<p>Unavailable</p>)
            }
            <Link to={'/tv/' + tv.id + '-' + chuyenDoiUrl(tv.nameEN) + '/cast'} className='dkmn pl-0' style={{ fontWeight: '600', fontSize: '1.1em', color: 'black', textDecoration: 'none' }}>Full Cast & Crew</Link>
            <br />
            <div className='hr pl-0'> <hr style={{ marginBottom: '0px' }} /></div>
        </div>
    );
};

export default Cast;