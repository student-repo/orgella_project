import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import {syncHistoryWithStore} from 'react-router-redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from '../reducers/reductor';
import createLogger from 'redux-logger';
import ApplicationBar from './application-bar'
import ApplicationIndex from '../components/application-index'
import io from 'socket.io-client';
import Registration from '../components/registration'
import SignIn from '../components/sign-in'
import RegisterSuccessFullyRoutes from './register-successfully-routes'
import SignInSuccessfullyRoutes from './sign-in-successfully-routes'
import SignInFailuteRoutes from './sign-in-failure-routes'


var socket = io.connect('http://localhost:3200/');
const logger = createLogger();


const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);
const ApplicationBarWithProps = ({children}) => {
    return (
        <ApplicationBar socket={socket}>
            {children}
            </ApplicationBar>
    )
};

const RegisterRoutesWithProps =(
        <Route path="register">
            <IndexRoute component={() => <Registration socket={socket}/>}/>
        </Route>
    );

const SignInWithProps =(
    <Route path="sign-in">
        <IndexRoute component={() => <SignIn socket={socket}/>}/>
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
                {SignInWithProps}
                {SignInSuccessfullyRoutes}
                {SignInFailuteRoutes}

            </Route>
        </Router>
    </Provider>
);

export default PageApp;
