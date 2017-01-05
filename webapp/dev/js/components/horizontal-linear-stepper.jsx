import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenuLongMenuExample from './drop-down-menu-long-menu'
import TextField from 'material-ui/TextField';
import {Row, Col} from "pui-react-grids";



const style = {
    margin: 12,
};

class HorizontalLinearStepper extends React.Component {

    constructor(){
        super();
        this.state= {
            finished: false,
            stepIndex: 0,
        };
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
    }


    handleNext(){
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev(){
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

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
                    floatingLabelText="Name"
                    hintText="Name Field"
                    style={style}/>
                        </Row>
                    <Row>
                        <TextField
                            floatingLabelText="Last Name"
                            hintText="Last NameFiled"
                            style={style}/>
                    </Row>
                    <Row>
                        <TextField
                            floatingLabelText="Shipping Address"
                            hintText="Shipping Address Field"
                            style={style}/>
                    </Row>
                </div>;
            case 2:
                return 'This is the bit I really care about!';
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
                                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                                    primary={true}
                                    onTouchTap={this.handleNext}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default HorizontalLinearStepper;
