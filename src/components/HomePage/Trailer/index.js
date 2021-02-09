import { Fade } from '@material-ui/core';
import { memo, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchTrailer } from '../../../api/fetchTrailer';
import '../../../scss/components/Trailer.scss';
import ModalVideo from 'react-modal-video';
import '../../../css/_icon.scss';
import chuyenDoiUrl from '../../../helpers/urlSlug';

const Index = (props) => {
    const type = props.trailer;
    const media_type = props.media_type;
    const items = [];
    const [trailer, setTrailer] = useState(null);
    const [fade, setFade] = useState(false);
    const [key, setKey] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [element, setElement] = useState(null)
    const play = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }
    useMemo(() => {
        if (element) {
            setKey(element.trailer.key) //rerender
            props.getUrl(element.background) //rerender
        }
        //eslint-disable-next-line
    }, [element])
    if (trailer) {
        trailer.forEach((element, index) => {
            items.push(
                <SwiperSlide key={index} onMouseOver={() => setElement(element)}>
                    <div className='wrapper' style={{ position: 'relative' }}>
                        <img className='img-fluid' src={element.backdrop_path} alt="" width={300} style={{ height: '168.75px', objectFit: 'cover' }} loading='lazy' />
                        <div className='d-flex justify-content-center align-items-center play' style={play}>
                            <div className='btnPlay play_icon' onClick={() => setOpen(true)}></div>
                        </div>
                    </div>
                    <div className="info">
                        <Link className='text-white' to={`/${media_type}/${element.id}-${chuyenDoiUrl(element.title)}`}>{element.title}</Link>
                        <p>{element.trailer.name}</p>
                    </div>
                </SwiperSlide>
            )
        });
    }
    useEffect(() => {
        setFade(false)
        const fetch = setTimeout(
            async () => {
                await fetchTrailer(type, media_type).then((res) => {
                    setTrailer(res); //set thang nay thi se chay return
                    const preload = new Image();
                    preload.src = res[0].background;
                    preload.onload = () => {
                        props.getUrl(res[0].background);
                    }
                });
                setFade(true)
            }, 300);
        return () => clearTimeout(fetch);
        //eslint-disable-next-line
    }, [type, media_type])

    return trailer ?
        <Fade in={fade} timeout={500}>
            <div className='trailer container'>
                {
                    key && <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={key} onClose={() => setOpen(false)} />
                }
                <Swiper
                    freeMode={true}
                    grabCursor={false}
                    centeredSlides={false}
                    spaceBetween={20}
                    slidesPerView={'auto'}
                    speed={400}
                >
                    {items}
                    <SwiperSlide className="d-flex justify-content-center align-items-center" style={{ width: '40px', top: '128px' }}><h4 style={{ paddingLeft: '0px' }}> </h4></SwiperSlide>
                </Swiper>
            </div>
        </Fade> : null
};

export default memo(Index);