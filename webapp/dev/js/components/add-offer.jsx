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


const updateTextFieldsState = (value, TextFieldContent, TextFieldContentUpdate, art) => {
    var newTextFieldsContent = _.clone(TextFieldContent);
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

const AddOffer = ({socket, TextFieldsContent, addOfferTextFieldContentUpdate, router, UserLogged, userLoggedStat, addOfferStatus, updateAddOfferStatus, shipmentPossibility}) => {
    console.log(TextFieldsContent);
    return (
        <div>
            <Row>
                <font style={codeStyle}>Add Offer</font>
            </Row>
            <Row>
                <SingleOfferImage withDescription={false}/>

                <Col md={3}>
                </Col>
                <Col md={8}>
                    <Row>
                    <TextField
                        floatingLabelText="Product Name"
                        hintText="Product Name Field"
                        onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "ProductName")}
                    />
                        </Row>

                    <Row>
                        <TextField
                            floatingLabelText="Category"
                            hintText="Category Field"
                            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "Category")}
                        />
                    </Row>

                    <Row>
                        <TextField
                            floatingLabelText="Product Description"
                            hintText="Product Description Field"
                            multiLine={true}
                            rows={2}
                            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "Description")}
                        />
                    </Row>

                    <Row>
                        <TextField
                            floatingLabelText="Price"
                            hintText="Price Field"
                            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "Price")}
                        />
                    </Row>

                    <Row>
                        <TextField
                            floatingLabelText="Product Quantity"
                            hintText="Product Quantity Field"
                            onChange={(event, newValue) => updateTextFieldsState(newValue, TextFieldsContent, addOfferTextFieldContentUpdate, "ProductQuantity")}
                        />
                    </Row>
                </Col>
            </Row>
                    <Row>
                        <font style={codeStyle}>Shipment Possibility</font>
                        <br/>
                        <Table multiSelectable={true} onRowSelection={(selectedRows) => updateTextFieldsState(selectedRows, TextFieldsContent, addOfferTextFieldContentUpdate, "shipmentPossibility")}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Cost</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody deselectOnClickaway={false}>
                                {_.keys(shipmentPossibility).map(key => {
                                    return (
                                        <TableRow key={key} selected={TextFieldsContent.shipmentPossibility.indexOf(key) > -1}>
                                            <TableRowColumn>{key}</TableRowColumn>
                                            <TableRowColumn>{shipmentPossibility[key].type}</TableRowColumn>
                                            <TableRowColumn>{shipmentPossibility[key].cost}</TableRowColumn>
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