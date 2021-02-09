import { useMediaQuery } from 'react-responsive'
import moment from 'moment';
import { Link } from 'react-router-dom';
import mediumZoom from 'medium-zoom'
import ImageZoom from '../../ImageZoom';
import { useRef } from 'react';

const handleDate = (date) => {
    let dt = moment(date, "YYYY-MM-DD");
    return dt.format('DD-MM-YYYY');
}
const age = (value) => {
    var years = new Date(new Date() - new Date(value)).getFullYear() - 1970;
    return years;
}
const Col_Left = (props) => {
    const zoom = useRef(mediumZoom())
    const person = props.person;
    const birthday = person.birthday !== null ? handleDate(person.birthday) : ('-')
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 767.98px)'
    })
    return (
        <div className="row">
            <div className="col-12 text-center">
                <ImageZoom
                    src={person.profile_path}
                    alt="Zoom"
                    zoom={zoom.current}
                    background="#0E0E0E"
                    width={300}
                    height={450}
                />
                <div className='text-left pl-md-2'>
                    {
                        isMobileDevice && <h2 className='text-center'><Link to='#'>{person.name}</Link></h2>
                    }
                    <div className='d-flex mb-3 mb-md-0 links justify-content-center justify-content-md-start'>
                        {
                            person.social_id.facebook_id && <a href={`https://www.facebook.com/${person.social_id.facebook_id}`} target='_blank' rel="noreferrer"><span className='facebook_icon'></span></a>
                        }
                        {
                            person.social_id.twitter_id && <a href={`https://twitter.com/${person.social_id.twitter_id}`} target='_blank' rel="noreferrer"><span className='twitter_icon'></span></a>
                        }
                        {
                            person.social_id.instagram_id && <a href={`https://www.instagram.com/${person.social_id.instagram_id}`} target='_blank' rel="noreferrer"><span className='instagram_icon'></span></a>
                        }
                    </div>
                    <h3 className=''>Personal Info</h3>
                    <section >
                        <p><strong>Known For</strong>{person.known_for_department}</p>
                        <p><strong>Gender</strong>{person.gender === 1 ? 'Female' : 'Male'}</p>
                        <p><strong>Birthday</strong>{birthday + ' ' + (birthday !== '-' ? '(' + age(person.birthday) + ' years old)' : '')}</p>
                        <p><strong>Place of Birth</strong>{person.place_of_birth != null ? (person.place_of_birth) : ('-')}</p>
                        <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
                            <p style={{ lineHeight: '1.9rem', margin: '0px' }}><strong>Also Known As</strong>
                                {
                                    person.also_known_as.length !== 0 ? ((person.also_known_as.join('\r\n'))) : ('-')
                                }
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Col_Left;