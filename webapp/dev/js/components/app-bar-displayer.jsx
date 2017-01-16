import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import MenuItem from "material-ui/MenuItem";
import {Link, withRouter} from "react-router";
import {Col, Row} from "pui-react-grids";
import {HomeIcon, RegisterIcon, AddOfferIcon, MyAccountIcon, SignInIcon, SignOutIcon} from "../utils/icons"
import Divider from 'material-ui/Divider';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {UserLogged} from '../actions/user-logged-action'
import _ from 'underscore';
import cookie from 'react-cookie';
import {myAccountData} from '../actions/my-account-action'
import {clearStore} from '../actions/clear-store-action'
import {currentSearch} from '../actions/current-search-acction'
import {allCategories} from '../actions/all-categories-action'
import {allProductNames} from '../actions/all-product-names-action'
import {shipmentPossibilities} from '../actions/init-shipment-possibilities-action'
import {clearAddOfferTextFieldsContent} from '../actions/clear-add-offer-text-fileds-content'
import {clearRegisterFieldsContent} from '../actions/clear-register-text-fields'
import {clearMyAccountOffers} from '../actions/clear-my-account-offers'
import {clearMyAccountOrders} from '../actions/clear-my-account-orders'


const cookieSignIn = (socket, usrlog,fff) => {
    if(_.isUndefined(cookie.load("nick")) || _.isUndefined(cookie.load('password'))){
        if(fff !== false){
            usrlog(false);
        }
    }
    else{
        socket.emit('CHECK_COOKIE_IDENTITY_DATA', {nick: cookie.load("nick"),
            password: cookie.load("password")});
        socket.on('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', function(data){
            if(data.res === "SIGN_IN_SUCCESSFULLY"){
                if(fff !== true){
                    usrlog(true);
                }
            }
            else{
                if(fff !== false){
                    usrlog(false);
                }
            }
        });
        console.log("password: " + cookie.load("password"));
    }
};

    const handleSignOut = (UserLogged, router) => {
        cookie.remove('nick');
        cookie.remove('password');
        UserLogged(false);
        router.push('/');
    };

const handleAddOffer = (router, UserLogged, clearAddOfferTextFieldsContent) => {
    if(UserLogged){
        router.push('/add-offer')
    }else{
        router.push('/add-offer-not-allowed')
    }
    clearAddOfferTextFieldsContent();

};

const handleRegister = (router, clearRegisterFieldsContent) => {
    router.push('/register');
    clearRegisterFieldsContent();
};

// <IconButton iconStyle={{color: 'white'}} onClick={() => cookieSignIn(socket, UserLogged, userLoggedStat)}>

const checkCustomerIntputWithDatabase = (socket,myAccountDataUpdate, router, clearMyAccountOffers, clearMyAccountOrders) => {
    socket.emit('MY_ACCOUNT_DATA',cookie.load("nick"));
    socket.on('MY_ACCOUNT_DATA_RESPONSE', function(data){
        if(data.res === "MY_ACCOUNT_DATA_SUCCESSFUL"){
            // browserHistory.push('/register-successful');
            console.log(data.data);
            myAccountDataUpdate(data.data);
            router.push("/my-account");
        }
        else{
            console.log("register not succesfull !!!");
            // browserHistory.push('/register');
        }
    });
    clearMyAccountOffers();
    clearMyAccountOrders();
};

const ApplicationBarDisplayer = ({socket, router, children, userLoggedStat,initShipmentPossibilities,
    UserLogged, myAccountDataUpdate, clearStore, currentSearchUpdate, currentSearch, allProductNamesUpdate,
    allCategoriesUpdate, clearAddOfferTextFieldsContent, clearRegisterFieldsContent, clearMyAccountOffers, clearMyAccountOrders}) => {
    socket.on('INITIAL_DATA', function(data){
        if(_.isUndefined(data.data)){
            currentSearchUpdate([]);
            allProductNamesUpdate([]);
            allCategoriesUpdate([]);
        }
        else{
            initShipmentPossibilities(data.shipments);
            currentSearchUpdate(data.data);
            allProductNamesUpdate(_.keys(_.indexBy(data.data, "ProductName")));
            allCategoriesUpdate(_.keys(_.indexBy(data.data, "Category")));
        }
    });
    cookieSignIn(socket, UserLogged, userLoggedStat);
    return (
        <div>
            <AppBar
                title={<Link to="/" style={{color: 'white', textDecoration: 'none'}}>Orgella</Link>}
                style={{marginBottom: '16px'}}
                iconElementLeft={
                    <IconMenu
                        iconButtonElement={
                            <IconButton iconStyle={{color: 'white'}}>
                                <NavigationMenu />
                            </IconButton>
                        }
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                        <MenuItem
                            primaryText="Home"
                            leftIcon={<HomeIcon />}
                            onTouchTap={() => router.push('/')}

                        />
                        <MenuItem
                            primaryText="My account"
                            leftIcon={<MyAccountIcon />}
                            disabled={!userLoggedStat}
                            onTouchTap={() => checkCustomerIntputWithDatabase(socket, myAccountDataUpdate, router, clearMyAccountOffers, clearMyAccountOrders)}
                        />
                        <MenuItem
                            primaryText="Add offer"
                            leftIcon={<AddOfferIcon />}
                            onTouchTap={() => handleAddOffer(router, userLoggedStat, clearAddOfferTextFieldsContent)}
                        />
                        <MenuItem
                            primaryText="Register"
                            leftIcon={<RegisterIcon />}
                            onTouchTap={() => handleRegister(router, clearRegisterFieldsContent)}
                        />
                        <Divider />
                        {
                            userLoggedStat ? <MenuItem
                                primaryText="Sign out"
                                leftIcon={<SignOutIcon />}
                                onTouchTap={() => handleSignOut(UserLogged, router)}
                            /> :
                                <MenuItem
                                    primaryText="Sign in"
                                    leftIcon={<SignInIcon />}
                                    onTouchTap={() => router.push('/sign-in')}
                                />

                        }
                    </IconMenu>
                }
            />
            <Col md={1}/>
            <Col md={22} style={{maxWidth: '70vw', float: 'none', margin: '0 auto'}}>
                {children}
            </Col>
            <Col md={1}/>

        </div>)
};

function mapStateToProps(state) {
    console.log("STATE STATE");
    console.log(state);
    return {
        userLoggedStat: state.display.UserLogged,
        currentSearch: state.display.currentSearch,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({UserLogged: UserLogged,
        myAccountDataUpdate: myAccountData,
        clearStore: clearStore,
        currentSearchUpdate: currentSearch,
        allProductNamesUpdate: allProductNames,
    allCategoriesUpdate: allCategories,
        initShipmentPossibilities: shipmentPossibilities,
        clearAddOfferTextFieldsContent: clearAddOfferTextFieldsContent,
        clearRegisterFieldsContent: clearRegisterFieldsContent,
        clearMyAccountOffers: clearMyAccountOffers,
        clearMyAccountOrders: clearMyAccountOrders}, dispatch);
}
export default withRouter (connect(mapStateToProps, matchDispatchToProps)(ApplicationBarDisplayer));
