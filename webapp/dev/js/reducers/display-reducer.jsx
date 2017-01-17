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
    shipmentPossibility: [],
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
    productNames: [],
    myAccountOffers: [],
    myAccountOrders: [],
    singleOfferComment: [],
    singleOfferCommentTextField: ''
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

        case 'SHIPMENT_POSSIBILITIES':
            return {...displayState, shipmentPossibility: action.payload};

        case 'CLEAR_ORDER_STATE':
            return {...displayState, orderSelectFields: {quantity: '', shipmentType: ''}};

        case 'CLEAR_ADD_OFFER_STATE':
            return {...displayState, AddOfferTextFieldsContent: {ProductName: '', Category: '', Description: '',
                Price: '', ProductQuantity: '', shipmentPossibility: []}};

        case 'CLEAR_REGISTER_STATE':
            return {...displayState, RegisterTextFieldsContent: {nick: '',firstName: '', lastName: '',
                address: '', password: '', repeatPassword: '' }};

        case 'MY_ACCOUNT_OFFERS':
            return {...displayState, myAccountOffers: action.payload};

        case 'CLEAR_MY_ACCOUNT_OFFERS':
            return {...displayState, myAccountOffers: []};

        case 'MY_ACCOUNT_ORDERS':
            return {...displayState, myAccountOrders: action.payload};

        case 'CLEAR_MY_ACCOUNT_ORDERS':
            return {...displayState, myAccountOrders: []};

        case 'SINGLE_OFFER_COMMENTS':
            return {...displayState, singleOfferComment: action.payload};

        case 'SINGLE_OFFER_COMMENT_TEXT_FIELD':
            return {...displayState, singleOfferCommentTextField: action.payload};

        case 'CLEAR_SINGLE_OFFER_COMMENT_TEXT_FIELD':
            return {...displayState, singleOfferCommentTextField: ''};


        case 'CLEAR_STORE':
            return initialDisplayReducer;
        default:
            return displayState;
    }

};
export default displayReducer;
