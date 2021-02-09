import { COLOR } from '../actions/action';
const colorInitialState = { backdrop: '', text: '' }
const color = (state = colorInitialState, action) => {
    switch (action.type) {
        case COLOR:
            var x = { ...state, backdrop: action.backdrop, text: action.text };
            return x;
        default:
            return state
    }
}
export default color;