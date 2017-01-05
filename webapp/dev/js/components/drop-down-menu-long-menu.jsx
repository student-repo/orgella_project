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


const componentToReturn = (type, shipmentPossibility, floatingLabel, ProductQuantity, orderSelectFieldsUpdate, orderSelectFields) => {
    if(type === "shipmentType"){
        return (
            <SelectField
                maxHeight={200}
                value={orderSelectFields[type]}
                floatingLabelText={floatingLabel}
                onChange={(event, key, payload) => updateOrderSelectFields(payload, orderSelectFields, orderSelectFieldsUpdate, type)}>
                {shipmentPossibility.map(key => {
                    return (
                        <MenuItem value={key.id} key={key.id} primaryText={key.type + " $" + key.cost} />
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

const DropDownMenuLongMenu = ({shipmentPossibility, floatingLabel, type, offerDisplayInfo, orderSelectFieldsUpdate, orderSelectFields}) => {
    return (
        componentToReturn(type, shipmentPossibility, floatingLabel, offerDisplayInfo.ProductQuantity, orderSelectFieldsUpdate, orderSelectFields)
        )
};

function mapStateToProps(state) {
    return {
        offerDisplayInfo: state.display.singleOfferDisplayInfo,
        shipmentPossibility: state.display.shipmentPossibility,
        orderSelectFields: state.display.orderSelectFields

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({orderSelectFieldsUpdate: orderSelectFields}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DropDownMenuLongMenu);