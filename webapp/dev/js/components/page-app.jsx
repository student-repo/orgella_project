import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import {syncHistoryWithStore} from 'react-router-redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from '../reducers';
import createLogger from 'redux-logger';
import App from '../components/App';
import ApplicationBar from './application-bar'
import ApplicationIndex from '../components/application-index'

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

const enhancedHistory = syncHistoryWithStore(browserHistory, store);

const PageApp = () => (
    <Provider store={store}>
        <Router history={enhancedHistory}>
            <Route path="/" component={ApplicationBar}>
                <IndexRoute component={() => (<ApplicationIndex />)}/>

            </Route>
        </Router>
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