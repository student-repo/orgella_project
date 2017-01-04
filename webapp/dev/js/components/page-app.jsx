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
import RegisterRoutes from '../components/register-route'
import io from 'socket.io-client';
import Registration from '../components/registration'
import RegisterSuccessFullyRoutes from '../components/register-successfully-route'


var socket = io.connect('http://localhost:3200/');
const logger = createLogger();


const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);
const ApplicationBarWithProps = ({children}) => {
    return (
        <ApplicationBar alibaba="hello alibaba" socket={socket}>
            {children}
            </ApplicationBar>
    )
};

const RegisterRoutesWithProps =(
        <Route path="register">
            <IndexRoute component={() => <Registration alibaba2="hello alibaba2" socket={socket}/>}/>
        </Route>
    );


const enhancedHistory = syncHistoryWithStore(browserHistory, store);

const PageApp = () => (
    <Provider store={store}>
        <Router history={enhancedHistory}>
            <Route path="/" component={ApplicationBarWithProps}>
                <IndexRoute component={() => (<ApplicationIndex />)}/>
                {RegisterRoutesWithProps}
                {RegisterSuccessFullyRoutes}

            </Route>
        </Router>
    </Provider>
);

export default PageApp;
