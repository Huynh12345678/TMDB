import VideoCard from './VideoCard';

const VideoList = ({ type, movies, title, item }) => {
    return (
        <div className='row'>
            {
                movies.length ?
                    movies.map((item, key) => (
                        <VideoCard key={key} item={item} index={key} type={type} />
                    )) : <p className='mb-0' style={{ paddingLeft: '24px' }}>There are no English {item[type].toLowerCase()} added to {title}.</p>
            }
        </div>
    );
};

export default VideoList;