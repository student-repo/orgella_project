import React from "react";
import {Row} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/simple-button-css.css'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInTextFieldContent} from '../actions/sign-in-text-field-content'
import TextField from 'material-ui/TextField';
import {Link, withRouter} from "react-router";
import {UserLogged} from '../actions/user-logged-action'
import _ from 'underscore';
import cookie from 'react-cookie';
import md5 from 'md5'

const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontSize: '40px'
};


const updateTextFieldsState = (value, TextFieldContent, TextFieldContentUpdate, art) => {
    var newTextFieldsContent = _.clone(TextFieldContent);
    if(art === 'password'){
        newTextFieldsContent[art] = md5(value);
    }
    else{
        newTextFieldsContent[art] = value;
    }
    TextFieldContentUpdate(newTextFieldsContent);
};

const foo = (socket, customerData, router, UserLogged) => {
    socket.emit('SIGN_IN', customerData);
    socket.on('SIGN_IN_RESPONSE', function(data){
        if(data.res === "SIGN_IN_SUCCESSFULLY"){
            // browserHistory.push('/register-successful');
            console.log("LOGIN SUCCESSFULLY !!! @@@ !!!!");
            console.log("cookie saved nick: " + customerData.nick +" password: " +customerData.password );
            cookie.save("nick", customerData.nick, {path: '/', maxAge: 14 * 24 * 60 * 60});
            cookie.save("password", customerData.password, {path: '/', maxAge: 14 * 24 * 60 * 60});
            // browserHistory.push('/register-successful');
            UserLogged(true);
            router.push('/sign-in-successfully');
        }
        else{
            console.log("LOGIN NOT SUCCESSFULLY !!! @@@ !!!!");
            router.push('/sign-in-failure');
        }
    });
};


const SignIn = ({socket, registerStat, registerStatus, signInTextFieldContentUpdate, TextFieldsContent, router, UserLogged, userLoggedStat}) => {
    console.log(TextFieldsContent);
    return (
        <div>
            <Row>
                <font style={codeStyle}>Sign in to Orgella</font>
            </Row>
            <Row>
                <TextField
                    floatingLabelText="Orgella Nick"
                    hintText="Orgella Nick Field"
                    onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, signInTextFieldContentUpdate, "nick")}
                />
            </Row>
            <Row>
                <TextField
                    floatingLabelText="Password"
                    hintText="Password Field"
                    type="password"
                    onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, signInTextFieldContentUpdate, "password")}
                />
            </Row>

            <Row>
                <br/>
                    <Button style={buttonStyle} onClick={() => foo(socket, TextFieldsContent, router, UserLogged)}>Sign in</Button>

            </Row>
        </div>)
};

function mapStateToProps(state) {
    return {
        TextFieldsContent: state.display.SignInTextFieldsContent,
        userLoggedStat: state.display.UserLogged
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({signInTextFieldContentUpdate: signInTextFieldContent,
        UserLogged: UserLogged}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(SignIn));