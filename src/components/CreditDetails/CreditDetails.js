/* eslint-disable */
import '../../scss/components/CreditDetails.scss';
import 'swiper/swiper.scss';
import './../../css/_icon.scss'
import Cast from './Cast';
import Media from './Media';
import Recommendations from './Recommendations';
import Side from './Side';
import Collection from './Collection';
import { useWow } from '../../helpers/useWow';
import { useEffect } from 'react';
const CreditDetails = (props) => {
    const movie = props.movie;
    useEffect(() => {
        useWow();
    }, [])
    return (
        <>
            <div className='creditDetails'>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 p-md-2 p-0">
                            <Cast movie={movie} />
                            <Media movie={movie} />
                            <div className='animate__fadeIn wow' data-wow-delay="0.4s">
                                {
                                    movie.belongs_to_collection && <Collection movie={movie} />
                                }
                                <Recommendations movie={movie} />
                            </div>
                        </div>
                        <div className="col p-md-2 px-lg-3 py-lg-2 p-0">
                            <Side movie={movie} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CreditDetails
/* eslint-enable */