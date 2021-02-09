import '../../scss/components/Banner.scss';
import { Link } from "react-router-dom";
import { memo, useEffect, useRef, useState } from 'react';
import { fetchPopular } from './../../api/fetchPopular';
import { useMediaQuery } from 'react-responsive'

const Banner1 = () => {
    var blank = /^\s*$/; //blank => true, ! => false
    const [interval, setIn] = useState(false);
    const btnRef = useRef(null);
    const [isChange, setIschange] = useState({ tempValue: ' ' });
    const [backdrop, setBackdrop] = useState('');
    const mb = 'w880_and_h600_multi_faces_filter(duotone,032541,01b4e4)';
    const pc = 'w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)';
    const handleChange = (e) => {
        setIschange({ tempValue: e.target.value })
    }
    const [chkInput, setChk] = useState(true);
    const handleKeypress = e => {
        if (e.key === 'Enter') {
            blank.test(isChange.tempValue) ? setChk(false) : btnRef.current.click();
        }
    };
    const handleClick = (e) => {
        if (blank.test(isChange.tempValue)) {
            e.preventDefault();
            setChk(false);
        } else {
            setChk(true);
            btnRef.current.click();
        }
    }
    const checkInput = () => {
        if (!chkInput) {
            return (
                <h5 style={{ color: 'red', fontWeight: '600' }}>Invalid value !</h5>
            )
        }
    }
    useEffect(() => {
        const fetchBackdrop = setTimeout(async () => {
            const popularData = await fetchPopular('movie'); // return 1 array
            const randomBackdrop = popularData[Math.floor(Math.random() * popularData.length)].backdrop_path; //return a random integer from 0->(length-1)
            setBackdrop(randomBackdrop);
            setIn(true);
        }, 0);
        return () => clearTimeout(fetchBackdrop); //clear setTimeout
    }, [interval])
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    const backdropImage = {
        backgroundImage: `url("//image.tmdb.org/t/p/${isMobileDevice ? mb : pc}${backdrop}")`,
        // transition: 'background-image 0.5s ease-in-out',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    const background = {
        background: `linear-gradient(to right, rgba(var(--darkBlue), 0.8) 0%, rgba(var(--darkBlue), 0) 100%)`
    }
    return (
        <div style={backdropImage} className='banner container p-0'>
            <div className="banner container" style={background}>
                <div className="slogan">
                    <h2>Welcome.</h2>
                    <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
                </div>
                {
                    !isMobileDevice &&
                    <div className="search input-group">
                        <input onBlur={() => { setChk(true) }} onKeyPress={handleKeypress} onChange={(e) => handleChange(e)} type="text" className="form-control" placeholder="Search for a movie, tv show, person......" />
                        <Link onClick={(e) => handleClick(e)} to={'/search/movie/' + isChange.tempValue + '/1'}><button className="submit" type="submit" ref={btnRef}>Search</button></Link>
                    </div>
                }
                {
                    checkInput()
                }
            </div>
        </div>
    );
};

export default memo(Banner1);