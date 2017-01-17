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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {shoppingBasketOrderInfo} from '../actions/shopping-basket-oreder-info-action'
import {clearShoppingBasketOrderInfo} from '../actions/clear-shopping-basket-order-info-action'
import {clearShoppingBasket} from '../actions/clear-shipping-basket-action'

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


const sendMoreOrders = (socket,shoppingBasketOrderInfo, router, shipmentPossibility, clearShoppingBasketOrderInfo, clearShoppingBasket) => {
    var aa = _.clone(shoppingBasketOrderInfo);
    var kk = _.keys(aa);
    var ooo = {};
    for(var i = 0;i < kk.length;i++){
        console.log("%%%%%%%%%%");
        console.log(shipmentPossibility[aa[kk[i]]["Shipment"]].ShipmentName);
        ooo[kk[i]] = {
            "TotalPrice": aa[kk[i]]["Quantity"] * aa[kk[i]]["offerInfo"].Price + Math.ceil(aa[kk[i]]["Quantity"] / shipmentPossibility[aa[kk[i]]["Shipment"]].MaxInParcel) *
            shipmentPossibility[aa[kk[i]]["Shipment"]].Price
        };
        ooo[kk[i]] = {
            "TotalPrice": aa[kk[i]]["Quantity"] * aa[kk[i]]["offerInfo"].Price + Math.ceil(aa[kk[i]]["Quantity"] / shipmentPossibility[aa[kk[i]]["Shipment"]].MaxInParcel) *
            shipmentPossibility[aa[kk[i]]["Shipment"]].Price,
            "nick": cookie.load("nick")
        };
    }
    socket.emit('HANDLE_SHOPPING_BASKET',shoppingBasketOrderInfo, ooo);
    socket.on('HANDLE_SHOPPING_BASKET_RESPONSE', function(data){
        if(data.res === "HANDLE_SHOPPING_BASKET_SUCCESSFUL"){
            router.push("/");
        }
        else{
            router.push("/failure");
        }
    });
    clearShoppingBasketOrderInfo();
    clearShoppingBasket();
};



const foo = (shoppingBasketOrderInfo) =>{
    var keys = _.keys(shoppingBasketOrderInfo);
    for(var i = 0; i<keys.length;i++){
        if(shoppingBasketOrderInfo[keys[i]].Quantity === '' || shoppingBasketOrderInfo[keys[i]].Shipment === ''){
            return false;
        }
    }
    return true;
};

