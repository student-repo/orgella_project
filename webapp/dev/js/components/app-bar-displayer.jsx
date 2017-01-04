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



const cookieSignIn = (socket, usrlog) => {

    if(_.isUndefined(cookie.load("nick")) || _.isUndefined(cookie.load('password'))){
        // this.props.UserLogged(true);
        usrlog(false);
    }
    else{
        socket.emit('TRY_SIGN_IN', {nick: cookie.load("nick"),
            password: cookie.load("password")});
        socket.on('SIGN_IN_RESPONSE', function(data){
            if(data.res === "SIGN_IN_SUCCESSFULLY"){
                usrlog(true);
            }
            else{
                usrlog(false);
            }
        });
    }
};

    const handleSignOut = () => {
        cookie.remove('nick');
        cookie.remove('password');
        // browserHistory.push('/register');
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
                            <IconButton iconStyle={{color: 'white'}} onClick={() => cookieSignIn(socket, UserLogged)}>
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
                                onTouchTap={() => handleSignOut()}
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
    return {
        userLoggedStat: state.display.UserLogged
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({UserLogged: UserLogged}, dispatch);
}
export default withRouter (connect(mapStateToProps, matchDispatchToProps)(ApplicationBarDisplayer));


// export default withRouter(ApplicationBarDisplayer);





























//
// import React, {Component} from "react";
// import AppBar from "material-ui/AppBar";
// import IconButton from "material-ui/IconButton";
// import IconMenu from "material-ui/IconMenu";
// // import LogIcon from 'material-ui/svg-icons/action/exit-to-app'
// import NavigationMenu from "material-ui/svg-icons/navigation/menu";
// import MenuItem from "material-ui/MenuItem";
// import {Link, withRouter} from "react-router";
// import {Col, Row} from "pui-react-grids";
// import {HomeIcon, RegisterIcon, AddOfferIcon, MyAccountIcon, SignInIcon, SignOutIcon} from "../utils/icons"
// import Divider from 'material-ui/Divider';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import TextField from 'material-ui/TextField';
// import * as Colors from 'material-ui/styles/colors';
// import Button from 'react-bootstrap/lib/Button'
// import * as buttonStyle from '../../scss/simple-button-css.css'
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import {UserLogged} from '../actions/user-logged-action'
// import {UserKeys} from '../actions/user-keys-action'
// import {LoginDialogShow} from '../actions/login-dialog-show-action'
// import _ from 'underscore';
// import cookie from 'react-cookie';
//
// const codeStyle = {
//     fontFamily: 'Courier New',
//     color: Colors.grey600,
//     padding: '6px',
//     borderRadius: '6px',
//     // fontWeight: 'bold',
//     fontSize: '40px'
// };
//
//
// function listCookies() {
//     var theCookies = document.cookie.split(';');
//     var aString = '';
//     for (var i = 1 ; i <= theCookies.length; i++) {
//         aString += i + ' ' + theCookies[i-1] + "\n";
//     }
//     return aString;
// }
//
// class ApplicationBarDisplayer extends Component {
//
//     constructor(){
//         super();
//         this.state = {open: false,
//             loginSuccessfully : false,
//             loginNotSuccessfully: false};
//         this.handleSignIn = this.handleSignIn.bind(this);
//         this.handleSignOut = this.handleSignOut.bind(this);
//         // this.handleClose = this.handleClose.bind(this);
//         this.updateTextFieldsState = this.updateTextFieldsState.bind(this);
//         this.handleOpenDialog = this.handleOpenDialog.bind(this);
//         this.cookieSignIn = this.cookieSignIn.bind(this);
//         this.handleCloseDialogs = this.handleCloseDialogs.bind(this);
//     }
//
//     handleOpenDialog(loginDialogUpdate){
//         loginDialogUpdate({loginDialog: true,
//             loginSuccessfully : false,
//             loginNotSuccessfully: false});
//     };
//
//     handleCloseDialogs(loginDialogUpdate){
//         loginDialogUpdate({loginDialog: false,
//             loginSuccessfully : false,
//             loginNotSuccessfully: false});
//     };
//
//     handleSignOut(){
//         cookie.remove('nick');
//         cookie.remove('password');
//     }
//
//     cookieSignIn(usrlog){
//
//         if(_.isUndefined(cookie.load("nick")) || _.isUndefined(cookie.load('password'))){
//             // this.props.UserLogged(true);
//             usrlog(false);
//         }
//         else{
//             this.props.socket.emit('TRY_SIGN_IN', {nick: cookie.load("nick"),
//                 password: cookie.load("password")});
//             this.props.socket.on('SIGN_IN_RESPONSE', function(data){
//                 if(data.res === "SIGN_IN_SUCCESSFULLY"){
//                     // this.props.UserLogged(true);
//                     usrlog(true);
//
//                 }
//                 else{
//                     // this.props.UserLogged(false);
//                     usrlog(false);
//                 }
//             });
//         }
//     }
//
//     handleSignIn(loginDialogUpdate){
//         this.props.socket.emit('TRY_SIGN_IN', this.props.userKeys);
//         var nick = this.props.userKeys.nick;
//         var password = this.props.userKeys.password;
//         this.props.socket.on('SIGN_IN_RESPONSE', function(data){
//             if(data.res === "SIGN_IN_SUCCESSFULLY"){
//                 // browserHistory.push('/register-successful');
//                 console.log("LOGIN SUCCESSFULLY !!! @@@ !!!!");
//                 console.log("cookie saved nick: " + nick +" password: " +password );
//                 cookie.save("nick", nick, {path: '/', maxAge: 14 * 24 * 60 * 60});
//                 cookie.save("password", password, {path: '/', maxAge: 14 * 24 * 60 * 60});
//                 loginDialogUpdate({loginDialog: false,
//                     loginSuccessfully : true,
//                     loginNotSuccessfully: false});
//                 // s = {open: false,
//                 //         loginSuccessfully : true,
//                 //         loginNotSuccessfully: false};
//             }
//             else{
//                 console.log("LOGIN NOT SUCCESSFULLY !!! @@@ !!!!");
//                 loginDialogUpdate({loginDialog: false,
//                     loginSuccessfully : false,
//                     loginNotSuccessfully: true});
//
//             }
//         });
//         // this.setState(s);
//         // console.log("state after sign in: ");
//         // console.log(this.state);
//         // console.log(s);
//         // this.setState({open: false});
//         // this.setState({open: false,
//         //     loginSuccessfully : false,
//         //     loginNotSuccessfully: false});
//     };
//
//     updateTextFieldsState(newValue, userKeys, UserKeysUpdate, type){
//         var newTextFieldsContent = _.clone(userKeys);
//         newTextFieldsContent[type] = newValue;
//         UserKeysUpdate(newTextFieldsContent);
//         console.log(newTextFieldsContent);
//
//     };
//
//     render() {
//         const actionsLogCorrectly = [
//             <FlatButton
//                 label="Ok"
//                 primary={true}
//                 keyboardFocused={true}
//                 onTouchTap={() => this.handleCloseDialogs(this.props.LoginDialogShowUpdate)}
//             />,
//         ];
//         const actionsLogNotCorrectly = [
//             <FlatButton
//                 label="Ok"
//                 primary={true}
//                 keyboardFocused={true}
//                 onTouchTap={() => this.handleCloseDialogs(this.props.LoginDialogShowUpdate)}
//             />,
//         ];
//         const actions = [
//             <Button style={buttonStyle} onClick={() => this.handleSignIn(this.props.LoginDialogShowUpdate)}>Sign in</Button>
//         ];
//         const {content, router, children, userLoggedStat} = this.props;
//
//         return (
//             <div>
//                 <AppBar
//                     title={<Link to="/" style={{color: 'white', textDecoration: 'none'}}>Orgella</Link>}
//                     style={{marginBottom: '16px'}}
//                     iconElementLeft={
//                         <IconMenu
//                             iconButtonElement={
//                                 <IconButton iconStyle={{color: 'white'}} onClick={() => this.cookieSignIn(this.props.UserLogged)}>
//                                     <NavigationMenu />
//                                 </IconButton>
//                             }
//                             targetOrigin={{horizontal: 'left', vertical: 'top'}}
//                             anchorOrigin={{horizontal: 'left', vertical: 'top'}}
//                         >
//                             <MenuItem
//                                 primaryText="Home"
//                                 leftIcon={<HomeIcon />}
//                                 onTouchTap={() => router.push('/')}
//
//                             />
//                             <MenuItem
//                                 primaryText="My account"
//                                 leftIcon={<MyAccountIcon />}
//                             />
//                             <MenuItem
//                                 primaryText="Add offer"
//                                 leftIcon={<AddOfferIcon />}
//                             />
//                             <MenuItem
//                                 primaryText="Register"
//                                 leftIcon={<RegisterIcon />}
//                                 onTouchTap={() => router.push('/register')}
//                             />
//                             <Divider />
//                             {
//                                 userLoggedStat ? <MenuItem
//                                     primaryText="Sign out"
//                                     leftIcon={<SignOutIcon />}
//                                     onTouchTap={this.handleSignOut}
//                                 /> :
//                                     <MenuItem
//                                         primaryText="Sign in"
//                                         leftIcon={<SignInIcon />}
//                                         onTouchTap={() => this.handleOpenDialog(this.props.LoginDialogShowUpdate)}
//                                     />
//
//                             }
//                         </IconMenu>
//                     }
//                 />
//
//                 <Dialog
//                     title="Sign in to Orgella"
//                     actions={actions}
//                     modal={false}
//                     open={this.props.loginDialogShow.loginDialog}
//                 >
//                     <Row>
//                         <TextField
//                             floatingLabelText="Orgella nick"
//                             hintText="Orgella Nick Field"
//                             onChange={(event, newValue) => this.updateTextFieldsState(newValue, this.props.userKeys, this.props.UserKeysUpdate, "nick")}
//                         />
//                     </Row>
//                     <Row>
//                         <TextField
//                             hintText="Password Field"
//                             floatingLabelText="Password"
//                             type="password"
//                             onChange={(event, newValue) => this.updateTextFieldsState(newValue, this.props.userKeys, this.props.UserKeysUpdate, "password")}
//                         />
//                     </Row>
//                 </Dialog>
//                 <Dialog
//                     title="Sign in to Orgella"
//                     actions={actions}
//                     modal={false}
//                     open={this.props.loginDialogShow.loginSuccessfully}
//                 />
//                 <Dialog
//                     title="Sign in to Orgella"
//                     actions={actions}
//                     modal={false}
//                     open={this.props.loginDialogShow.loginNotSuccessfully}
//                 />
//
//
//
//                 <Col md={1}/>
//                 <Col md={22} style={{maxWidth: '70vw', float: 'none', margin: '0 auto'}}>
//                     {children}
//                 </Col>
//                 <Col md={1}/>
//
//             </div>
//         );
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         userLoggedStat: state.UserLogged,
//         userKeys: state.UserKeys,
//         loginDialogShow: state.LoginDialogShow
//     };
// }
//
// function matchDispatchToProps(dispatch){
//     return bindActionCreators({UserLogged: UserLogged,
//         UserKeysUpdate: UserKeys,
//         LoginDialogShowUpdate: LoginDialogShow}, dispatch);
// }
// export default withRouter (connect(mapStateToProps, matchDispatchToProps)(ApplicationBarDisplayer));
//
//
// // export default withRouter(ApplicationBarDisplayer);
//
