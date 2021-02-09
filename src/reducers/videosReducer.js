import { VIDEOS } from '../actions/action';
const videoInitialState = ['videos']
const video = (state = videoInitialState, action) => {
    switch (action.type) {
        case VIDEOS:
            return action.payload;
        default:
            return state
    }
}
export default video