import {
    makeStyles,
    Grid
} from "@material-ui/core";
import '../../scss/components/Movie_page.scss';
import { useMediaQuery } from 'react-responsive'
import CustomDoughnut from "../Doughnut/CustomDoughnut";
import { no_image } from '../../assets';
const useStyles = makeStyles((theme) => ({
    styledDoughnut: {
        paddingRight: "0 !important",
    },
}));
const HeaderCollection = ({ collection, data, data2 }) => {
    const classes = useStyles();
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    const backdrop = collection.backdrop_path === no_image ? null : collection.backdrop_path
    return (
        <div className='main py-xl-4 pt-3 pb-lg-4' style={{ backgroundImage: !isMobileDevice ? `linear-gradient(to right, rgba(${data},1.00) 150px,rgba(${data},0.80) 100%),url(${backdrop})` : `linear-gradient( rgba(${data},1.00) 0px, rgba(${data},0.80) 100%),url(${backdrop})` }}>
            <div className="container py-md-1 py-0 inBackDrop my-auto" style={{ minHeight: '0vh' }}>
                <div className="row collection">
                    <div className="col-md-12 col-lg-4 col-xl-3 col-12">
                        {
                            (<img src={collection.poster_path} alt="" loading='eager' />)
                        }
                    </div>
                    <div className="col-md pl-xl-4 pl-0 mt-xl-0 mt-2" style={{ color: data2 }}>
                        <h3 style={{ marginBottom: '10px' }}>{collection.name}</h3>
                        {/* {
                            !isMobileDevice ? (<p className='center'>{certification != '' && <span style={{ border: '1px solid', padding: '0.06em 4px 0.06em 8px', borderRadius: '2px', marginRight: '8px', opacity: '0.7' }}>{certification}  </span>}{handleDate(movie.release_date)}&nbsp; {movie.iso_3166_1 !== '' && <span>({movie.iso_3166_1})</span>}&nbsp; •&nbsp; {genres(movie.genres)}&nbsp; • &nbsp;{timeConvert(movie.runtime)} </p>)
                                :
                                (<><p className='center m-0'>{certification != '' && <span style={{ border: '1px solid', padding: '0.06em 4px 0.06em 8px', borderRadius: '2px', marginRight: '8px', opacity: '0.7' }}>{certification}  </span>}{handleDate(movie.release_date)}&nbsp; {movie.iso_3166_1 !== '' && <span>({movie.iso_3166_1})</span>}&nbsp; •&nbsp;&nbsp;{timeConvert(movie.runtime)}</p>
                                    <p className='center'>{genres(movie.genres)}</p></>)
                        } */}
                        <div className='doughnut'>
                            <Grid item className={classes.styledDoughnut}>
                                <CustomDoughnut offAnimation={isMobileDevice ? true : false} rounded={true} vote_average={collection.vote_average} size={60} />
                            </Grid>
                            <h5 style={{ fontWeight: '700' }}>User<br></br> Score</h5>
                        </div>
                        <div className='overview'>
                            <h4>Overview</h4>
                            {
                                <p className='pOverview'>{collection.overview ? collection.overview : "We don't have an overview translated in English."}</p>
                            }
                        </div>
                        <div>
                            <h6>Number of Movies: {collection.parts.length}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderCollection;