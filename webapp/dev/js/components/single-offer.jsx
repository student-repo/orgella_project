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
import HorizontalLinearStepper from "./horizontal-linear-stepper";

const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontSize: '40px'
};

const infoStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontSize: '20px'
};

const categoryStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '20px'
};



const SingleOffer = ({socket, offerDisplayInfo}) => {
    return (
        <div>
            <Row>
                <font style={codeStyle}>Single Offer Displaying</font>
            </Row>
            <Row>
                <SingleOfferImage withDescription={false}/>
                <Col md={2}>
                    </Col>
                <Col md={14}>
                    <font style={categoryStyle}>Product Name: </font>
                    <font style={infoStyle}>{offerDisplayInfo.ProductName}</font>
                    <br/>
                    <font style={categoryStyle}>Price: </font>
                    <font style={infoStyle}>${offerDisplayInfo.Price}</font>
                    <br/>
                    <font style={categoryStyle}>ProductQuantity: </font>
                    <font style={infoStyle}>{offerDisplayInfo.ProductQuantity}</font>
                    <br/>
                    <font style={categoryStyle}>Description: </font>
                    <font style={infoStyle}>{offerDisplayInfo.Description}</font>
                </Col>
            </Row>
            <Row>
                <HorizontalLinearStepper />
            </Row>
        </div>)
};

function mapStateToProps(state) {
    return {
        offerDisplayInfo: state.display.singleOfferDisplayInfo
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addOfferTextFieldContentUpdate: addOfferTextFieldContent}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(SingleOffer));
