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
import {myAccountOffers} from '../actions/my-account-offers-action'
import {myAccountOrders} from '../actions/my-account-orders-action'
import {clearMyAccountOrders} from '../actions/clear-my-account-orders'
import {clearMyAccountOffers} from '../actions/clear-my-account-offers'

const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontSize: '40px'
};

const style = {
    'border': '1px solid #d9d9d9',
    'maxWidth': '100%',
    'cursor': 'pointer'
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


const getMyAccountOffers = (socket,myAccountOffers, router, clearMyAccountOrders) => {
    socket.emit('MY_ACCOUNT_OFFERS',cookie.load("nick"));
    socket.on('MY_ACCOUNT_OFFERS_RESPONSE', function(data){
        if(data.res === "MY_ACCOUNT_OFFERS_SUCCESSFUL"){
            myAccountOffers(data.data);
        }
        else{
            console.log("get offers not successful !!!");
            router.push("/failure");
            // browserHistory.push('/register');
        }
    });
    clearMyAccountOrders();
};

const getMyAccountOrders = (socket,myAccountOrdersLoad, router, clearMyAccountOffers) => {
    socket.emit('MY_ACCOUNT_ORDERS',cookie.load("nick"));
    socket.on('MY_ACCOUNT_ORDERS_RESPONSE', function(data){
        if(data.res === "MY_ACCOUNT_ORDERS_SUCCESSFUL"){
            console.log(data.data);
            myAccountOrdersLoad(data.data);
        }
        else{
            console.log("get offers not successful !!!");
            router.push("/failure");
            // browserHistory.push('/register');
        }
    });
    clearMyAccountOffers();
};


const MyAccount = ({socket, router, myAccountData, myAccountOffers, myAccountOffersLoad, myAccountOrders,
    myAccountOrdersLoad, clearMyAccountOffers, clearMyAccountOrders}) => {
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
            <Row>
                <Button style={buttonStyle} onClick={() => getMyAccountOffers(socket, myAccountOffersLoad, router, clearMyAccountOrders)}>My Offers</Button>
            </Row>
            <br/>
            <Row>
                <Button style={buttonStyle} onClick={() => getMyAccountOrders(socket, myAccountOrdersLoad, router, clearMyAccountOffers)}>My Order History</Button>
            </Row>
            <br/>
            <br/>
            {myAccountOffers.map(key => {
                return (
                    <div key={Math.random()}>
                        <Row>
                        <Col md={8}>
                            <img className="entryImage" src="no-image3.png" alt="Unable to load image" style={style}/>
                            </Col>
                            <Col md={16}>
                                <font style={codeStyleSmallerBold}>Product Name: </font>
                                <font style={codeStyleSmaller}>{key.ProductName}</font>
                                <br/>

                                <font style={codeStyleSmallerBold}>Category: </font>
                                <font style={codeStyleSmaller}>{key.Category}</font>
                                <br/>

                                <font style={codeStyleSmallerBold}>Quantity: </font>
                                <font style={codeStyleSmaller}>{key.ProductQuantity}</font>
                                <br/>

                                <font style={codeStyleSmallerBold}>Price: </font>
                                <font style={codeStyleSmaller}>{"$ " + key.Price}</font>
                                <br/>

                                <font style={codeStyleSmallerBold}>Description: </font>
                                <font style={codeStyleSmaller}>{key.Description}</font>
                                <br/>
                            </Col>
                            </Row>
                        <br/>
                    </div>
                )
            })}

            {myAccountOrders.map(key => {
                return (
                    <div key={Math.random()}>
                        <Row>
                            <Col md={8}>
                                <img className="entryImage" src="no-image3.png" alt="Unable to load image" style={style}/>
                            </Col>
                            <Col md={16}>
                                <font style={codeStyleSmallerBold}>Product Name: </font>
                                <font style={codeStyleSmaller}>{key.ProductName}</font>
                                <br/>

                                <font style={codeStyleSmallerBold}>Total: </font>
                                <font style={codeStyleSmaller}>{"$ " + key.TotalPrice}</font>
                                <br/>

                                <font style={codeStyleSmallerBold}>Unit Price: </font>
                                <font style={codeStyleSmaller}>{"$ " + key.UnitPrice}</font>
                                <br/>

                                <font style={codeStyleSmallerBold}>Quantity: </font>
                                <font style={codeStyleSmaller}>{key.Quantity}</font>
                                <br/>

                                <font style={codeStyleSmallerBold}>Shipment company: </font>
                                <font style={codeStyleSmaller}>{key.ShipmentName}</font>
                                <br/>
                            </Col>
                        </Row>
                        <br/>
                    </div>
                )
            })}

        </div>)
};

function mapStateToProps(state) {
    return {
        myAccountData: state.display.myAccountData,
        myAccountOffers: state.display.myAccountOffers,
        myAccountOrders: state.display.myAccountOrders
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addOfferTextFieldContentUpdate: addOfferTextFieldContent,
        UserLogged: UserLogged,
        updateAddOfferStatus : addOfferStatus,
        myAccountOffersLoad: myAccountOffers,
        myAccountOrdersLoad: myAccountOrders,
        clearMyAccountOffers: clearMyAccountOffers,
        clearMyAccountOrders: clearMyAccountOrders}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(MyAccount));