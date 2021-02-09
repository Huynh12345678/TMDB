import { useState } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";
import chuyenDoiUrl from './../../helpers/urlSlug';
import { OverlayTrigger, Popover } from 'react-bootstrap';
const handleDate2 = (date) => {
    if (date) {
        let dt = moment(date, "YYYY-MM-DD");
        return dt.format('YYYY');
    } else {
        return '—';
    }
}
const Crew = ({ person, final, data }) => {
    const [icon, setIcon] = useState({
        id: false
    });
    const changeIcon = (id) => {
        setIcon({ [id]: !icon[id] })
    }
    const finalData = {};
    final.map((item) => {
        finalData[item] = data[item].map((value) => ({
            ...value,
            date: handleDate2(value.release_date)
        }))
        return true
    })
    const sort = {};
    final.map((item) => {
        sort[item] = finalData[item].sort(function (a, b) {
            return (b.date === '-') - (a.date === '-') || -(a.date > b.date) || +(a.date < b.date);
        });
        return true
    })

    // get year
    const combine = {};
    final.map((value) => {
        const x = sort[value].map((item) => {
            return item.date
        })
        //remove duplicate year
        combine[value] = x.filter(function (value, index) {
            return x.indexOf(value) === index;
        });
        return true
    })
    const test = {}; //đây rồi chính là nó
    final.map((value) => {
        test[value] = {};
        combine[value].map((value2) => {
            test[value][value2] = finalData[value].filter((item) => (item.date === value2))
            return true
        })
        return true
    })
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
        'fontWeight': '700'
    }
    return (
        <>
            {
                final.map((value, key) => {
                    return (
                        <div key={key} className={value.toLowerCase() + ' common'} >
                            <h3>{value}</h3>
                            <table className="card credits" style={{ borderRadius: '0px' }}>
                                <tbody>
                                    {
                                        combine[value].map((value2, key) => (
                                            <tr id={value2} key={key} className='list'>
                                                <td>
                                                    <table className='credits_group'>
                                                        <tbody>
                                                            {
                                                                test[value][value2].reverse().map((item, key) => (
                                                                    <tr key={key}>
                                                                        <td className='year'>{value2}</td>
                                                                        <td className='seperator'>
                                                                            <OverlayTrigger rootClose trigger="click" placement='top' overlay={
                                                                                <Popover id="popover-basic">
                                                                                    <Popover.Content style={{ padding: '12.8px' }}>
                                                                                        <div className='d-flex align-items-start'>
                                                                                            <Link to={'/movie/' + item.id + '-' + chuyenDoiUrl(item.title)}><img className='mr-3' src={item.poster_path} alt="" style={{ borderRadius: '8px', backgroundColor: '#dbdbdb', width: '94px', height: '141px' }} /></Link>
                                                                                            <div className='content text-white'>
                                                                                                <h4 className='mb-2' style={title}><Link style={{ textDecoration: 'none', color: 'white' }} to={'/movie/' + item.id + '-' + chuyenDoiUrl(item.title)} >{item.title}</Link>
                                                                                                        &nbsp;&nbsp;<span className='px-2 group align-items-center' style={{ paddingTop: '5px', paddingBottom: '5px', backgroundColor: '#01B4E4', borderRadius: '6px', fontSize: '0.55em', display: 'inline-flex', verticalAlign: 'bottom' }}><span className='star_icon d-inline-flex pr-3' style={{ width: '14.4px', height: '14.4px' }}></span>{item.vote_average}</span></h4>
                                                                                                <p className='m-0' style={overview}>{item.overview}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Popover.Content>
                                                                                </Popover>
                                                                            }><span className={icon[item.id] ? ('circle_icon-2') : ('circle_icon')} onMouseOver={() => { changeIcon(item.id) }} onMouseOut={() => { changeIcon(item.id) }}></span></OverlayTrigger>
                                                                        </td>
                                                                        <td className='role'><Link to={'/movie/' + item.id + '-' + chuyenDoiUrl(item.title)} >{item.title}</Link><span className='group'>{!item.job ? '' : <> <span style={{ letterSpacing: '2px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.5)', paddingLeft: "4px" }}>...</span> <span>{item.job}</span></>} </span></td>
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
                        </div>
                    )
                })
            }
        </>
    );
};

export default Crew;