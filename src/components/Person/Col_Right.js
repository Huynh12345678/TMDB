import { useEffect, useState } from 'react';
import KnowFor from './KnowFor';
import Biography from './Biography';
import { useMediaQuery } from 'react-responsive'
import Acting from './Acting';
import Crew from './Crew';
import { makeStyles } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    popperDisablePortal: {
        position: 'relative',
    },
    menu: {
        "paddingTop": "10px",
        "paddingBottom": "10px",
        "border": "1px solid #dbdbdb",
        "borderRadius": "5px",
        "boxShadow": "0 2px 8px rgba(0, 0, 0, 0.5)",
        "transition": "0.3s",
        "& ul": {
            "margin": '0',
            "& li": {
                "padding": "5px",
                "paddingLeft": "20px",
                "listStyle": "none",
                "color": 'black',
                "& span": {
                    "float": "right",
                    "marginRight": "15px",
                    "marginLeft": "15px",
                },
                "&:hover": {
                    backgroundColor: '#F1F1F1',
                }
            },
        }
    }
}));

const Col_Right = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const person = props.person;
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 767.98px)'
    })
    const [select, setSelect] = useState('All');

    //get crew
    const crew = person.movie_credits.crew;
    //get department
    const department = crew.map((item) => item.department)
    //remove duplicated department 
    const final = department.filter(function (value, index) {
        return department.indexOf(value) === index;
    });
    //set data to object
    const data = {};
    final.map((value) => {
        data[value] = crew.filter((item) => item.department === value)
        return true;
    })
    const checkContent = () => {
        if (select === 'All') {
            return (
                <>
                    {
                        person.movie_credits.cast.length !== 0 &&
                        <div className="acting common">
                            <h3>Acting</h3>
                            <Acting person={person} />
                        </div>
                    }
                    <div className='crew'>
                        <Crew person={person} final={final} data={data} />
                    </div>
                </>
            )
        } else if (select === 'Acting') {
            return (
                <div className="acting common">
                    <h3>Acting</h3>
                    <Acting person={person} />
                </div>
            )
        } else {
            const finalAlt = [select];
            return (
                <div className='crew'>
                    <Crew person={person} final={finalAlt} data={data} />
                </div>
            )
        }
    }
    const [all, setAll] = useState('?');
    var num = person.movie_credits.cast.length;
    const toTalMovie = (value) => {
        num = num + value;
    }
    useEffect(() => {
        setAll(num);
    }, [num])
    return (
        <div className="details">
            {
                !isMobileDevice && <h2><Link to='#'>{person.name}</Link></h2>
            }
            <div className="biography" >
                <Biography person={person} />
            </div>
            {
                person.movie_credits.cast.length !== 0 || person.movie_credits.crew.length !== 0 ?
                    (<div className="knowFor">
                        <KnowFor person={person} />
                    </div>) : null
            }
            <div style={{ position: 'relative' }}>
                {
                    checkContent()
                }
                <div className='select'>
                    <Link to='#' onClick={handleClick}>{select} <span style={{ fontSize: '10px' }}>▼</span></Link>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <div className={classes.typography}>
                            <div className={classes.menu}>
                                <ul>
                                    <li onClick={() => { setSelect('All'); handleClose() }}>All<span>{all}</span></li>
                                    {
                                        person.movie_credits.cast.length !== 0 && <li onClick={() => { setSelect('Acting'); handleClose() }}>Acting<span>{person.movie_credits.cast.length}</span></li>
                                    }
                                    {
                                        final.map((item, key) => {
                                            toTalMovie(data[item].length)
                                            return (
                                                <li key={key} onClick={() => { setSelect(item); handleClose() }}>{item}<span>{data[item].length}</span></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Col_Right;