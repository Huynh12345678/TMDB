import { combineReducers } from "redux";
import trailer from './trailerReducer';
import color from './colorReducer';
import videos from './videosReducer';
import images from './imagesReducer';

var rootReducer = combineReducers({
    trailer: trailer,
    color: color,
    videos: videos,
    images: images
})
export default rootReducer;
