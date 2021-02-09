import MovieCard from '../KeywordPage/MovieCard';

const ListMovie = ({ movie }) => {
    return movie.map((item, index) => (
        <MovieCard value={item} key={index}/>
    ))
};

export default ListMovie;