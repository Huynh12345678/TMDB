import { Link } from 'react-router-dom';
import chuyenDoiUrl from '../../helpers/urlSlug';
import LinkIcon from "@material-ui/icons/Link";
import { Tooltip } from "@material-ui/core";
const Side = (props) => {
    const tv = props.tv;
    return (
        <div id='sideContent' className='pl-xl-0'>
            <Tooltip placement='right' arrow title='Visit homepage'>
                <a href={tv.homepage} target="_blank" rel="noopener noreferrer">
                    <LinkIcon fontSize='large' />
                </a>
            </Tooltip>
            {
                tv !== undefined ? (<>
                    <div style={{ marginBottom: '0.4rem', marginTop: '17px' }}><strong>Facts</strong></div>
                    <div>
                        <strong>Original Name</strong>
                        <p>{tv.original_name}</p>
                    </div>
                    <div>
                        <strong>Status</strong>
                        <p>{tv.status}</p>
                    </div>
                    <div>
                        <strong>Network</strong>
                        {
                            tv.networks.length !== 0 && tv.networks !== undefined && tv.networks !== null && tv.networks.map((value, key) => {
                                return (<p style={{ marginTop: '5px' }} key={key}><img src={"//image.tmdb.org/t/p/h30" + value.logo_path} alt="" loading='lazy' /></p>)
                            })
                        }
                    </div>
                    <div>
                        <strong>Type</strong>
                        <p>{tv.type}</p>
                    </div>
                    <div>
                        <strong>Original Language</strong>
                        <p>
                            {
                                tv.spoken_languages.map((value) => {
                                    if (value.iso_639_1 === tv.original_language) {
                                        return value.english_name;
                                    }
                                    return true;
                                })
                            }
                        </p>
                    </div>
                    <div>
                        <strong>Keywords</strong>
                        <ul>
                            {
                                tv.keywords.length !== 0 ? (tv.keywords.map((value, key) => {
                                    return (
                                        <li key={key} style={{ listStyle: 'none' }}><Link to={'/keyword/' + value.id + '-' + chuyenDoiUrl(value.name)} style={{ textDecoration: 'none', fontSize: '0.9em', display: 'flex', alignItems: 'center' }} href="">{value.name}</Link></li>
                                    )
                                })) : (<p style={{ fontSize: '1.1rem', marginBottom: '0' }}>No keywords have been added.</p>)
                            }
                        </ul>
                    </div>
                </>) : null
            }
        </div>
    );
};

export default Side;