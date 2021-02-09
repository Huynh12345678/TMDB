import React from 'react';
//Moment js
import moment from 'moment';
import { Link } from "react-router-dom";
import chuyenDoiUrl from '../../helpers/urlSlug';
import CustomDoughnut from "../Doughnut/CustomDoughnut";
import Keyword from '../SearchPage/Keyword';
//material ui
import {
    makeStyles,
    Grid
} from "@material-ui/core";
import { useMediaQuery } from 'react-responsive'
import Collection from '../SearchPage/Collection';
import Company from '../SearchPage/Company';
const useStyles = makeStyles((theme) => ({
    styledDoughnut: {
        paddingRight: "0 !important"
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
const handleDate = (date) => {
    if (date) {
        let dt = moment(date, "YYYY-MM-DD");
        return dt.format('ll');
    }
    return ' ';
}
const MovieCard = ({ movie, type, company, search }) => {
    const classes = useStyles();
    const title = {
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "display": "-webkit-box",
        "WebkitBoxOrient": "vertical",
        "WebkitLineClamp": "1"
    }
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 1280px)'
    })
    const stylePerson = {
        objectFit: 'cover',
        height: '235px',
        objectPosition: '35% 15%'
    }
    const searchMovie = () => (
        <div className='movie'>
            <Link to={"/" + type + "/" + movie.id + '-' + chuyenDoiUrl(type === 'movie' ? movie.title : movie.name)}><img src={movie.poster_path} alt="" loading='lazy' /></Link>
            <div className='root'>
                <div>
                    <Link to={"/" + type + "/" + movie.id + '-' + chuyenDoiUrl(type === 'movie' ? movie.title : movie.name)} > <h6 className='title'>{type === 'movie' ? movie.title : movie.name}</h6></Link>
                    {
                        type === 'person' ? <p className='mb-0 depart' style={{ color: 'rgba(0,0,0,0.6)' }}>{movie.known_for_department}</p>
                            :
                            <p className='date'>{handleDate(type === 'movie' ? (movie.release_date ? movie.release_date : null) : (movie.first_air_date ? movie.first_air_date : null))}</p>
                    }
                </div>
                <p className='overview'>{movie.overview}</p>
                {
                    type === 'person' &&
                    <p className='mb-0'>
                        {
                            movie.known_for.map((item, index) => (
                                <React.Fragment key={index} >
                                    <Link to={"/" + (item.title ? 'movie' : 'tv') + "/" + item.id + '-' + chuyenDoiUrl(item.title ? item.title : item.name)}>{item.title ? item.title : item.name}</Link>
                                    {index < movie.known_for.length - 1 && ', '}
                                </React.Fragment>
                            ))
                        }
                    </p>
                }
            </div>
        </div >
    )
    return <>
        {
            type === 'keyword' && (<Keyword movie={movie} />)
        }
        {
            (type === 'tv' || type === 'person' || type === 'movie') &&
            <>
                {
                    !isMobileDevice ? (
                        search ?
                            searchMovie()
                            :
                            <>
                                <div className='image'><Link to={"/" + type + "/" + movie.id + '-' + chuyenDoiUrl(type === 'movie' ? movie.title : movie.name)}><img style={type === 'person' ? stylePerson : {}} src={movie.poster_path} alt="" loading='lazy' /></Link></div>
                                {
                                    (type === 'movie' || type === 'tv') && (
                                        <div className='doughnut'>
                                            <Grid item className={classes.styledDoughnut}>
                                                <CustomDoughnut vote_average={movie.vote_average} size={55} />
                                            </Grid>
                                        </div>
                                    )
                                }
                                <div className='root' style={{ padding: type !== 'person' ? '26px 10px 12px' : '10px 10px 10px' }}>
                                    <Link style={title} to={"/" + type + "/" + movie.id + '-' + chuyenDoiUrl(type === 'movie' ? movie.title : movie.name)} title={movie.title}>{type === 'movie' ? movie.title : movie.name}</Link>
                                    {
                                        type === 'person' ? <p className='mb-0 depart'>{movie.known_for_department}</p>
                                            :
                                            <p className='date'>{handleDate(type === 'movie' ? (movie.release_date ? movie.release_date : null) : (movie.first_air_date ? movie.first_air_date : null))}</p>
                                    }
                                </div>
                            </>
                    ) : (
                            searchMovie()
                        )
                }
            </>
        }
        {
            type === 'collection' && (<Collection movie={movie} />)
        }
        {
            type === 'companie' && (<Company movie={movie} company={company} />)
        }
    </>
};

export default MovieCard;