const updateShoppingBasketOrderInfo = (value, shoppingBasketOrderInfoUpdate, shoppingBasketOrderInfo, OfferID, type) => {
    var newBasketOrderInfo = _.clone(shoppingBasketOrderInfo);
    var hhh = newBasketOrderInfo[OfferID]['offerInfo'];
    if(type === "Shipment"){
     var aaa = newBasketOrderInfo[OfferID]['Quantity'];
        newBasketOrderInfo[OfferID] = {[type]: value, "Quantity": aaa, "offerInfo": hhh}
    }
    else{
        var bbb = newBasketOrderInfo[OfferID]['Shipment'];
        newBasketOrderInfo[OfferID] = {[type]: value, "Shipment": bbb,"offerInfo": hhh}
    }
    shoppingBasketOrderInfoUpdate(newBasketOrderInfo);
};
// value={"" ? _.isUndefined(shoppingBasketOrderInfo[offerIDKey]) : shoppingBasketOrderInfo[offerIDKey]["Shipment"]}
// value={shoppingBasketOrderInfo[offerIDKey].Shipment}
const ShoppingBasket = ({socket, router, myAccountData, myAccountOffers, myAccountOffersLoad, myAccountOrders, clearShoppingBasketOrderInfo, clearShoppingBasket,
    myAccountOrdersLoad, clearMyAccountOffers, clearMyAccountOrders, shoppingBasket, shipmentPossibility, shoppingBasketOrderInfoUpdate, shoppingBasketOrderInfo}) => {
    return (
        <div>
            <Row>
                <font style={codeStyle}>Shopping Basket</font>
            </Row>

            <br/>
            <br/>
            {_.keys(shoppingBasket).length === 0 ? <Row>
                <font style={codeStyle}>Shopping Basket empty !</font>
            </Row> : _.keys(shoppingBasket).map(offerIDKey => {
                return (
                    <div key={Math.random()}>
                        <Row>
                            <Col md={8}>
                                <img className="entryImage" src="no-image3.png" alt="Unable to load image" style={style}/>
                            </Col>
                            <Col md={16}>
                                <font style={codeStyleSmallerBold}>Product Name: </font>
                                <font style={codeStyleSmaller}>{shoppingBasket[offerIDKey]["offerInfo"]["ProductName"]}</font>
                                <SelectField
                                    value={shoppingBasketOrderInfo[offerIDKey].Shipment}
                                    maxHeight={200}
                                    floatingLabelText={"Shipment Possibility"}
                                    fullWidth={true}
                                    onChange={(event, key, payload) => updateShoppingBasketOrderInfo(payload, shoppingBasketOrderInfoUpdate, shoppingBasketOrderInfo, offerIDKey, "Shipment")}>
                                    {shoppingBasket[offerIDKey]["shipmentPossibilities"].map(key => {
                                        return (
                                            <MenuItem value={key.ShipmentID - 1} key={key.ShipmentID - 1}
                                                      primaryText={shipmentPossibility[key.ShipmentID - 1].ShipmentName + " $" + shipmentPossibility[key.ShipmentID - 1].Price +
                                                      " ( max in pocket:  " + shipmentPossibility[key.ShipmentID - 1].MaxInParcel + " )"} />
                                        )
                                    })}
                                </SelectField>
                                <SelectField
                                    value={shoppingBasketOrderInfo[offerIDKey].Quantity}
                                    maxHeight={200}
                                    floatingLabelText={"Quantity"}
                                    fullWidth={true}
                                    onChange={(event, key, payload) => updateShoppingBasketOrderInfo(payload, shoppingBasketOrderInfoUpdate, shoppingBasketOrderInfo, offerIDKey, "Quantity")}>
                                    {[,...Array(shoppingBasket[offerIDKey]["offerInfo"]['ProductQuantity'])].map((key, i) => {
                                        return (
                                            <MenuItem value={i} key={i} primaryText={i} />
                                        )
                                    })}
                                </SelectField>
                                <br/>
                            </Col>
                        </Row>
                        <br/>
                    </div>
                )
            })}
            {
                foo(shoppingBasketOrderInfo) && _.keys(shoppingBasket).length !== 0?
                    <Row>
                        <font style={codeStyleSmallerBold}>Total: </font>
                        <font style={codeStyleSmaller}>$</font>
                    </Row> : <br/>
            }
            {
                foo(shoppingBasketOrderInfo) && _.keys(shoppingBasket).length !== 0? <Row>
                    <Button style={buttonStyle} onClick={() => sendMoreOrders(socket,shoppingBasketOrderInfo, router, shipmentPossibility, clearShoppingBasketOrderInfo, clearShoppingBasket)}>Buy</Button>
                </Row> : <br/>
        }
        </div>)
};

function mapStateToProps(state) {
    return {
        myAccountData: state.display.myAccountData,
        myAccountOffers: state.display.myAccountOffers,
        myAccountOrders: state.display.myAccountOrders,
        shoppingBasket: state.display.shoppingBasket,
        shipmentPossibility: state.display.shipmentPossibility,
        shoppingBasketOrderInfo: state.display.shoppingBasketOrderInfo
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addOfferTextFieldContentUpdate: addOfferTextFieldContent,
        UserLogged: UserLogged,
        updateAddOfferStatus : addOfferStatus,
        myAccountOffersLoad: myAccountOffers,
        myAccountOrdersLoad: myAccountOrders,
        clearMyAccountOffers: clearMyAccountOffers,
        clearMyAccountOrders: clearMyAccountOrders,
        shoppingBasketOrderInfoUpdate: shoppingBasketOrderInfo,
        clearShoppingBasketOrderInfo: clearShoppingBasketOrderInfo,
        clearShoppingBasket: clearShoppingBasket}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(ShoppingBasket));