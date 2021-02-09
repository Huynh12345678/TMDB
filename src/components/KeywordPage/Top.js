import '../../scss/components/Top.scss';
const Top = ({ props }) => {
    const name = props.name;
    return (
        <div id='top-keyword'>
            <div className='content light-blue_icon'>
                <div className="container">
                    <h3>{name}</h3>
                    <h4>{props.movies.total_results} movies</h4>
                </div>
            </div>
        </div>
    );
};

export default Top;