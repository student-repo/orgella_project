import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
// import LogIcon from 'material-ui/svg-icons/action/exit-to-app'
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import MenuItem from "material-ui/MenuItem";
import {Link, withRouter} from "react-router";
import {Col, Row} from "pui-react-grids";
import {HomeIcon, RegisterIcon, AddOfferIcon, MyAccountIcon, SignInIcon, SignOutIcon} from "../utils/icons"
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as Colors from 'material-ui/styles/colors';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/simple-button-css.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {UserLogged} from '../actions/user-logged-action'
import {UserKeys} from '../actions/user-keys-action'
import _ from 'underscore';
import cookie from 'react-cookie';

const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '40px'
};


function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}

class ApplicationBarDisplayer extends Component {

    constructor(){
        super();
        this.state = {open: false};
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        this.updateTextFieldsState = this.updateTextFieldsState.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.cookieSignIn = this.cookieSignIn.bind(this);
    }

    handleOpenDialog(){
        this.setState({open: true});
    };

    handleSignOut(){
        cookie.remove('nick');
        cookie.remove('password');
    }

    cookieSignIn(usrlog){
        console.log("cookie nick: " + cookie.load("nick"));
        console.log("cookie password: " + cookie.load("password"));

        if(_.isUndefined(cookie.load("nick")) || _.isUndefined(cookie.load('password'))){
            // this.props.UserLogged(true);
            usrlog(false);
        }
        else{
            this.props.socket.emit('TRY_SIGN_IN', {nick: cookie.load("nick"),
                password: cookie.load("password")});
            this.props.socket.on('SIGN_IN_RESPONSE', function(data){
                if(data.res === "SIGN_IN_SUCCESSFULLY"){
                    // this.props.UserLogged(true);
                    usrlog(true);
                }
                else{
                    // this.props.UserLogged(false);
                    usrlog(false);
                }
            });
        }
        // // listCookies();
        // console.log("cookie sign in ?: " + res111);
        // return res111;
    }

    handleSignIn(){
        this.props.socket.emit('TRY_SIGN_IN', this.props.userKeys);
        var nick = this.props.userKeys.nick;
        var password = this.props.userKeys.password;
        // console.log(" $$$$$$$$$$$$$$$$$$$$$$$$ cookie saved nick: " + nick +" password: " +password );
        this.props.socket.on('SIGN_IN_RESPONSE', function(data){
            if(data.res === "SIGN_IN_SUCCESSFULLY"){
                // browserHistory.push('/register-successful');
                console.log("LOGIN SUCCESSFULLY !!! @@@ !!!!");
                console.log("cookie saved nick: " + nick +" password: " +password );
                cookie.save("nick", nick, {path: '/', maxAge: 14 * 24 * 60 * 60});
                cookie.save("password", password, {path: '/', maxAge: 14 * 24 * 60 * 60});
            }
            else{
                console.log("LOGIN NOT SUCCESSFULLY !!! @@@ !!!!");
                // browserHistory.push('/register');
                // store.dispatch(push('/register'));
            }
        });
        // this.props.userLogged(true);
        this.setState({open: false});
    };

    updateTextFieldsState(newValue, userKeys, UserKeysUpdate, type){
        var newTextFieldsContent = _.clone(userKeys);
        newTextFieldsContent[type] = newValue;
        UserKeysUpdate(newTextFieldsContent);
        console.log(newTextFieldsContent);

    };

    render() {
        // const actions = [
        //     <FlatButton
        //         label="Ok"
        //         primary={true}
        //         keyboardFocused={true}
        //         onTouchTap={this.handleClose.bind(this)}
        //     />,
        // ];
        {/*<Button style={buttonStyle} onClick={this.handleSignIn}>Sign in</Button>*/}
        // <Button style={buttonStyle} onClick={() => this.handleSignIn(this.props.userKeys.Nick, this.props.userKeys.Password)}>Sign in</Button>
        const actions = [
            <Button style={buttonStyle} onClick={this.handleSignIn}>Sign in</Button>
        ];
        // this.cookieSignIn(this.props.userLogged);
        const {content, router, children, userLoggedStat} = this.props;


        console.log("user logged stat: " + userLoggedStat);
        return (
            <div>
                <AppBar
                    title={<Link to="/" style={{color: 'white', textDecoration: 'none'}}>Orgella</Link>}
                    style={{marginBottom: '16px'}}
                    iconElementLeft={
                        <IconMenu
                            iconButtonElement={
                                <IconButton iconStyle={{color: 'white'}} onClick={() => this.cookieSignIn(this.props.UserLogged)}>
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
                                    onTouchTap={this.handleSignOut}
                                /> :
                                    <MenuItem
                                        primaryText="Sign in"
                                        leftIcon={<SignInIcon />}
                                        onTouchTap={this.handleOpenDialog}
                                    />
                            }
                        </IconMenu>
                    }
                />

                <Dialog
                    title="Sign in to Orgella"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                >
                    <Row>
                    <TextField
                        floatingLabelText="Orgella nick"
                        hintText="Orgella Nick Field"
                        onChange={(event, newValue) => this.updateTextFieldsState(newValue, this.props.userKeys, this.props.UserKeysUpdate, "nick")}
                    />
                        </Row>
                    <Row>
                    <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                        onChange={(event, newValue) => this.updateTextFieldsState(newValue, this.props.userKeys, this.props.UserKeysUpdate, "password")}
                    />
                        </Row>
                </Dialog>


                <Col md={1}/>
                <Col md={22} style={{maxWidth: '70vw', float: 'none', margin: '0 auto'}}>
                    {children}
                </Col>
                <Col md={1}/>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userLoggedStat: state.UserLogged,
        userKeys: state.UserKeys
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({UserLogged: UserLogged,
        UserKeysUpdate: UserKeys}, dispatch);
}
export default withRouter (connect(mapStateToProps, matchDispatchToProps)(ApplicationBarDisplayer));


// export default withRouter(ApplicationBarDisplayer);

