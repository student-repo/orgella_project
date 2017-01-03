import React from "react";
import {Row} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/simple-button-css.css'
import {browserHistory} from "react-router";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerStatus} from '../actions/register-status-action'
import {registerTextFieldContent} from '../actions/register-textfields-content'
import _ from 'underscore';
import RegistrationTextField from './register-text-field'


const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '40px'
};


const checkCustomerIntputWithDatabase = (socket,registerStatus) => {
    socket.emit('REGISTER_DATA','');
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


const Registration = ({alibaba2,socket, registerStat, registerStatus, registerTextFieldContentUpdate, registerTextFieldContent}) => {
    console.log("register status");
    console.log(registerStat);
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
            {
                registerDataCorrect(registerTextFieldContent) ? <Button style={buttonStyle} onClick={() => checkCustomerIntputWithDatabase(socket, registerStatus)}>Register</Button> : <Button style={buttonStyle} onClick={() => console.log("button is working")}>Register</Button>
            }
        </Row>
    </div>)
};

function mapStateToProps(state) {
    return {
        registerStat: state.RegisterStatus,
        registerTextFieldContent: state.RegisterTextFieldsContent
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({registerStatus: registerStatus,
        registerTextFieldContentUpdate: registerTextFieldContent}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Registration);


















//
//
//
// import React from "react";
// import {Row} from "pui-react-grids";
// import * as Colors from 'material-ui/styles/colors';
// import TextField from 'material-ui/TextField';
// import Button from 'react-bootstrap/lib/Button'
// import * as buttonStyle from '../../scss/simple-button-css.css'
// import {browserHistory} from "react-router";
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {registerStatus} from '../actions/register-status-action'
// import {registerTextFieldContent} from '../actions/register-textfields-content'
// import _ from 'underscore';
// import RegistrationTextField from './register-text-field'
//
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
// //
// // floatingLabelText="Orgella nick"
// // floatingLabelText="First Name"
//
// const foo = (socket,registerStatus) => {
//     socket.emit('REGISTER_DATA','');
//     socket.on('REGISTER_RESPONSE', function(data){
//         if(data.res === "REGISTER_SUCCESSFUL"){
//             browserHistory.push('/register-successful');
//         }
//         else{
//             console.log("register not succesfull !!!");
//             browserHistory.push('/register');
//         }
//     });
//     registerStatus(true);
// };
//
// const foo2 = (value, registerTextFieldContent, registerTextFieldContentUpdate, art) => {
//     var aaa = _.clone(registerTextFieldContent);
//     aaa[art] = value;
//     registerTextFieldContentUpdate(aaa);
//     console.log("$$$$ foo2 return object");
//     console.log(aaa);
//     console.log("added value: " + value);
// };
//
//
//
// var nickLabel = "";
//
//
// const Registration = ({alibaba2,socket, registerStat, registerStatus, registerTextFieldContentUpdate, registerTextFieldContent}) => {
//     console.log("register status");
//     console.log(registerStat);
//     return (
//         <div>
//             <Row>
//                 <font style={codeStyle}>Registration</font>
//             </Row>
//             <Row>
//                 <RegistrationTextField
//                     {/*type="nick"*/}
//                     {/*labelText="Orgella nick"*/}
//                     {/*hintText="Orgella Nick Field"*/}
//
//
//                     floatingLabelText="Orgella nick"
//                     hintText="Orgella Nick Field"
//                     onChange={(event, newValue) => foo2(newValue, registerTextFieldContent, registerTextFieldContentUpdate, "nick")}
//                 />
//             </Row>
//             <Row>
//                 <RegistrationTextField
//                     floatingLabelText="First Name"
//                     hintText="Name Field"
//                     onChange={(event, newValue) => foo2(newValue, registerTextFieldContent, registerTextFieldContentUpdate, "firstName")}
//                 />
//             </Row>
//             <Row>
//                 <RegistrationTextField
//                     floatingLabelText="Last Name"
//                     hintText="Last Name Field"
//                     onChange={(event, newValue) => foo2(newValue, registerTextFieldContent, registerTextFieldContentUpdate, "lastName")}
//                 />
//             </Row>
//             <Row>
//                 <RegistrationTextField
//                     floatingLabelText="Address"
//                     hintText="Address Field"
//                     onChange={(event, newValue) => foo2(newValue, registerTextFieldContent, registerTextFieldContentUpdate, "address")}
//                 />
//             </Row>
//             <Row>
//                 <RegistrationTextField
//                     hintText="Password Field"
//                     floatingLabelText="Password"
//                     type="password"
//                     onChange={(event, newValue) => foo2(newValue, registerTextFieldContent, registerTextFieldContentUpdate, "password")}
//                 />
//             </Row>
//             <Row>
//                 <RegistrationTextField
//                     hintText="Repeat Password Field"
//                     floatingLabelText="Repeat Password"
//                     type="password"
//                     onChange={(event, newValue) => foo2(newValue, registerTextFieldContent, registerTextFieldContentUpdate, "repeatPassword")}
//                 />
//             </Row>
//             <Row>
//                 <br/>
//                 <Button style={buttonStyle} onClick={() => foo(socket, registerStatus)}>Register</Button>
//             </Row>
//         </div>)
// };
//
// function mapStateToProps(state) {
//     return {
//         registerStat: state.RegisterStatus,
//         registerTextFieldContent: state.RegisterTextFieldsContent
//     };
// }
//
// function matchDispatchToProps(dispatch){
//     return bindActionCreators({registerStatus: registerStatus,
//         registerTextFieldContentUpdate: registerTextFieldContent}, dispatch);
// }
//
// export default connect(mapStateToProps, matchDispatchToProps)(Registration);
// // export default Registration
//
// // <Button style={buttonStyle} onClick={() => socket.emit('foo','')}>Register</Button>
//
// // <Button style={buttonStyle} onClick={() => foo(socket)}>Register</Button>