import '../../scss/components/CastCrew.scss';
import '../../css/Top.scss';
import { useState, useEffect } from "react";
import Loader from '../Loading/Loader'
import Top from './Top';
import Cast from './Cast';
import Crew from './Crew';
import Footer from '../Footer/Footer';
import { fetchPeople } from './../../api/fetchPeople';
const People = (props) => {
    const [load, setLoad] = useState(true);
    // console.log(props);
    const id = props.props.match.params.id;
    const title = props.props.match.params.title;
    const data = { id, title };
    const [top, setTop] = useState(null);
    const [cast, setCast] = useState(null)
    const [crew, setCrew] = useState(null);
    useEffect(() => {
        const getData = async () => {
            setLoad(true);
            await fetchPeople(id).then((res) => {
                setCast(res.cast);
                setCrew(res.crew);
                const hihi = new Image();
                hihi.src = res.item.poster_path;
                hihi.onload = () => {
                    setTop(res.item);
                    setLoad(false);
                }

            });
        }
        getData()
    }, [id])
    return (
        <>
            {
                top ? <Top data={data} url={top} /> : null
            }
            {
                load ? <Loader />
                    :
                    <>
                        <div className="main">
                            <div className="container" style={{ minHeight: '30vh' }}>
                                <div className="row mt-3 mt-lg-0">
                                    <Cast cast={cast} />
                                    <Crew crew={crew} />
                                </div >
                            </div>
                        </div >
                        <Footer />
                    </>
            }
        </>);
};

export default People;