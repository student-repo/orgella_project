import deepFreeze from "deep-freeze";
import _ from "underscore";


// export const initialDisplayReducer = {
//     mode: 'SHOW_ALL',
//     resolutions: {},
//     search: '',
//     requiringReview: "SHOW_ALL",
//     diffSortButton: false,
//     ratedEntriesOptions: {
//         accept: true,
//         warn: true,
//         reject: true
//     },
//     forceEntriesExpandCollapse: undefined, // forceExpand=true, forceCollapse=false, noForcing=undefined
//     slider: {
//         value: 1,
//         active: false
//     },
//     treeState: [],
//     snapshotDisplayMode: 'SHOW_ALL'
// };

export const initialDisplayReducer = {
    users: [
        {
            id: 1,
            first: "Bucky",
            last: "Roberts",
            age: 71,
            description: "Bucky is a React developer and YouTuber",
            thumbnail: "http://i.imgur.com/7yUvePI.jpg"
        },
        {
            id: 2,
            first: "Joby",
            last: "Wasilenko",
            age: 27,
            description: "Joby loves the Packers, cheese, and turtles.",
            thumbnail: "http://i.imgur.com/52xRlm8.png"
        },
        {
            id: 3,
            first: "Madison",
            last: "Williams",
            age: 24,
            description: "Madi likes her dog but it is really annoying.",
            thumbnail: "http://i.imgur.com/4EMtxHB.png"
        }
    ],
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
    UserKeys: {
        nick: '',
        password: ''
    },
    LoginDialogShow: {loginDialog: false,
        loginSuccessfully : false,
        loginNotSuccessfully: false},
    SignInTextFieldsContent: {
        nick: '',
        password: ''
    },
};

const displayReducer = (displayState = initialDisplayReducer, action) => {
    deepFreeze(displayState);

    switch (action.type) {
        case 'DIALOG_LOGIN_SHOW':
            return {...displayState, LoginDialogShow: action.payload};
        case 'USER_SELECTED':
            return {...displayState, activeUser: action.payload};

        case 'REGISTER_STATUS':
            return {...displayState, RegisterStatus: action.payload};

        case 'REGISTER_TEXT_FIELD_CONTENT':
            return {...displayState, RegisterTextFieldsContent: action.payload};

        case 'SIGN_IN_TEXT_FIELD_CONTENT':
            return {...displayState, SignInTextFieldsContent: action.payload};

        case 'USER_KEYS':
            return {...displayState, UserKeys: action.payload};

        case 'USER_LOGGED':
            return {...displayState, UserLogged: action.payload};

        default:
            return displayState;
    }

};
export default displayReducer;
// export const sortByDiff = () => ({
//     type: "TOGGLE_DIFF_SORT_BUTTON"
// });
//
// export const updateVisibility = (value) => ({
//     type: "UPDATE_VISIBILITY_FILTER",
//     value: value
// });
//
// export const updateVisibleResolutions = (value, resolution) => ({
//     type: "UPDATE_VISIBLE_RESOLUTIONS",
//     value: {
//         resolution: resolution,
//         show: value
//     }
// });
//
// export const showEntriesToReview = (value) => ({
//     type: "SHOW_ENTRIES_TO_REVIEW",
//     value: value
// });
//
// export const updateSearchFilter = (value) => ({
//     type: "UPDATE_SEARCH_FILTER",
//     value: value
// });
//
// export const updateReviewedEntriesView = (value) => ({
//     type: "TOGGLE_REVIEWED_ENTRIES_VIEW",
//     value: value
// });
//
// export const entryExpand = (value) => ({
//     type: 'TOGGLE_ENTRY_EXPAND',
//     value: value
// });
//
// export const updateSliderState = (value) => ({
//     type: 'UPDATE_SLIDER_STATE',
//     value: value
// });
//
// export const updateSliderValue = (value) => ({
//     type: 'UPDATE_SLIDER_VALUE',
//     value: value
// });
//
// export const updateSnapshotState = value => {
//     return {
//         type: 'UPDATE_SNAPSHOT_STATE',
//         value: value
//     }
// };
// export const cardExpand = value => {
//     return {
//         type: 'TOGGLE_REVIEWED_CARD_VIEW',
//         value: value
//     }
// };
// export const updateSnapshotDisplayMode = value => {
//     return {
//         type: 'UPDATE_SNAPSHOT_DISPLAY_MODE',
//         value: value
//     }
// };

