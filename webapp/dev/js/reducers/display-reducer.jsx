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
        PriceTo: '',
    },
    currentSearch: [],
    singleOfferDisplayInfo: {
        ProductName: '',
        Price: '',
        ProductQuantity: '',
        Description: '',
        OfferID: '',
        SellerID: ''
    },
    shipmentPossibility: [
        {
            type: "PostOffice",
            cost: 14
        },
        {
            type: "Royal Mail",
            cost: 20
        },
        {
            type: "DHL",
            cost: 10
        },
        {
            type: "OrgellaInPost",
            cost: 2
        },
        {
            type: "United States Postal Service",
            cost: 12
        }
    ],
    orderSelectFields: {
        quantity: '',
        shipmentType: ''
    },
    myAccountData: [{
        Nick: '',
        FirstName: '',
        LastName: '',
        Address: ''
    }],
    singleOfferShipmentPossibilities: [],
    categories: [],
    productNames: []
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

        case 'ORDER_SELECT_FIELDS':
            return {...displayState, orderSelectFields: action.payload};

        case 'MY_ACCOUNT_DATA':
            return {...displayState, myAccountData: action.payload};


        case 'SINGLE_OFFER_SHIPMENT_POSSIBILITIES':
            return {...displayState, singleOfferShipmentPossibilities: action.payload};

        case 'PRODUCT_NAMES':
            return {...displayState, productNames: action.payload};

        case 'CATEGORIES':
            return {...displayState, categories: action.payload};

        case 'CLEAR_STORE':
            return initialDisplayReducer;
        default:
            return displayState;
    }

};
export default displayReducer;
