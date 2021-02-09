import MovieCard from '../KeywordPage/MovieCard';
const Movie = ({ props }) => {
    const movies = props.movies;
    // console.log(movies);
    return movies.results.length ?
        movies.results.map((item, index) => (
            <MovieCard value={item} key={index} />
        )) :
        <p>No movies found.</p>
};

export default Movie;