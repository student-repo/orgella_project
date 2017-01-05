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
    }
};

    const handleSignOut = (UserLogged, router) => {
        cookie.remove('nick');
        cookie.remove('password');
        UserLogged(false);
        router.push('/');
    };

const handleAddOffer = (router, UserLogged) => {
    if(UserLogged){
        router.push('/add-offer')
    }else{
        router.push('/add-offer-not-allowed')
    }

};

const ApplicationBarDisplayer = ({socket, router, children, userLoggedStat, UserLogged}) => {
    // console.log(TextFieldsContent);
    return (
        <div>
            <AppBar
                title={<Link to="/" style={{color: 'white', textDecoration: 'none'}}>Orgella</Link>}
                style={{marginBottom: '16px'}}
                iconElementLeft={
                    <IconMenu
                        iconButtonElement={
                            <IconButton iconStyle={{color: 'white'}} onClick={() => cookieSignIn(socket, UserLogged, userLoggedStat)}>
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
                        />
                        <MenuItem
                            primaryText="Add offer"
                            leftIcon={<AddOfferIcon />}
                            onTouchTap={() => handleAddOffer(router, userLoggedStat)}
                        />
                        <MenuItem
                            primaryText="Register"
                            leftIcon={<RegisterIcon />}
                            onTouchTap={() => router.push('/register')}
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
        userLoggedStat: state.display.UserLogged
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({UserLogged: UserLogged}, dispatch);
}
export default withRouter (connect(mapStateToProps, matchDispatchToProps)(ApplicationBarDisplayer));
