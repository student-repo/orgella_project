import deepFreeze from "deep-freeze";

export const initialDisplayReducer = {
    activeUser: '',
    RegisterStatus: false,
    RegisterTextFieldsContent: {
        nick: '',
        firstName: '',
        lastName: '',
        address: '',
        password: '',
        repeatPassword: ''
    },
    UserLogged: false,
    SignInTextFieldsContent: {
        nick: '',
        password: ''
    },
    AddOfferTextFieldsContent: {
        ProductName: '',
        Category: '',
        Description: '',
        Price: '',
        ProductQuantity: ''
    },
    AddOfferStatus: false
};

const displayReducer = (displayState = initialDisplayReducer, action) => {
    deepFreeze(displayState);

    switch (action.type) {

        case 'REGISTER_STATUS':
            return {...displayState, RegisterStatus: action.payload};

        case 'REGISTER_TEXT_FIELD_CONTENT':
            return {...displayState, RegisterTextFieldsContent: action.payload};

        case 'SIGN_IN_TEXT_FIELD_CONTENT':
            return {...displayState, SignInTextFieldsContent: action.payload};

        case 'USER_LOGGED':
            return {...displayState, UserLogged: action.payload};

        case 'ADD_OFFER_TEXT_FIELD_CONTENT':
            return {...displayState, AddOfferTextFieldsContent: action.payload};

        case 'ADD_OFFER_STATUS':
            return {...displayState, AddOfferStatus: action.payload};

        default:
            return displayState;
    }

};
export default displayReducer;
