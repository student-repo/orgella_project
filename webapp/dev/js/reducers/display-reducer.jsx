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
        ProductQuantity: '',
        shipmentPossibility: []
    },
    AddOfferStatus: false,
    SearchTextFieldsContent: {
        ProductName: '',
        Category: '',
        PriceFrom: '',
        PriceTo: ''
    },
    currentSearch: [],
    singleOfferDisplayInfo: {
        ProductName: '',
        Price: '',
        ProductQuantity: '',
        Description: ''
    },
    shipmentPossibility: [
        {
            id: 0,
            type: "PostOffice",
            cost: 14
        },
        {
            id: 1,
            type: "Royal Mail",
            cost: 20
        },
        {
            id: 2,
            type: "DHL",
            cost: 10
        },
        {
            id: 3,
            type: "OrgellaInPost",
            cost: 2
        },
        {
            id: 4,
            type: "United States Postal Service",
            cost: 12
        }
    ]
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

        case 'SEARCH_TEXT_FIELD_CONTENT':
            return {...displayState, SearchTextFieldsContent: action.payload};

        case 'CURRENT_SEARCH':
            return {...displayState, currentSearch: action.payload};

        case 'SINGLE_OFFER_DISPLAY_INFO':
            return {...displayState, singleOfferDisplayInfo: action.payload};

        default:
            return displayState;
    }

};
export default displayReducer;
