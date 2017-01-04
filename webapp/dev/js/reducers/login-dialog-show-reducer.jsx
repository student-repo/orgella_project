export default function (state = null, action) {

    switch (action.type) {
        case 'DIALOG_LOGIN_SHOW':
            return action.payload;
            break;
        default: return {loginDialog: false,
            loginSuccessfully : false,
            loginNotSuccessfully: false}
    }
    return state;
}