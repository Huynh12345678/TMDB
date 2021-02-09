import {
    makeStyles,
    Grid,
    Fab, Tooltip, Typography, Fade
} from "@material-ui/core";
import ModalVideo from 'react-modal-video';
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CustomDoughnut from "../Doughnut/CustomDoughnut";
import { useMediaQuery } from 'react-responsive'
import { handleDate2 } from './Season';
import { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { no_image } from '../../assets';
import '../../css/_icon.scss';
import mediumZoom from 'medium-zoom'
import ImageZoom from '../../ImageZoom';

function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rhours > 0) {
        return rhours + "h";
    } else {
        return rminutes + "m";
    }
}

const genres = (item) => {
    var gen = [];
    item.map((value) => {
        gen.push(value.name);
        return true;
    })
    var i;
    var x = ''
    var seperator = ''
    for (i = 0; i < gen.length; i++) {
        x += seperator + gen[i]
        seperator = ', '
    }
    return x
}
const useStyles = makeStyles((theme) => ({
    styledDoughnut: {
        paddingRight: "0 !important",
    },
    icon: {
        fontSize: '16px',
        color: 'white'
    },
    fab: {
        boxShadow: 'none',
        width: "46px",
        height: '46px',
        [theme.breakpoints.down("sm")]: {
            width: "38px",
            height: '38px',
        },
        backgroundColor: '#032541',
        "&:hover": {
            backgroundColor: '#032541'
        }
    },
    tooltip: {
        marginRight: '20px',
    },
    play: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: '1',
        transition: '0.2s',
        "&:hover": {
            opacity: '0.6'
        }
    }
}));
const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black
    },
    tooltip: {
        backgroundColor: theme.palette.common.black
    }
}));
function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props} />;
}

const HeaderTv = (props) => {
    const zoom = useRef(mediumZoom())
    const tv = props.tv;
    const trailer = useSelector((state) => state.trailer);
    const classes = useStyles();
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    const data = props.data;
    const data2 = props.data2;
    const [isOpen, setOpen] = useState(false)
    const play = () => (
        <>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailer} onClose={() => setOpen(false)} />
            <div className={classes.play}>
                <span onClick={() => setOpen(true)} className='play_icon' style={{ width: '22.4px', height: '22.4px', filter: data2 === 'black' ? 'invert(0)' : 'invert(1)' }}></span>
                <h5 onClick={() => setOpen(true)} style={{ marginLeft: '5px', fontWeight: '600', textAlign: 'center', width: '100%' }}>Play Trailer</h5>
            </div>
        </>
    )
    const backdropImage = {
        backgroundImage: `url(${tv.backdrop_path !== no_image ? tv.backdrop_path : null})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isMobileDevice ? 'center' : 'right -200px top'
    }
    return (
        <div style={backdropImage}>
            <div className='main py-xl-4 pt-4 pb-lg-4' style={{ backgroundImage: !isMobileDevice ? `linear-gradient(to right, rgba(${data},1.00) 150px,rgba(${data},0.80) 100%)` : `linear-gradient(rgba(${data},1.00) 0px, rgba(${data} ,0.80) 100%)` }}>
                <div className="container py-xl-1 py-0 inBackDrop my-auto">
                    <div className="row">
                        <div className="col-md-12 col-lg-4 col-xl-3 col-12">
                            <Fade in={true} timeout={isMobileDevice ? 0 : 1500}>
                                <div>
                                    <ImageZoom
                                        src={tv.poster_path}
                                        alt="Zoom"
                                        zoom={zoom.current}
                                        background="#0E0E0E"
                                        width={300}
                                        height={450}
                                    />
                                </div>
                            </Fade>
                        </div>
                        <div className="col-md pl-xl-4 mt-xl-0 mt-3" style={{ color: data2 }}>
                            <h3 style={{ marginTop: isMobileDevice ? '0px' : '15px' }}>{tv.name} <span>{tv.first_air_date && '(' + handleDate2(tv.first_air_date) + ')'}</span></h3>
                            <p className='center s2'><span style={{ border: '1px solid', padding: '0.06em 8px 0.06em 8px', borderRadius: '2px', marginRight: '5px', opacity: '0.7' }}>TV-MA</span> {tv.genres.length ? genres(tv.genres) : '-'}&nbsp; • &nbsp;{timeConvert(tv.episode_run_time[0])} </p>
                            <div className='doughnut'>
                                <Grid item className={classes.styledDoughnut}>
                                    <CustomDoughnut offAnimation={isMobileDevice ? true : false} rounded={true} vote_average={tv.vote_average} size={isMobileDevice ? 50 : 60} />
                                </Grid>
                                <h5 style={{ fontWeight: '700', marginRight: '20px' }}>User<br></br> Score</h5>
                                <BootstrapTooltip title={<Typography style={{ fontSize: '14px', padding: '2.5px' }}>Login to add this movie to your favorite list</Typography>} arrow className={classes.tooltip}>
                                    <Fab size='medium' className={classes.fab}>
                                        <FavoriteIcon className={classes.icon} />
                                    </Fab>
                                </BootstrapTooltip>
                                <BootstrapTooltip title={<Typography style={{ fontSize: '14px', padding: '2.5px' }}>Login to add this movie to your watchlist</Typography>} arrow className={classes.tooltip}>
                                    <Fab size='medium' className={classes.fab}>
                                        <BookmarkIcon className={classes.icon} />
                                    </Fab>
                                </BootstrapTooltip>
                                {
                                    trailer !== "12345" && play()
                                }
                            </div>
                            <p style={{ opacity: '0.7', marginBottom: '10px', fontSize: '1.1em' }}>{tv.tagline}</p>
                            <div className='overview'>
                                <h4>Overview</h4>
                                {
                                    <p className='pOverview'>{tv.overview ? tv.overview : "We don't have an overview translated in English."}</p>
                                }
                                <div className="row" style={{ display: 'flex', justifyContent: 'start' }}>
                                    {
                                        tv.credits.crew.length !== 0 ? tv.credits.crew.slice(0, 6).map((item, key) => (
                                            <div key={key} className="col-sm-4 col-6">
                                                <h6>{item.name}</h6>
                                                <p>{item.department}</p>
                                            </div>))
                                            :
                                            <div className="col-sm-4 col-6" style={{ marginBottom: isMobileDevice ? '10px' : '0px' }}>
                                                <h6>Roberto Aguirre-Sacasa</h6>
                                                <p>Creator</p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTv;