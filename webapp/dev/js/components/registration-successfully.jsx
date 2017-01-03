import React from "react";
import {Row} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/bigger-button-css.css'
import {browserHistory} from "react-router";


const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '40px'
};

const codeStyleSmaller = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '15px'
};


const RegistrationSuccessfully = () => (
    <div>
    <Row>
        <font style={codeStyle}>You have successfully registered!</font>
    </Row>
        <Row>
            <br/>
            <font style={codeStyleSmaller}>Now you can go back to main page, sign in and use our website without any restrictions.</font>
        </Row>
    <Row>
    <br/>
    <Button style={buttonStyle} onClick={() => browserHistory.push('/')}>Back to main page</Button>
    </Row>
    </div>
);

export default RegistrationSuccessfully

// <Button style={buttonStyle} onClick={() => socket.emit('foo','')}>Register</Button>