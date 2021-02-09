import { useState, useEffect } from "react";
import { popularMovie } from '../../api/popularMovie';
import { popularTv } from '../../api/popularTv';
import { popularPeople } from '../../api/popularPeople';
import '../../scss/components/Popular_page.scss';
import { Box, CircularProgress, Container, Grid } from "@material-ui/core";
import PopularResults from './PopularResults';
import DoubleRing from '../Loading/DoubleRing';
import Movie from './Movie';
import Footer from '../Footer/Footer'
import { useMediaQuery } from 'react-responsive'
const Index = ({ props }) => {
    const params = props.match.params;
    const page = parseInt(params.page);
    const { query, type } = params;
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);
    const [resultsLoading, setResultsLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            setResultsLoading(true);
            const searchResults = await Promise.all(
                [
                    popularMovie(query, page),
                    popularTv(query, page),
                    popularPeople(query, page)
                ]
            )
            const [movie, tv, people] = searchResults;
            setResults({ movie, tv, people });
            // console.log(searchResults);
            setLoading(false);
            setResultsLoading(false);
        }
        fetchData()
    }, [query, page])
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    return loading ? <DoubleRing />
        :
        <>
            <div id="search">
                <Container>
                    <Grid container spacing={3}>
                        <Grid item md={3} xs={12}>
                            <PopularResults
                                params={params}
                                movieResults={results}
                                type={type}
                            >
                            </PopularResults>
                        </Grid>
                        <Grid item md={9} xs={12} style={{ paddingLeft: !isMobileDevice ? '14px' : '12px' }}>
                            {
                                resultsLoading ? (
                                    <Box
                                        height={350}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <CircularProgress color='primary' />
                                    </Box>
                                ) : (
                                        <>
                                            {
                                                type === 'movie' && (
                                                    <Movie type={type} movie={results.movie} params={params} />
                                                )
                                            }
                                            {
                                                type === 'tv' && (
                                                    <Movie type={type} movie={results.tv} params={params} />
                                                )
                                            }
                                            {
                                                type === 'person' && (
                                                    <Movie type={type} movie={results.people} params={params} />
                                                )
                                            }
                                        </>
                                    )
                            }
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Footer />
        </>
};

export default Index;