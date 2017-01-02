import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from '../reducers';
import createLogger from 'redux-logger';
import App from '../components/App';
import ApplicationBar from './application-bar'

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

const PageApp = () => (
    <Provider store={store}>
        <ApplicationBar />
    </Provider>
);

export default PageApp;

// const PageApp = () => (
//     <Provider store={store}>
//         <ApplicationBar />
//     </Provider>
// );

// const PageApp = () => (
//     <Provider store={store}>
//         <App />
//     </Provider>
// );