import { Link } from "react-router-dom";
import chuyenDoiUrl from '../../helpers/urlSlug';
const Keyword = ({ movie }) => {
    return (
        <Link to={'/keyword/' + movie.id + '-' + chuyenDoiUrl(movie.name)}>
            {movie.name}
        </Link>
    );
};

export default Keyword;