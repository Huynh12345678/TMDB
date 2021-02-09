import { IMAGES } from '../actions/action';
const imagesInitialState = { backdrops: '', posters: '' }
const images = (state = imagesInitialState, action) => {
    switch (action.type) {
        case IMAGES:
            return { ...state, backdrops: action.backdrops, posters: action.posters }
        default:
            return state
    }
}

export default images;
