import { useEffect, useState } from 'react';
import '../../css/Main.scss';
import { fetchCollection } from './../../api/fetchCollection';
import FastAverageColor from 'fast-average-color';
import DoubleRing from '../Loading/DoubleRing';
import HeaderCollection from './HeaderCollection';
import ListMovie from './ListMovie';
import Footer from './../Footer/Footer'
const Index = ({ props }) => {
    const [imgsLoaded, setImgsLoaded] = useState(false);
    const id = props.match.params.id;
    const [data, setData] = useState(null);
    const [dt, setDt] = useState(null); //background color
    const [dt2, setDt2] = useState(null);//text color
    const hexToRgb = hex =>
        hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            , (m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16))
    useEffect(() => {
        const fetch = async () => {
            await fetchCollection(id).then((res) => {
                setData(res);
                //preload poster image
                const hihi = new Image();
                const haha = new Image();
                hihi.src = res.poster_path;     // by setting an src, you trigger browser download 
                hihi.onload = () => {
                    // when it finishes loading
                    const fac = new FastAverageColor();
                    fac.getColorAsync(hihi.src, { algorithm: 'dominant' })
                        .then(color => {
                            // console.log(color);
                            // let contrast = getContrastYIQ(color.hex.slice(1, 7));
                            let contrast = color.isLight ? 'black' : 'white'
                            setDt(hexToRgb(color.hex));
                            setDt2(contrast);
                            //positive for lighten, negative for darken
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    haha.src = res.backdrop_path;
                }
                haha.onload = () => { //source ảnh ko lỗi thì vào đây
                    setImgsLoaded(true);
                }
                haha.onerror = () => { //source ảnh bị lỗi 404 thì vào đây
                    setImgsLoaded(true)
                }
            });
        }
        fetch();
    }, [id])
    return imgsLoaded ?
        <div id='main'>
            <HeaderCollection collection={data} data={dt} data2={dt2} />
            <div className='container'>
                <h3 style={{ marginBottom: '20px', fontWeight: '700', fontSize: '22.4px' }}>{data.parts.length} movies</h3>
                <div className="movie_list">
                    <ListMovie movie={data.parts} />
                </div>
            </div>
            <Footer />
        </div> : <DoubleRing />
};

export default Index;