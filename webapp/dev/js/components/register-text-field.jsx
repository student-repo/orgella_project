import React from "react";
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerTextFieldContent} from '../actions/register-textfields-content'
import _ from 'underscore';


const updateTextFieldsState = (value, registerTextFieldContent, registerTextFieldContentUpdate, art) => {
    var newTextFieldsContent = _.clone(registerTextFieldContent);
    newTextFieldsContent[art] = value;
    registerTextFieldContentUpdate(newTextFieldsContent);
};


const RegistrationTextField = ({type, labelText, hintText, registerTextFieldContentUpdate, registerTextFieldContent}) => {
    if(registerTextFieldContent[type] === ''){
        return (
            <TextField
                hintText={hintText}
                floatingLabelText={labelText}
                errorText="This field is required"
                onChange={(event, newValue) => updateTextFieldsState(newValue, registerTextFieldContent, registerTextFieldContentUpdate, type)}
            />
        )
    }
    else{
        if((type === 'repeatPassword' || type === 'password') && registerTextFieldContent['repeatPassword'] !== registerTextFieldContent['password']){
            return (
                <TextField
                    hintText={hintText}
                    floatingLabelText={labelText}
                    errorText="Wrong password"
                    type="password"
                    onChange={(event, newValue) => updateTextFieldsState(newValue, registerTextFieldContent, registerTextFieldContentUpdate, type)}
                />
            )
        }
        else if((type === 'repeatPassword' || type === 'password')){
            return (
                <TextField
                    floatingLabelText={labelText}
                    hintText={hintText}
                    type="password"
                    onChange={(event, newValue) => updateTextFieldsState(newValue, registerTextFieldContent, registerTextFieldContentUpdate, type)}
                />
            )
        }
        else{
            return (
                <TextField
                    floatingLabelText={labelText}
                    hintText={hintText}
                    onChange={(event, newValue) => updateTextFieldsState(newValue, registerTextFieldContent, registerTextFieldContentUpdate, type)}
                />
            )
        }
    }
};

function mapStateToProps(state) {
    return {
        registerTextFieldContent: state.RegisterTextFieldsContent
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({registerTextFieldContentUpdate: registerTextFieldContent}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(RegistrationTextField);
