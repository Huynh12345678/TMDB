import { useState } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";
import chuyenDoiUrl from './../../helpers/urlSlug';
import { OverlayTrigger, Popover } from 'react-bootstrap';
const handleDate2 = (date) => {
    let dt = moment(date, "YYYY-MM-DD");
    return dt.format('YYYY');
}

const Acting = (props) => {
    const person = props.person;
    const cast = person.movie_credits.cast;
    const finalCast = cast.map((item) => ({
        ...item,
        date: item.release_date ? handleDate2(item.release_date) : '—'
    }))
    //sort date
    const sortDateCast = finalCast.sort(function (a, b) {
        return (b.date === '-') - (a.date === '-') || -(a.date > b.date) || +(a.date < b.date);
    });
    //get date
    const dm = sortDateCast.map(item => item.date)
    //remove duplicate date
    const finalDate = dm.filter(function (value, index) {
        return dm.indexOf(value) === index;
    });
    //set year to object
    const test = {};
    finalDate.map((item) => {
        test[item] = sortDateCast.filter((value => (value.date === item)))
        return true;
    })
    const [icon, setIcon] = useState({
        id: false
    });
    const changeIcon = (id) => {
        setIcon({ [id]: !icon[id] })
    }
    const overview = {
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "display": "-webkit-box",
        "WebkitBoxOrient": "vertical",
        "WebkitLineClamp": "2"
    }
    const title = {
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "display": "-webkit-box",
        "WebkitBoxOrient": "vertical",
        "WebkitLineClamp": "4",
        "fontWeight": '700'
    }
    return (
        <table className="card credits" style={{ borderRadius: '0px' }}>
            <tbody>
                {
                    finalDate.map((value, key) => (
                        <tr key={key} id={value} className='list'>
                            <td>
                                <table className='credits_group'>
                                    <tbody>
                                        {
                                            test[value].reverse().map((item, key) => (
                                                <tr key={key}>
                                                    <td className='year'>{value}</td>
                                                    <td className='seperator' >
                                                        <OverlayTrigger rootClose trigger="click" placement="top" overlay={
                                                            <Popover id="popover-basic">
                                                                <Popover.Content style={{ padding: '12.8px' }}>
                                                                    <div className='d-flex align-items-start'>
                                                                        <Link to={'/movie/' + item.id + '-' + chuyenDoiUrl(item.title)}><img className='mr-3' src={item.poster_popover} alt="" style={{ borderRadius: '8px', backgroundColor: '#dbdbdb', width: '94px', height: '141px' }} /></Link>
                                                                        <div className='content text-white'>
                                                                            <h4 className='mb-2' style={title}><Link style={{ textDecoration: 'none', color: 'white' }} to={'/movie/' + item.id + '-' + chuyenDoiUrl(item.title)} >{item.title}</Link>
                                                                                    &nbsp;&nbsp;<span className='px-2 group align-items-center' style={{ paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#01B4E4', borderRadius: '6px', fontSize: '0.55em', display: 'inline-flex', verticalAlign: 'bottom' }}><span className='star_icon d-inline-flex pr-3' style={{ width: '14.4px', height: '14.4px' }}></span>{item.vote_average}</span></h4>
                                                                            <p className='m-0' style={overview}>{item.overview ? item.overview : "We don't have an overview translated in English."}</p>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Content>
                                                            </Popover>
                                                        }><span className={icon[item.id] ? ('circle_icon-2') : ('circle_icon')} onMouseOver={() => { changeIcon(item.id) }} onMouseOut={() => { changeIcon(item.id) }}></span></OverlayTrigger>
                                                    </td>
                                                    <td className='role'><Link to={'/movie/' + item.id + '-' + chuyenDoiUrl(item.title)} >{item.title}</Link><span className='group'>{!item.character ? '' : <> as <span>{item.character}</span></>} </span></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default Acting;