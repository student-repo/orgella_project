import React from 'react';
import {Step, Stepper,StepLabel}from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenuLongMenuExample from './drop-down-menu-long-menu'
import TextField from 'material-ui/TextField';
import {Row, Col} from "pui-react-grids";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'underscore';
import Checkbox from 'material-ui/Checkbox';
import * as Colors from 'material-ui/styles/colors';
import cookie from 'react-cookie';
import {withRouter} from "react-router";



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


const style = {
    margin: 12,
};

const checkCustomerInputWithDatabase = (socket, TotalPrice, Quantity, UnitPrice, OfferID, SellerID, ShipmentID, router) => {
    var aaaa = {
        TotalPrice: TotalPrice,
        UnitPrice: UnitPrice,
        ProductQuantity: Quantity,
        UserNick: cookie.load("nick"),
        OfferID: OfferID,
        SellerID: SellerID,
        ShipmentID: ShipmentID
    };
    socket.emit('ADD_ORDER',aaaa);
    socket.on('ADD_ORDER_RESPONSE', function(data){
        if(data.res === "ADD_ORDER_SUCCESSFUL"){
            console.log("add order  succesfull !!!");
            router.push('/order-successfully');
        }
        else{
            console.log("add order not succesfull !!!");
            // browserHistory.push('/add-offer');
        }
    });
};

class HorizontalLinearStepper extends React.Component {

    constructor(){
        super();
        this.state= {
            finished: false,
            stepIndex: 0,
            addressField: '',
            checkbox: true
        };
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }


    handleNext(){

        if(this.props.orderSelectFields.quantity !== '' &&  this.props.orderSelectFields.shipmentType !== '' &&
            (!(this.state.stepIndex === 1 && this.state.addressField === '') || this.state.checkbox === true)){
            const {stepIndex} = this.state;
            var address = this.state.addressField;
            var checkbox = this.state.checkbox;
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
                addressField: address,
                checkbox: checkbox
            });
        }
    };

    handlePrev(){
        const {stepIndex} = this.state;
        var address = this.state.addressField;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1,
                addressField: address});
        }
    };

    handleAddress(newValue){
        var a = this.state.finished;
        var b = this.state.stepIndex;

        this.setState({
            stepIndex: b,
            finished: a,
            addressField: newValue,
            checkbox: false
        });
    }

    handleCheckbox(checkbox){
        var a = this.state.finished;
        var b = this.state.stepIndex;

        this.setState({
            stepIndex: b,
            finished: a,
            addressField: '',
            checkbox: checkbox
        });
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <div>
                    <Row>
                        <DropDownMenuLongMenuExample floatingLabel="Product Quantity" type="quantity"/>
                        </Row>
                    <Row>
                        <DropDownMenuLongMenuExample floatingLabel="Shipment Type" type="shipmentType"/>
                    </Row>
                </div>;
            case 1:
                return <div>
                    <Row>
                        <TextField
                            floatingLabelText="Shipping Address"
                            hintText="Shipping Address Field"
                            onChange={(event, newValue) => this.handleAddress(newValue)}
                            style={style}
                        value={this.state.addressField}/>
                    </Row>
                    <Row>
                        <Checkbox
                            label="Use my account address"
                            onCheck={(event, isInputChecked) => this.handleCheckbox(isInputChecked)}
                            checked={this.state.checkbox}
                        />
                    </Row>
                </div>;
            case 2:
                return <div>
                    <Row>
                        <font style={categoryStyle}>Total Price: $</font>
                        <font style={infoStyle}>{this.props.orderSelectFields.quantity * parseInt(this.props.offerDisplayInfo.Price)
                        + this.props.shipmentPossibility[this.props.orderSelectFields.shipmentType].cost}</font>
                        <br/>
                    </Row>
                    <Row>
                        <font style={categoryStyle}>Quantity: </font>
                        <font style={infoStyle}>{this.props.orderSelectFields.quantity}</font>
                        <br/>
                    </Row>
                    <Row>
                        <font style={categoryStyle}>Address: </font>
                        {
                            this.state.checkbox ? <font style={infoStyle}>this account address</font> :
                                <font style={infoStyle}>{this.state.addressField}</font>
                        }
                        <br/>
                    </Row>
                    <Row>
                        <font style={categoryStyle}>Shipment: </font>
                        <font style={infoStyle}>{this.props.shipmentPossibility[this.props.orderSelectFields.shipmentType].type}</font>
                        <br/>
                    </Row>
                    <Row>
                        <font style={categoryStyle}>Shipment cost: $</font>
                        <font style={infoStyle}>{this.props.shipmentPossibility[this.props.orderSelectFields.shipmentType].cost}</font>
                        <br/>
                    </Row>
                </div>;

            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Product Quantity</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Shipping Information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Summary</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {finished ? (
                        <p>
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({stepIndex: 0, finished: false});
                                }}
                            >
                                Click here
                            </a> to reset the example.
                        </p>
                    ) : (
                        <div>
                            {this.getStepContent(stepIndex)}
                            <div style={{marginTop: 12}}>
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrev}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label={stepIndex === 2 ? 'Submit your order' : 'Next'}
                                    primary={true}
                                    onTouchTap={stepIndex === 2 ? () => checkCustomerInputWithDatabase(this.props.socket,
                                        this.props.orderSelectFields.quantity * parseInt(this.props.offerDisplayInfo.Price)
                                        + this.props.shipmentPossibility[this.props.orderSelectFields.shipmentType].cost,
                                        this.props.orderSelectFields.quantity, this.props.offerDisplayInfo.Price, this.props.offerDisplayInfo.OfferID,
                                        this.props.offerDisplayInfo.SellerID, this.props.orderSelectFields.shipmentType,
                                    this.props.router) : this.handleNext
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        offerDisplayInfo: state.display.singleOfferDisplayInfo,
        shipmentPossibility: state.display.shipmentPossibility,
        orderSelectFields: state.display.orderSelectFields

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(HorizontalLinearStepper));

// export default HorizontalLinearStepper;
