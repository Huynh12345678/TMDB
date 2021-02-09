import '../../scss/components/Top.scss';
import Meta from './Meta';
const Top = ({ props }) => {
    const name = props.name;
    return (
        <div id='top-keyword'>
            <div className='content light-blue_icon'>
                <div className="container">
                    {
                        props.logo_path ? <img className='img-fluid' style={{ width: 'auto', height: '50px' }} src={props.logo_path} alt="" /> : <h3>{name}</h3>
                    }
                    <h4 className='d-flex align-items-center'>{props.movies.total_results} movies</h4>
                </div>
                <Meta props={props} />
            </div>
        </div>
    );
};

export default Top;