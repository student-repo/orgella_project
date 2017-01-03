import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import ActiveUserReducer from './reducer-active-user';
import RegisterStatusReducer from './reducer-register-status';
import RegisterTextFieldsContentReducer from './reducer-register-text-field-content';
import { routerReducer } from 'react-router-redux';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    users: UserReducer,
    activeUser: ActiveUserReducer,
    RegisterStatus: RegisterStatusReducer,
    RegisterTextFieldsContent: RegisterTextFieldsContentReducer,
    routing: routerReducer
});

export default allReducers
