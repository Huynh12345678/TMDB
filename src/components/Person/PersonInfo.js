/* eslint-disable */
import { useState, useEffect } from 'react';
import '../../scss/components/PersonInfo.scss';
import Footer from './../Footer/Footer'
import { useMediaQuery } from 'react-responsive'
import { fetchPerson } from './../../api/fetchPerson';
import Loader from './../Loading/Loader';
import Col_Left from './Col_Left';
import Col_Right from './Col_Right';

const Person = (props) => {
    const id = props.props.match.params.id;
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await fetchPerson(id).then((res) => {
                setPerson(res)
                //preload cast's image
                const loadImage = (image) => {
                    return new Promise((resolve, reject) => {
                        const loadImg = new Image();
                        loadImg.src = image.poster_path;
                        // wait 2 seconds to simulate loading time
                        loadImg.onload = () =>
                            // setTimeout(() => {
                            resolve(image.url);
                        // }, 0);
                        loadImg.onerror = (err) => reject(err);
                    });
                };
                //preload poster image
                const hihi = new Image();
                hihi.src = res.profile_path;     // by setting an src, you trigger browser download 
                // haha.onload = () => {
                //     // when it finishes loading, update the component state
                // !isMobileDevice ? ()
                if (!isMobileDevice) {
                    if (res.movie_credits.cast.length !== 0) {
                        Promise.all(res.movie_credits.cast.slice(0, 7).map((image) => loadImage(image)))
                            .then(() => setLoading(false))
                            .catch((err) => console.log("Failed to load images", err));
                    } else if (res.movie_credits.crew.length !== 0) {
                        Promise.all(res.movie_credits.crew.slice(0, 7).map((image) => loadImage(image)))
                            .then(() => setLoading(false))
                            .catch((err) => console.log("Failed to load images", err));
                    } else {
                        setLoading(false);
                    }
                } else {
                    setLoading(false)
                }
            });
        }
        getData();
    }, [id])
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    return (
        loading !== true ? (
            <>
                <div className='person'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <Col_Left person={person} />
                            </div>
                            <div className="col-md-9 pl-md-5">
                                <Col_Right person={person} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>) : <Loader />
    )
};

export default Person;