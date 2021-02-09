import Footer from '../Footer/Footer'
import Top from './Top';
import '../../css/Main.scss';
import { fetchCompany } from './../../api/fetchCompany';
import { useEffect, useState } from 'react';
import DoubleRing from './../Loading/DoubleRing';
import Movie from './Movie';
import LoadMore from './../Loading/LoadMore';
const Index = ({ id }) => {
    const [data, setDt] = useState(null);
    const [load, setLoad] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const handleClick = () => {
        setPage(page + 1);
    }
    useEffect(() => {
        const fetch = async () => {
            if (load) {
                setDt(await fetchCompany(id, page))
                setLoad(false);
            } else {
                setLoadingBtn(true)
                setDt({
                    ...data,
                    movies: {
                        ...data.movies,
                        results: [
                            ...data.movies.results,
                            ...(await fetchCompany(id, page)).movies.results
                        ]
                    }
                })
                setLoadingBtn(false)
            }
        }
        fetch();
        //eslint-disable-next-line
    }, [id, page])
    return load ? <DoubleRing /> :
        <>
            <Top props={data} />
            <div id='main'>
                <div className='container'>
                    <div className='movie_list'>
                        <Movie props={data} />
                    </div>
                    {
                        page < data.movies.total_pages && <LoadMore loading={loadingBtn} handleClick={handleClick} />
                    }
                </div>
            </div>
            <Footer />
        </>

};

export default Index;