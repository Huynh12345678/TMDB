import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
const handleDate = (date) => {
    let dt = moment(date, "YYYY-MM-DD");
    return dt.format('YYYY');
}
const Top = (props) => {
    const color = useSelector((state) => state.color);
    return (
        <div className='top' style={{ backgroundColor: `rgba(${color.backdrop},1)` }}>
            <div className="container" >
                <div className="header">
                    <Link to={'/movie/' + props.data.id + '-' + props.data.title}><img src={props.url.poster_path} alt="" width={58} height={87} loading='eager' /></Link>
                    <div className='ahihi' style={{ color: color.text }}>
                        <h4 className='display-5'><Link style={{ color: 'inherit' }} to={'/movie/' + props.data.id + '-' + props.data.title}>{props.url.title}</Link><span style={{ fontWeight: '400', opacity: '0.8', color: 'inherit' }}>&nbsp;{props.url.date && '(' + handleDate(props.url.date) + ')'}</span></h4>
                        <h3 ><Link style={{ color: 'inherit' }} to={'/movie/' + props.data.id + '-' + props.data.title}>← Back to main</Link></h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Top;