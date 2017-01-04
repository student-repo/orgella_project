import React from "react";
import {Row} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/simple-button-css.css'
import {browserHistory} from "react-router";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerStatus} from '../actions/register-status-action'
import {registerTextFieldContent} from '../actions/register-textfields-content'
import RegistrationTextField from './register-text-field'

const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontSize: '40px'
};

const checkCustomerIntputWithDatabase = (socket,registerStatus, registerData) => {
    socket.emit('REGISTER_DATA',registerData);
    socket.on('REGISTER_RESPONSE', function(data){
        if(data.res === "REGISTER_SUCCESSFUL"){
            browserHistory.push('/register-successful');
        }
        else{
            console.log("register not succesfull !!!");
            browserHistory.push('/register');
        }
    });
    registerStatus(true);
};

const registerDataCorrect = (data) => {
    for(var key in data) {
        if(data[key] === ''){
            return false;
        }
    }
    if(data.password !== data.repeatPassword){
        return false;
    }
    else{
        return true;
    }
};


const Registration = ({socket, registerStat, registerStatus, registerTextFieldContentUpdate, registerTextFieldContent}) => {
    return (
    <div>
        <Row>
        <font style={codeStyle}>Registration</font>
        </Row>
        <Row>
        <RegistrationTextField
            type="nick"
            labelText="Orgella nick"
            hintText="Orgella Nick Field"
        />
        </Row>
        <Row>
            <RegistrationTextField
                type="firstName"
                labelText="First Name"
                hintText="Name Field"
            />
        </Row>
        <Row>
            <RegistrationTextField
                type="lastName"
                labelText="Last Name"
                hintText="Last Name Field"
            />
        </Row>
        <Row>
            <RegistrationTextField
                type="address"
                labelText="Address"
                hintText="Address Field"
            />
        </Row>
        <Row>
            <RegistrationTextField
                type="password"
                labelText="Password"
                hintText="Password Field"

            />
        </Row>
        <Row>
            <RegistrationTextField
                type="repeatPassword"
                labelText="Repeat Password"
                hintText="Repeat Password Field"
            />
        </Row>
        <Row>
            <br/>
            {registerDataCorrect(registerTextFieldContent) ?
                    <Button style={buttonStyle} onClick={() => checkCustomerIntputWithDatabase(socket, registerStatus, registerTextFieldContent)}>Register</Button> :
                    <Button style={buttonStyle} onClick={() => console.log("button is working")}>Register</Button>
            }
        </Row>
    </div>)
};

function mapStateToProps(state) {
    return {
        registerStat: state.display.RegisterStatus,
        registerTextFieldContent: state.display.RegisterTextFieldsContent
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({registerStatus: registerStatus,
        registerTextFieldContentUpdate: registerTextFieldContent}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Registration);