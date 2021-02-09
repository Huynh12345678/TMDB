/* eslint-disable */
import '../../scss/components/CreditDetails.scss';
import Cast from './Cast';
import Media from './Media';
import Recommendations from './Recommendations';
import Side from './Side';
import Season from './Season';
import { useEffect } from 'react';
import { useWow } from '../../helpers/useWow';
const CreditDetailsTv = (props) => {
    const tv = props.tv;
    useEffect(() => {
        useWow();
    }, [])
    return (
        <div className='creditDetails'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 p-md-2 p-0">
                        <Cast tv={tv} />
                        <Season tv={tv} />
                        <Media tv={tv} />
                        <div className='animate__fadeIn wow' data-wow-delay="0.4s">
                            <Recommendations tv={tv} />
                        </div>
                    </div>
                    <div className="col p-md-2 py-lg-2 px-lg-3 p-0">
                        <Side tv={tv} />
                    </div>
                </div>
            </div>
        </div >
    )
};


export default CreditDetailsTv
/* eslint-enable */