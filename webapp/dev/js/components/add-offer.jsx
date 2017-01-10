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

const fillArrayWithNumbers = (n) =>  {
    var arr = Array.apply(null, Array(n));
    return arr.map(function (x, i) { return i });
};


const updateTextFieldsState = (value, TextFieldContent, TextFieldContentUpdate, art, shipmentPossibilityAmount) => {
    var newTextFieldsContent = _.clone(TextFieldContent);
    //uncomment if you want handle select all and handle enable all
    // if(art === "shipmentPossibility"){
    //     if(value === "none"){
    //         newTextFieldsContent[art] = [];
    //     }
    //     else if( value === "all"){
    //         newTextFieldsContent[art] = fillArrayWithNumbers(shipmentPossibilityAmount);
    //     }
    //     else{
    //         newTextFieldsContent[art] = value;
    //     }
    // }
    // else{
    //     newTextFieldsContent[art] = value;
    // }
    //comment if you want handle select all and handle enable all
    newTextFieldsContent[art] = value;
    TextFieldContentUpdate(newTextFieldsContent);
};

const isInt = (value) => {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
};

const addOfferDataCorrect = (data) => {
    var dat = {
        ProductName: data.ProductName,
        Category: data.Category,
        Description: data.Description,
        Price: data.Price,
        ProductQuantity: data.ProductQuantity,
        UserNick: cookie.load("nick")
    };
    for(var key in dat) {
        if(dat[key] === ''){
            return false;
        }
    }
    if(!isInt(dat.Price) || !isInt(data.ProductQuantity)){
        return false;
    }
        return true;
};

const foo = (data) => {
    var dat = {
        ProductName: data.ProductName,
        Category: data.Category,
        Description: data.Description,
        Price: data.Price,
        ProductQuantity: data.ProductQuantity,
        UserNick: cookie.load("nick"),
        shipmentPossibility: data.shipmentPossibility
    };
    for(var key in dat) {
        if(dat[key] === '' || dat[key].length === 0 || dat[key] === "none"){
            return true;
        }
    }
    return false;
};

const chooseComponentToDisplay = (TextFieldsContent, socket, addOfferStatus) => {
    if(foo(TextFieldsContent)){
        return (<br/>)
    }
    else if(addOfferDataCorrect(TextFieldsContent)){
        return(<Button style={buttonStyle} onClick={() => checkCustomerInputWithDatabase(socket, addOfferStatus, TextFieldsContent)}>Add Offer</Button>)
    }
    else{
        return (<font style={codeStyle}>Incorrect data</font>)
    }
};

const checkCustomerInputWithDatabase = (socket, updateAddOfferStatus, addOfferData) => {
    var aaaa = {
        ProductName: addOfferData.ProductName,
        Category: addOfferData.Category,
        Description: addOfferData.Description,
        Price: parseInt(addOfferData.Price),
        ProductQuantity: parseInt(addOfferData.ProductQuantity),
        UserNick: cookie.load("nick"),
        shipmentPossibility: addOfferData.shipmentPossibility
    };
    socket.emit('ADD_OFFER_DATA',aaaa);
    socket.on('ADD_OFFER_RESPONSE', function(data){
        if(data.res === "ADD_OFFER_SUCCESSFUL"){
            browserHistory.push('/add-offer-successfully');
        }
        else{
            console.log("register not succesfull !!!");
            browserHistory.push('/add-offer');
        }
    });
    // updateAddOfferStatus(true);
};

const AddOffer = ({socket, TextFieldsContent, addOfferTextFieldContentUpdate, router, addOfferStatus, updateAddOfferStatus, shipmentPossibility}) => {
    return (
        <div>
            <Row>
                <font style={codeStyle}>Add Offer</font>
            </Row>
            <Row>
                <SingleOfferImage withDescription={false} image="no-image3.png"/>

                <Col md={3}>
                </Col>
                <Col md={8}>
                    <Row>
                    <TextField
                        floatingLabelText="Product Name"
                        hintText="Product Name Field"
                        onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "ProductName", shipmentPossibility.length)}
                    />
                        </Row>

                    <Row>
                        <TextField
                            floatingLabelText="Category"
                            hintText="Category Field"
                            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "Category", shipmentPossibility.length)}
                        />
                    </Row>

                    <Row>
                        <TextField
                            floatingLabelText="Product Description"
                            hintText="Product Description Field"
                            multiLine={true}
                            rows={2}
                            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "Description", shipmentPossibility.length)}
                        />
                    </Row>

                    <Row>
                        <TextField
                            floatingLabelText="Price"
                            hintText="Price Field"
                            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "Price", shipmentPossibility.length)}
                        />
                    </Row>

                    <Row>
                        <TextField
                            floatingLabelText="Product Quantity"
                            hintText="Product Quantity Field"
                            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "ProductQuantity", shipmentPossibility.length)}
                        />
                    </Row>
                </Col>
            </Row>
                    <Row>
                        <font style={codeStyle}>Shipment Possibility</font>
                        <br/>
                        <Table multiSelectable={true} onRowSelection={(selectedRows) => updateTextFieldsState(selectedRows, TextFieldsContent,
                            addOfferTextFieldContentUpdate, "shipmentPossibility", shipmentPossibility.length)}>
                            <TableHeader displaySelectAll={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Cost</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody deselectOnClickaway={false}>
                                {shipmentPossibility.map(key => {
                                    return (
                                        <TableRow key={key.ShipmentID} selected={TextFieldsContent.shipmentPossibility.indexOf(key.ShipmentID) > -1}>
                                            <TableRowColumn>{key.ShipmentID}</TableRowColumn>
                                            <TableRowColumn>{key.ShipmentName}</TableRowColumn>
                                            <TableRowColumn>{key.Price}</TableRowColumn>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        </Row>
                    <Row>
                        <br/>
                        {
                        chooseComponentToDisplay(TextFieldsContent, socket, addOfferStatus)

                        }

                    </Row>
        </div>)
};

// selected={TextFieldsContent.shipmentPossibility.indexOf(key) > -1}

function mapStateToProps(state) {
    return {
        TextFieldsContent: state.display.AddOfferTextFieldsContent,
        userLoggedStat: state.display.UserLogged,
        addOfferStatus : state.display.AddOfferStatus,
        shipmentPossibility: state.display.shipmentPossibility
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addOfferTextFieldContentUpdate: addOfferTextFieldContent,
        UserLogged: UserLogged,
        updateAddOfferStatus : addOfferStatus}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(AddOffer));


//
// <Table multiSelectable={true} onRowSelection={(selectedRows) => updateTextFieldsState(selectedRows, TextFieldsContent, addOfferTextFieldContentUpdate, "shipmentPossibility")}>
//
// <Table multiSelectable={true} onRowSelection={(selectedRows) => updateTextFieldsState(selectedRows, TextFieldsContent,
//     addOfferTextFieldContentUpdate, "shipmentPossibility", shipmentPossibility.length)}>