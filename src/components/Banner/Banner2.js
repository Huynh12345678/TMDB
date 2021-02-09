import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/components/Banner.scss';
const Banner2 = () => {
    return (
        <div className="banner container s2 mt-0 mt-lg-2">
            <div className='row h-100 py-4 px-0 px-lg-3 px-xl-4 d-flex align-items-center'>
                <div className="col-md-7 px-4 d-flex flex-column justify-content-around">
                    <h2>Join Today</h2>
                    <p>Get access to maintain your own custom personal lists, track what you've
                    seen and search and filter for what to watch next—regardless if it's in
                    theatres, on TV or available on popular streaming services like Netflix,
                     Amazon Prime Video, and fuboTV.</p>
                    <Link to='/signup' style={{ backgroundColor: '#805BE7', border: 'none', fontWeight: 'bold', width: '110px' }} className='btn-primary btn py-2'>Sign Up</Link>
                </div>
                <div className="col-md-5 px-4 d-flex align-items-center pt-3">
                    <ul className='pl-3 m-0'>
                        <li>Enjoy TMDb ad free</li>
                        <li>Maintain a personal watchlist</li>
                        <li>Filter by your subscribed streaming services and find something to watch</li>
                        <li>Log the movies and TV shows you've seen</li>
                        <li>Build custom lists</li>
                        <li>Contribute to and improve our database</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Banner2;
