import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from './../../api/Config';
import { fetchCollection } from './../../api/fetchCollection';
import { useMediaQuery } from 'react-responsive'
import '../../css/_icon.scss';

const Collection = ({ movie }) => {
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    const id = movie.belongs_to_collection.id;
    const name = movie.belongs_to_collection.name;
    const [data, setDt] = useState(null);
    const tmdbDarkBlue = '3,37, 65';
    const collectionAltBackdrop = 'https://www.themoviedb.org/assets/2/v4/account_pipes/silver-251bf173c626c8be6f61efdd85b7009a83b2f9dfa60b80b182351a02fa2a57ec.svg';
    const collection = {
        backgroundImage: movie.belongs_to_collection.backdrop_path ? `linear-gradient(to right, rgba(${tmdbDarkBlue},1) 0%, rgba(${tmdbDarkBlue},0.6) 100%),url(${IMAGE_URL + (isMobileDevice ? 'w1000_and_h450_multi_faces' : 'w1440_and_h320_multi_faces') + movie.belongs_to_collection.backdrop_path})`
            : `linear-gradient(to right, rgba(${tmdbDarkBlue},1) 0%, rgba(${tmdbDarkBlue},0.6) 100%),url("${collectionAltBackdrop}")`,
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    useEffect(() => {
        const fetch = async () => {
            await fetchCollection(id).then((res) => {
                setDt(res)
            });
        }
        fetch();
    }, [id])
    return data ?
        <div id='collection' style={{ position: 'relative' }}>
            <div className='background' style={collection}>
                <div className='content'>
                    <h2>Part of the {name}</h2>
                    {
                        !isMobileDevice && <p>Includes  {
                            data.parts.slice(0, 3).map((item, key) => (
                                <Fragment key={key}>
                                    {item.title}
                                    {key < 2 && ', '}
                                </Fragment>
                            ))
                        }</p>
                    }
                    <button style={{ outline: 'none', marginTop: isMobileDevice ? '20px' : '0px' }}><Link to={'/collection/' + id}>VIEW THE COLLECTION</Link></button>
                </div>
            </div>
            <div><hr style={{ margin: '30px 0px' }} /></div>
        </div>
        :
        null
};

export default Collection;