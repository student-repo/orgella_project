import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import ActiveUserReducer from './reducer-active-user';
import RegisterStatusReducer from './reducer-register-status';
import RegisterTextFieldsContentReducer from './reducer-register-text-field-content';
import UserLogged from './user-logged-reducer';
import UserKeys from './user-keys-reducer';
import LoginDialogShow from './login-dialog-show-reducer';
import SignInTextFieldsContentReducer from './sign-in-text-field-reducer';
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
    UserLogged: UserLogged,
    UserKeys: UserKeys,
    LoginDialogShow: LoginDialogShow,
    SignInTextFieldsContent: SignInTextFieldsContentReducer,
    routing: routerReducer
});

export default allReducers
