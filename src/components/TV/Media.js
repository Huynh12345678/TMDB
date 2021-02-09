import { useState } from 'react';
import ModalVideo from 'react-modal-video'
import { IMAGE_URL } from './../../api/Config';
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom";
import chuyenDoiUrl from './../../helpers/urlSlug';
import { Typography } from '@material-ui/core';

const Media = (props) => {
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    const tv = props.tv;
    const [isOpen, setOpen] = useState({ id: false })
    const openModal = (id) => {
        setOpen({
            [id]: true
        });
    }
    const closeModal = (id) => {
        setOpen({
            [id]: false
        });
    }
    const [link, setLink] = useState({
        activeLink: isMobileDevice ? 1 : 0
    })
    const handleClick = (id) => {
        setLink({ activeLink: id });
    };
    const [choose, setChoose] = useState({
        mostPopular: isMobileDevice ? false : true,
        video: isMobileDevice ? true : false,
        backdrop: false,
        poster: false
    })
    const viewMore = () => (
        <Typography style={{ width: '200px', textAlign: 'center', fontWeight: 'normal', fontSize: '1.25rem' }}>View More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></Typography>
    )
    const mediaVideo = (value) => {
        return (
            <>
                {
                    value.length !== 0 ?
                        (
                            value.length !== 1 ?
                                (<div className='d-flex video' style={{ overflowX: 'scroll' }}>
                                    {
                                        value.slice(0, 6).map((item, key) => {
                                            return (isMobileDevice ?
                                                <iframe key={key} src={item.url} allowFullScreen title={key}></iframe>
                                                :
                                                <div key={key}>
                                                    <ModalVideo channel='youtube' autoplay isOpen={isOpen[item.key]} videoId={item.key} onClose={() => closeModal(item.key)} />
                                                    <div style={{ width: '533px', height: "300px", backgroundImage: `url('https://i.ytimg.com/vi/${item.key}/hqdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className='d-flex  justify-content-center align-items-center' id="video">
                                                        <div className='d-flex justify-content-center align-items-center' style={{ paddingLeft: '2px', borderRadius: '100%', width: '65px', height: '65px', background: 'rgba(0,0,0,0.7)' }}>
                                                            <div className='btnPlay' onClick={() => openModal(item.key)} style={{ backgroundImage: `url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg')`, width: '35px', height: '35px', filter: 'invert(1)' }}></div>
                                                        </div>
                                                    </div>
                                                </div>)
                                        })
                                    }
                                    <div className=' d-flex justify-content-center align-items-center'>
                                        <Link to={'/tv/' + tv.id + '-' + chuyenDoiUrl(tv.nameEN) + '/videos/Trailers'}>
                                            {
                                                viewMore()
                                            }
                                        </Link>
                                    </div>
                                </div>) :
                                (<div className='d-flex video'>
                                    {
                                        isMobileDevice ?
                                            <div className="embed-responsive embed-responsive-16by9">
                                                <iframe style={{ borderRadius: '6px' }} className="embed-responsive-item" src={value[0].url} title=' '></iframe>
                                            </div>
                                            :
                                            <div>
                                                <ModalVideo channel='youtube' autoplay isOpen={isOpen[value[0].key]} videoId={value[0].key} onClose={() => closeModal(value[0].key)} />
                                                <div style={{ width: '550px', height: "316.8px", backgroundImage: `url('https://i.ytimg.com/vi/${value[0].key}/hqdefault.jpg')`, backgroundSize: '550px 433px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius: '8px' }} className='d-flex  justify-content-center align-items-center' id="video">
                                                    <div className='d-flex justify-content-center align-items-center' style={{ paddingLeft: '2px', borderRadius: '100%', width: '65px', height: '65px', background: 'rgba(0,0,0,0.7)' }}>
                                                        <div className='btnPlay' onClick={() => openModal(value[0].key)} style={{ backgroundImage: `url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg')`, width: '35px', height: '35px', filter: 'invert(1)' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                    }</div>)
                        ) : (<p>This video is unavailable</p>)
                }
            </>
        )
    }
    const mediaBackdrop = (value) => {
        return (
            <>
                {
                    value.length !== 0 ?
                        (<div style={{ width: '100%', height: '100%', overflowX: 'scroll' }} className='d-flex backdrop'>
                            {
                                value.slice(0, 6).map((item, key) => {
                                    return (
                                        <div key={key}>
                                            <img src={IMAGE_URL + 'w533_and_h300_bestv2/' + item.file_path} alt="" loading='lazy' />
                                        </div>
                                    )
                                })
                            }
                            <div className=' d-flex justify-content-center align-items-center'>
                                <Link to={'/tv/' + tv.id + '-' + chuyenDoiUrl(tv.nameEN) + '/images/backdrops'}>
                                    {
                                        viewMore()
                                    }
                                </Link>
                            </div>
                        </div>) : (<p>This backdrops is unavailable</p>)
                }
            </>
        )
    }
    const mediaPoster = (value) => {
        return value.length !== 0 ? (<div style={{ width: '100%', height: '100%', overflowX: 'scroll' }} className='d-flex poster'>
            {
                value.slice(0, 6).map((item, key) => {
                    return (
                        <div key={key}>
                            <img src={IMAGE_URL + 'w220_and_h330_face/' + item.file_path} alt="" loading='lazy' />
                        </div>
                    )
                })
            }
            <div style={{}} className=' d-flex justify-content-center align-items-center'>
                <Link to={'/tv/' + tv.id + '-' + chuyenDoiUrl(tv.nameEN) + '/images/posters'}>
                    {
                        viewMore()
                    }
                </Link>
            </div>
        </div>) : (<p>This posters is unavailable</p>)
    }
    const mediaPopular = (video, backdrop, poster) => {
        return (!video.length && !backdrop.length && !poster.length) ? (<p>This most popular is unavailable</p>) :
            <div className='d-flex popular' style={{ overflowX: 'scroll' }}>
                {
                    video.length ? <div key={video[0].key}>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen[video[0].key]} videoId={video[0].key} onClose={() => closeModal(video[0].key)} />
                        <div style={{ width: '533px', height: "300px", backgroundImage: `url('https://i.ytimg.com/vi/${video[0].key}/hqdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className='d-flex  justify-content-center align-items-center' id="video">
                            <div className='d-flex justify-content-center align-items-center' style={{ paddingLeft: '2px', borderRadius: '100%', width: '65px', height: '65px', background: 'rgba(0,0,0,0.7)' }}>
                                <div className='btnPlay' onClick={() => openModal(video[0].key)} style={{ backgroundImage: `url('https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg')`, width: '35px', height: '35px', filter: 'invert(1)' }}></div>
                            </div>
                        </div>
                    </div> : null
                }
                {
                    backdrop.length ? <img className='backdropPopular' src={backdrop[0].url} alt="" loading='lazy' /> : null
                }
                {
                    poster.length ? <img className='posterPopular' src={poster[0].url} alt="" loading='lazy' /> : null
                }
            </div>

    }
    const [viewAll, setViewAll] = useState('');
    return (
        <>
            <nav className="nav justify-content-start pl-lg-3 pl-0">
                <Link to='#' className="nav-link">Media</Link>
                {
                    !isMobileDevice && <Link to='#' className={"nav-link" + (0 === link.activeLink ? " selected" : "")} onClick={() => { setChoose({ mostPopular: true, video: false, backdrop: false, poster: false }); handleClick(0); setViewAll('') }}>Most Popular</Link>
                }
                <Link to='#' className={"nav-link" + (1 === link.activeLink ? " selected" : "")} onClick={() => { setChoose({ mostPopular: false, video: true, backdrop: false, poster: false }); handleClick(1); setViewAll('Videos') }}>Videos&nbsp;<span>{tv.videos.length}</span></Link>
                <Link to='#' className={"nav-link" + (3 === link.activeLink ? " selected" : "")} onClick={() => { setChoose({ mostPopular: false, video: false, backdrop: true, poster: false }); handleClick(3); setViewAll('Backdrops') }}>Backdrops&nbsp;<span>{tv.images.backdrop_path.length}</span></Link>
                <Link to='#' className={"nav-link" + (2 === link.activeLink ? " selected" : "")} onClick={() => { setChoose({ mostPopular: false, video: false, backdrop: false, poster: true }); handleClick(2); setViewAll('Posters') }}>Posters&nbsp;<span>{tv.images.poster_path.length}</span></Link>
                {
                    !isMobileDevice && (viewAll === 'Videos' && <Link className='mr-0' to={'/tv/' + tv.id + '-' + chuyenDoiUrl(tv.nameEN) + '/videos/Trailers'} style={{ color: '#01B4E4' }}>View All {viewAll}</Link>)
                }
                {
                    !isMobileDevice && (viewAll === 'Backdrops' && <Link className='mr-0' to={'/tv/' + tv.id + '-' + chuyenDoiUrl(tv.nameEN) + '/images/backdrops'} style={{ color: '#01B4E4' }}>View All {viewAll}</Link>)
                }
                {
                    !isMobileDevice && (viewAll === 'Posters' && <Link className='mr-0' to={'/tv/' + tv.id + '-' + chuyenDoiUrl(tv.nameEN) + '/images/posters'} style={{ color: '#01B4E4' }}>View All {viewAll}</Link>)
                }
            </nav>
            <div className='portfolio'>
                {
                    choose.video && mediaVideo(tv.videos)
                }
                {
                    choose.backdrop && mediaBackdrop(tv.images.backdrop_path)
                }
                {
                    choose.poster && mediaPoster(tv.images.poster_path)
                }
                {
                    choose.mostPopular && (!isMobileDevice && mediaPopular(tv.videos, tv.images.backdrop_path, tv.images.poster_path))
                }
            </div>
            <div className='hr'> <hr style={{ margin: '30px 0px' }} /></div>
        </>
    );
};

export default Media;