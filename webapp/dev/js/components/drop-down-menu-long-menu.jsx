import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {orderSelectFields} from '../actions/order_select_fields_action'
import _ from 'underscore';

const updateOrderSelectFields= (value, TextFieldContent, orderSelectFieldsUpdate, art) => {
    var newTextFieldsContent = _.clone(TextFieldContent);
    newTextFieldsContent[art] = value;
    orderSelectFieldsUpdate(newTextFieldsContent);
};


// {_.keys(shipmentPossibility).map(key => {
//     return (
//         <MenuItem value={key} key={key} primaryText={shipmentPossibility[key].type + " $" + shipmentPossibility[key].cost} />
//     )
// })}

// {offerShipmentPossibilities.map(key => {
//     return (
//         <MenuItem value={key} key={key} primaryText={shipmentPossibility[key.shipmentType].type + " $" + shipmentPossibility[key.shipmentType].cost} />
//     )

// onChange={(event, key, payload) => updateOrderSelectFields(payload, orderSelectFields, orderSelectFieldsUpdate, type)}>
const componentToReturn = (type, shipmentPossibility, floatingLabel, ProductQuantity, orderSelectFieldsUpdate, orderSelectFields, offerShipmentPossibilities) => {
    if(type === "shipmentType"){
        return (
            <SelectField
                maxHeight={200}
                value={orderSelectFields[type]}
                floatingLabelText={floatingLabel}
                onChange={(event, key, payload) => updateOrderSelectFields(payload, orderSelectFields, orderSelectFieldsUpdate, type)}>
                {offerShipmentPossibilities.map(key => {
                    console.log("key - shipment - type");
                    console.log(key.ShipmentType);
                    return (
                        <MenuItem value={key.ShipmentType} key={key.ShipmentType} primaryText={shipmentPossibility[key.ShipmentType].ShipmentName + " $" + shipmentPossibility[key.ShipmentType].Price} />
                    )
                })}
            </SelectField>
        )
    }
    else {
        return (
            <SelectField
                maxHeight={200}
                value={orderSelectFields[type]}
                floatingLabelText={floatingLabel}
                onChange={(event, key, payload) => updateOrderSelectFields(payload, orderSelectFields, orderSelectFieldsUpdate, type)}>
                {
                    [,...Array(ProductQuantity)].map((key, i) => {
                        return (
                            <MenuItem value={i} key={i} primaryText={i} />
                        )
                    })
                }
            </SelectField>


        )
    }
};

const DropDownMenuLongMenu = ({shipmentPossibility, floatingLabel, type, offerDisplayInfo, orderSelectFieldsUpdate, orderSelectFields, offerShipmentPossibilities}) => {
    return (
        componentToReturn(type, shipmentPossibility, floatingLabel, offerDisplayInfo.ProductQuantity, orderSelectFieldsUpdate, orderSelectFields, offerShipmentPossibilities)
        )
};

function mapStateToProps(state) {
    return {
        offerDisplayInfo: state.display.singleOfferDisplayInfo,
        shipmentPossibility: state.display.shipmentPossibility,
        orderSelectFields: state.display.orderSelectFields,
        offerShipmentPossibilities: state.display.singleOfferShipmentPossibilities

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({orderSelectFieldsUpdate: orderSelectFields}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DropDownMenuLongMenu);