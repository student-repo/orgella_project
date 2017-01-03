export default function (state = null, action) {
    // var defaultState = {
    //     RegisterStatus: false
    // };
    switch (action.type) {
        case 'REGISTER_STATUS':
            // defaultState.RegisterStatus = action.payload;
            console.log("####: " + action.payload);
            return action.payload;
            // return defaultState;
            break;
        default: return false;
    }
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!  : " + action.type + " " + action.payload);
    return state;
}