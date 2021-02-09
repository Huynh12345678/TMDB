import { Link } from 'react-router-dom';
import { Tooltip } from "@material-ui/core";
import chuyenDoiUrl from '../../helpers/urlSlug';
import LinkIcon from "@material-ui/icons/Link";
const Side = (props) => {
    const movie = props.movie;
    return (
        <div id='sideContent' className='pl-xl-0'>
            <Tooltip title="Visit Homepage" placement='right' arrow>
                <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                    <LinkIcon fontSize='large'></LinkIcon>
                </a>
            </Tooltip>
            {
                <>
                    <div style={{ marginTop: '17px' }}>
                        <strong>Original Title</strong>
                        <p>{movie.original_title}</p>
                    </div>
                    <div>
                        <strong>Status</strong>
                        <p>{movie.status}</p>
                    </div>
                    <div>
                        <strong>Original Language</strong>
                        <p>
                            {
                                movie.spoken_languages.map((value) => {
                                    if (value.iso_639_1 === movie.original_language) {
                                        return value.english_name;
                                    }
                                    return true;
                                })
                            }
                        </p>
                    </div> <div>
                        <strong>Budget</strong>
                        <p>{movie.budget !== 0 ? ('$' + movie.budget.toLocaleString() + '.00') : (<strong>-</strong>)}</p>
                    </div> <div>
                        <strong>Revenue</strong>
                        <p>{movie.revenue !== 0 ? ('$' + movie.revenue.toLocaleString() + '.00') : (<strong>-</strong>)}</p>
                    </div> <div>
                        <strong>Keywords</strong>
                        <ul>
                            {
                                movie.keywords.length !== 0 ? (movie.keywords.map((value, key) => {
                                    return (
                                        <li key={key} style={{ listStyle: 'none' }}><Link to={'/keyword/' + value.id + '-' + chuyenDoiUrl(value.name)} style={{ textDecoration: 'none', fontSize: '0.9em', display: 'flex', alignItems: 'center' }} href="">{value.name}</Link></li>
                                    )
                                })) : (<p style={{ fontSize: '1.1rem', marginBottom: '0' }}>No keywords have been added.</p>)
                            }
                        </ul>
                    </div>
                </>
            }
        </div>
    );
};

export default Side;