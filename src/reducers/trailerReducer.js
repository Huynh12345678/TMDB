import { TRAILER } from './../actions/action';
const trailerInitialState = '12345';
const trailer = (state = trailerInitialState, action) => {
    switch (action.type) {
        case TRAILER:
            return action.payload;
        default:
            return state;
    }
}

export default trailer;