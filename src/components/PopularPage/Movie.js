import MovieCard from './MovieCard';
import PaginationBar from './PaginationBar';
// import {
//     useMediaQuery
// } from "@material-ui/core";
import { useMediaQuery } from 'react-responsive'
const Movie = ({ movie, params, type, search }) => {
    // const matches = useMediaQuery((theme) => theme.breakpoints.down("md")); //mediaQuery của MUI nó chậm thì vl, như cc
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 1280px)'
    })
    const length = movie.results.length;
    const exception = {
        movie: 'movies',
        tv: 'TV shows',
        person: 'people',
        companie: 'companies',
        collection: 'collections',
        keyword: 'keywords'
    }
    return (
        <div id='movie'>
            <div className='row'>
                {
                    movie.results.length ?
                        movie.results.map((movie, key) => (
                            (type === 'keyword' || type === 'collection' || type === 'companie') ? <div key={key} className='col-12'><MovieCard company={{ key, length }} movie={movie} type={type} /></div> :
                                isMobileDevice ? (
                                    <div className='col-12' key={key}>
                                        <MovieCard movie={movie} type={type} />
                                    </div>
                                ) : (search ?
                                    <div className='col-12' key={key}>
                                        <MovieCard movie={movie} type={type} search={search} />
                                    </div>
                                    :
                                    <div className='col-3' key={key}>
                                        <MovieCard movie={movie} type={type} />
                                    </div>
                                    )
                        )) :
                        <div className="col-12">
                            <p className='mb-0'>There are no {exception[type]} that matched your query.</p>
                        </div>
                }
            </div>
            <PaginationBar type={type} params={params} total_pages={movie.total_pages} />
        </div >
    );
};

export default Movie;