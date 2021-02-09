/* eslint-disable */
// const Backdrop = lazy(() => import('./../components/Backdrop/Backdrop'));
// const CreditDetails = lazy(() => import('./../components/CreditDetails/CreditDetails'));
import MoviePage from '../components/MoviePage';

const Movie = (props) => {
    return (
        <MoviePage object={props} />
    );
};
export default Movie