import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import displayReducer from './display-reducer';

// export default combineReducers({
//     display: displayReducer,
//     routing: routerReducer
// });


const allReducers = combineReducers({
    display: displayReducer,
    routing: routerReducer
});

export default allReducers