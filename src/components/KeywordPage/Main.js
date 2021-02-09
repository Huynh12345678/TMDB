import LoadMore from '../Loading/LoadMore';
import MovieCard from './MovieCard';
const Main = ({ props, loadingBtn, handleClick, page }) => {
    const movies = props.movies;
    return (
        <div id='main'>
            <div className="container">
                <div className="movie_list">
                    {
                        movies.results.map((value, key) => (
                            <MovieCard value={value} key={key} />
                        ))
                    }
                </div>
                {
                    page < movies.total_pages && <LoadMore loading={loadingBtn} handleClick={handleClick} />
                }
            </div>
        </div >
    );
};

export default Main;