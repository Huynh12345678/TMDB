import React, { useEffect, useState } from 'react';
import Main from './Main';
import '../../css/Main.scss';
import Top from './Top';
import DoubleRing from '../Loading/DoubleRing';
import { fetchKeyword } from '../../api/fetchKeyword';
import Footer from '../Footer/Footer';
import { useMediaQuery } from 'react-responsive'
const Index = ({ props }) => {
    const id = props.match.params.id;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [page, setPage] = useState(1);
    const handleClick = () => {
        setPage(page + 1);
    }
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    useEffect(() => {
        const getAPI = async () => {
            if (loading) {
                await fetchKeyword(id, page).then((res) => {
                    setData(res);
                    const loadImage = (image) => {
                        return new Promise((resolve, reject) => {
                            const loadImg = new Image();
                            loadImg.src = image.poster_path;
                            loadImg.onload = () =>
                                resolve(image.url);
                            loadImg.onerror = (err) => reject(err);
                        });
                    };
                    isMobileDevice ? Promise.all(res.movies.results.slice(0, 3).map((image) => loadImage(image)))
                        .then(() => setLoading(false))
                        .catch((err) => console.log("Failed to load images", err))
                        :
                        Promise.all(res.movies.results.slice(0, 4).map((image) => loadImage(image)))
                            .then(() => setLoading(false))
                            .catch((err) => console.log("Failed to load images", err));

                })
            } else {
                setLoadingBtn(true);
                setData({
                    ...data,
                    movies: {
                        ...data.movies,
                        results: [
                            ...data.movies.results,
                            ...(await fetchKeyword(id, page)).movies.results,
                        ]
                    }
                });
                setLoadingBtn(false);
            }
        }
        getAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, page])

    return (
        <>
            {
                !loading ?
                    <>
                        <Top props={data} />
                        <Main
                            props={data}
                            loadingBtn={loadingBtn}
                            handleClick={handleClick}
                            page={page}
                        />
                        <Footer />
                    </>
                    :
                    <DoubleRing />
            }
        </>
    );
};

export default Index;