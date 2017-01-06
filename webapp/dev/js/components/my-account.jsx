import React from "react";
import {Col, Row} from "pui-react-grids";
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
import SingleOfferImage from './single-image'
import {addOfferTextFieldContent} from '../actions/add-offer-text-fields-content-action'
import {addOfferStatus} from '../actions/add-offer-status';
import {browserHistory} from "react-router";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontSize: '40px'
};


const codeStyleSmaller = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '30px'
};

const codeStyleSmallerBold = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '30px'
};


const MyAccount = ({socket, router, myAccountData}) => {
    return (
        <div>
            <Row>
                <font style={codeStyle}>My Account</font>
            </Row>
            <Row>
                <SingleOfferImage withDescription={false} image="my-account.png"/>

                <Col md={2}>
                </Col>
                <Col md={14}>
                    <Row>
                        <font style={codeStyleSmallerBold}>Nick: </font>
                        <font style={codeStyleSmaller}>{myAccountData[0].Nick}</font>
                        <br/>
                    </Row>
                    <Row>
                        <font style={codeStyleSmallerBold}>First Name: </font>
                        <font style={codeStyleSmaller}>{myAccountData[0].FirstName}</font>
                        <br/>
                    </Row>
                    <Row>
                        <font style={codeStyleSmallerBold}>Last Name: </font>
                        <font style={codeStyleSmaller}>{myAccountData[0].LastName}</font>
                        <br/>
                    </Row>
                    <Row>
                        <font style={codeStyleSmallerBold}>Address: </font>
                        <font style={codeStyleSmaller}>{myAccountData[0].Address}</font>
                        <br/>
                    </Row>

                </Col>
            </Row>

        </div>)
};

function mapStateToProps(state) {
    return {
        myAccountData: state.display.myAccountData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addOfferTextFieldContentUpdate: addOfferTextFieldContent,
        UserLogged: UserLogged,
        updateAddOfferStatus : addOfferStatus}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(MyAccount));