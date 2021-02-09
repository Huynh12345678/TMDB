/* eslint-disable */
import '../../scss/components/Header.scss';
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom";
import { Collapse, Toolbar } from '@material-ui/core';
import SearchInput from './SearchInput';
import SearchBtn from './SearchBtn';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'; //detect click outside component

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    collapse: {
        backgroundColor: "white",
        zIndex: 1,
        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0)',
    },
    search: {
        minHeight: 'auto',
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2.5),
        },
    },
    show: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'block'
        }
    }
}));
const Header = () => {
    const searchRef = useRef(null);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(true);
    const [onUser, setOnUser] = useState(true);
    const handleClickAway = () => {
        if (!on) {
            setOn(true);
        }
    };
    const handleClickAway2 = () => {
        if (!onUser) {
            setOnUser(true);
        }
    }
    const cc = () => {
        setOn(!on);
    }
    const cc2 = () => {
        setOnUser(!onUser);
    }
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 991.98px)'
    })
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
        // Collapse hidden không thể autofocus input => dùng setTimeout(0)
        setTimeout(() => {
            // searchRef = Autocomplete  > input => focus
            searchRef.current.children[1].children[0].focus();
        }, 0);
    }
    useEffect(() => {
        if (!on) {
            document.body.style.overflowY = 'hidden';
            document.getElementsByTagName("html")[0].style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
            document.getElementsByTagName("html")[0].style.overflowY = 'unset';
        }
    }, [on, onUser]);
    return (
        <>
            <header id='header'>
                <div className="container d-flex ">
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div className={classes.show}>
                            <a className={on ? ('') : ('on')} id="toggle" onClick={() => cc()}><span></span></a>
                            <div id="sidebarMenu" className={on ? '' : 'click'}>
                                <ul className="sidebarMenuInner">
                                    <li><Link onClick={() => setOn(!on)} to="/movie/1">Movies</Link></li>
                                    <li><Link onClick={() => setOn(!on)} to="/tv/1">TV Shows</Link></li>
                                    <li><Link onClick={() => setOn(!on)} to="/person/1">People</Link></li>
                                    <li><Link onClick={() => setOn(!on)} to="/login" className='more'>Login</Link></li>
                                    <li><Link onClick={() => setOn(!on)} to="#" className='more mt-0'>More</Link></li>
                                </ul>
                            </div>
                        </div>
                    </ClickAwayListener >
                    <nav className="nav nav1">
                        <div className="d-flex justify-content-center align-items-center">
                            <Link to='/' className="nav-link my-auto logo" title='Home'>
                                {
                                    isMobileDevice ? (<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="The Movie Database (TMDb)" width={55} height={40} />) : (<img className="img-fluid" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="" width={160} height={20} />)
                                }
                            </Link>
                            <Link className="nav-link sm active" to="/movie/1" title='Popular Movies'>Movies</Link>
                            <Link className="nav-link sm" to="/tv/1" title='Popular TV Shows'>TV Shows</Link>
                            <Link className="nav-link sm" to="/person/1" title='Popular People'>People</Link>
                            <Link className="nav-link sm" to="#">More</Link>
                        </div>
                    </nav>
                    <nav className="nav nav2">
                        <div className="d-flex ">
                            <Link className="nav-link sm active" to="/login" title='Login'>Login</Link>
                            <Link className="nav-link sm" to="/signup" title='Sign Up'>Join TMDb</Link>
                            <ClickAwayListener onClickAway={handleClickAway2}>
                                <div>
                                    <a style={{ color: 'white' }} id='toggleUser' onClick={() => cc2()} className={onUser ? ('nav-link') : ('nav-link on')}><i style={{ fontSize: '20px' }} className="fa fa-user" aria-hidden="true"></i></a>
                                    <div id="menuUser">
                                        <ul>
                                            <li><Link onClick={() => setOnUser(!onUser)} to="/login">Login</Link></li>
                                            <li><Link onClick={() => setOnUser(!onUser)} to="/signup">Sign Up</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </ClickAwayListener>
                            <SearchBtn open={open}
                                handleClose={handleClose}
                                handleOpen={handleOpen}
                            />
                        </div>
                    </nav>
                </div>
            </header>
            <Collapse timeout={280} in={open} className={classes.collapse}>
                <Toolbar className={classes.search}>
                    <SearchInput searchRef={searchRef} handleClose={handleClose} />
                </Toolbar>
            </Collapse>
        </>
    );
};

export default Header;