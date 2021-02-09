import { Link } from "react-router-dom";
import {
    makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
const useStlyes = makeStyles((theme) => ({
    icon: {
        fontSize: 29,
        [theme.breakpoints.down("sm")]: {
            fontSize: 24,
        },
    },
}));
const SearchBtn = ({ open, handleClose, handleOpen }) => {
    const classes = useStlyes();
    return !open ? <Link onClick={handleOpen} className="nav-link" id='search' to="#" style={{ width: '55.44px' }}>
        {/* <i style={{ fontSize: '20px', color: '#01ABDA' }} className="fa fa-search" aria-hidden="true"></i> */}
        <SearchIcon className={classes.icon} style={{ color: '#01ABDA' }} />
    </Link> :
        <Link onClick={handleClose} className="nav-link" id='search' to="#" style={{ width: '55.44px' }}>
            {/* <i style={{ fontSize: '22px' }} className="fa fa-close" aria-hidden="true"></i> */}
            <CloseIcon className={classes.icon} />
        </Link>
};

export default SearchBtn;