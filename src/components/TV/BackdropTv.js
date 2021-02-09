/* eslint-disable */
import '../../scss/components/Movie_page.scss';
import { TRAILER, VIDEOS, IMAGES } from '../../actions/action';
import { COLOR } from '../../actions/action';
import { useState, useEffect } from 'react';
import { fetchTv } from './../../api/fetchTv';
import Footer from '../Footer/Footer';
import DoubleRing from '../Loading/DoubleRing';
import FastAverageColor from 'fast-average-color';
import HeaderTv from './HeaderTv';
import CreditDetailsTv from './CreditDetailsTv';
import { useDispatch } from "react-redux";

const BackdropTv = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [tv, setTv] = useState({});
    const id = props.object.match.params.id;
    const [dt, setDt] = useState(null);
    const [dt2, setDt2] = useState(null);//text color
    const hexToRgb = hex =>
        hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            , (m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16))
    //  Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            await fetchTv(id).then((res) => {
                setTv(res);
                //preload poster image
                const hihi = new Image();
                hihi.src = res.backdrop_path;     // by setting an src, you trigger browser download 
                hihi.onload = () => {
                    const fac = new FastAverageColor();
                    fac.getColorAsync(res.poster_path, { algorithm: 'dominant' })
                        .then(color => {
                            const finalColor = hexToRgb(color.hex);
                            setDt(finalColor);
                            let contrast = color.isLight ? 'black' : 'white';
                            setDt2(contrast);
                            setLoading(false)
                            //positive for lighten, negative for darken
                            dispatch({ type: COLOR, backdrop: finalColor, text: contrast });
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                res.videos.length ? (res.videos[1] ? dispatch({ type: TRAILER, payload: res.videos[1].key })
                    : dispatch({ type: TRAILER, payload: res.videos[0].key })) : dispatch({ type: TRAILER, payload: '12345' });
                dispatch({ type: VIDEOS, payload: res.videos });
                dispatch({ type: IMAGES, backdrops: res.images.backdrop_path, posters: res.images.poster_path })
            });
        }
        getList();
    }, [id]);  //tham số locationKeys tự thay đổi khi điều hướng => trigger componentWillMount 

    return loading ?
        <DoubleRing /> :
        <>
            <HeaderTv tv={tv} data={dt} data2={dt2} />
            <CreditDetailsTv tv={tv} />
            <Footer />
        </>

}

export default BackdropTv