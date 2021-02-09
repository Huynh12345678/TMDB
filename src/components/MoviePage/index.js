/* eslint-disable */
import '../../scss/components/Movie_page.scss';
import { TRAILER, VIDEOS, IMAGES } from '../../actions/action';
import { COLOR } from '../../actions/action';
import { useState, useEffect } from 'react';
import { fetchMovie } from '../../api/fetchMovie';
import CreditDetails from '../CreditDetails/CreditDetails'
// import Loader from '../Loading/Loader'
import HeaderMovie from './HeaderMovie';
import Footer from '../Footer/Footer';
// import Color, { useColor } from "color-thief-react";
import FastAverageColor from 'fast-average-color';
import DoubleRing from '../Loading/DoubleRing';
import { useDispatch } from "react-redux";
const Backdrop = (props) => {
    const dispatch = useDispatch();
    const [imgsLoaded, setImgsLoaded] = useState(false);
    const id = props.object.match.params.id;
    const [movie, setMovie] = useState(null);
    const [dt, setDt] = useState(null); //background color
    const [dt2, setDt2] = useState(null);//text color
    const hexToRgb = hex =>
        hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            , (m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16))
    useEffect(() => {
        setImgsLoaded(false);  //hoá ra là do thằng này
        const fetchData = async () => {
            await fetchMovie(id).then((res) => {
                // setImgsLoaded(false);
                setMovie(res);
                //preload poster image
                const hihi = new Image();
                hihi.src = res.backdrop_path;     // by setting an src, you trigger browser download 
                hihi.onload = () => {
                    // when it finishes loading
                    const fac = new FastAverageColor();
                    fac.getColorAsync(res.poster_path, { algorithm: 'dominant' })
                        .then(color => {
                            const finalColor = hexToRgb(color.hex)
                            setDt(finalColor);
                            let contrast = color.isLight ? 'black' : 'white'
                            setDt2(contrast);
                            setImgsLoaded(true)
                            //positive for lighten, negative for darken
                            dispatch({ type: COLOR, backdrop: finalColor, text: contrast });
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                res.videos.length ? (res.videos[1] ? dispatch({ type: TRAILER, payload: res.videos[1].key })
                    : dispatch({ type: TRAILER, payload: res.videos[0].key })) : dispatch({ type: TRAILER, payload: '12345' });
                dispatch({ type: VIDEOS, payload: res.videos })
                dispatch({ type: IMAGES, backdrops: res.images.backdrop_path, posters: res.images.poster_path })
            });
            
        };
        fetchData();
        // return () => { setImgsLoaded(false); }
    }, [id]);  //tham số locationKeys tự thay đổi khi điều hướng => trigger componentWillUnMount trước khi render nếu có (return)

    return !imgsLoaded ? <DoubleRing /> :
        <>
            <HeaderMovie movie={movie} data={dt} data2={dt2} />
            <CreditDetails movie={movie} />
            <Footer />
        </>
}

export default Backdrop;