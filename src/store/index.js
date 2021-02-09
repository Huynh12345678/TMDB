import { createStore } from "redux";
import throttle from 'lodash/throttle';
import rootReducer from './../reducers';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('stateRedux');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('stateRedux', serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};

const peristedState = loadState();

const store = createStore(
    rootReducer,
    peristedState // => thằng peristedState phải ở dưới reducer, ở trên reducer là lỗi ngay
);

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));

export default store;