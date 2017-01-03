import React from "react";
import {Row} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/main.css'


const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '40px'
};

//
// floatingLabelText="Orgella nick"

const Registration = ({alibaba2}) => (
    <div>
        <Row>
        <font style={codeStyle}>Registration</font>
        </Row>
        <Row>
        <TextField
            floatingLabelText={alibaba2}
            hintText="Orgella Nick Field"
        />
        </Row>
        <Row>
            <TextField
                floatingLabelText="First Name"
                hintText="Name Field"
            />
        </Row>
        <Row>
            <TextField
                floatingLabelText="Last Name"
                hintText="Last Name Field"
            />
        </Row>
        <Row>
            <TextField
                floatingLabelText="Address"
                hintText="Address Field"
            />
        </Row>
        <Row>
            <TextField
                hintText="Password Field"
                floatingLabelText="Password"
                type="password"
            />
        </Row>
        <Row>
            <TextField
                hintText="Repeat Password Field"
                floatingLabelText="Repeat Password"
                type="password"
            />
        </Row>
        <Row>
            <br/>
            <Button style={buttonStyle} onClick={() => console.log("it works")}>Register</Button>
        </Row>
    </div>

);

export default Registration