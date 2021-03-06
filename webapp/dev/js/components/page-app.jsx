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
import RegisterSuccessFullyRoutes from '../routes/register-successfully-routes'
import SignInSuccessfullyRoutes from '../routes/sign-in-successfully-routes'
import SignInFailuteRoutes from '../routes/sign-in-failure-routes'
import AddOffer from './add-offer';
import AddOfferSuccessfullyRoutes from '../routes/add-offer-successfully-routes';
import AddOfferNotAllowedRoutes from '../routes/add-offer-not-alloved-routes';
import SingleOffer from '../components/single-offer'
import orderSuccessfullyRouter from '../routes/order-successfully-router'
import MyAccount from '../components/my-account'
import FailureRoutes from '../routes/failure-foutes'
import ShoppingBasket from './shopping-basket'


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

const AddOfferWithProps =(
    <Route path="add-offer">
        <IndexRoute component={() => <AddOffer socket={socket}/>}/>
    </Route>
);

const SingleOfferWithProps = (
    <Route path="single-offer">
        <IndexRoute component={() => <SingleOffer socket={socket}/>}/>
    </Route>
);

const MyAccountWithProps = (
    <Route path="my-account">
        <IndexRoute component={() => <MyAccount socket={socket}/>}/>
    </Route>
);

const ShoppingBasketWithProps = (
    <Route path="shopping-basket">
        <IndexRoute component={() => <ShoppingBasket socket={socket}/>}/>
    </Route>
);

const enhancedHistory = syncHistoryWithStore(browserHistory, store);

const PageApp = () => (
    <Provider store={store}>
        <Router history={enhancedHistory}>
            <Route path="/" component={ApplicationBarWithProps}>
                <IndexRoute component={() => (<ApplicationIndex socket={socket}/>)}/>
                {RegisterRoutesWithProps}
                {RegisterSuccessFullyRoutes}
                {SignInWithProps}
                {SignInSuccessfullyRoutes}
                {SignInFailuteRoutes}
                {AddOfferWithProps}
                {AddOfferSuccessfullyRoutes}
                {AddOfferNotAllowedRoutes}
                {SingleOfferWithProps}
                {orderSuccessfullyRouter}
                {MyAccountWithProps}
                {FailureRoutes}
                {ShoppingBasketWithProps}
            </Route>
        </Router>
    </Provider>
);

export default PageApp;
