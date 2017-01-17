import React from "react";
import {Col, Row} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from "react-router";
import SingleOfferImage from './single-image'
import {addOfferTextFieldContent} from '../actions/add-offer-text-fields-content-action'
import HorizontalLinearStepper from "./horizontal-linear-stepper";
import TextField from 'material-ui/TextField';
import * as buttonStyle from '../../scss/simple-button-css.css'
import Button from 'react-bootstrap/lib/Button'
import {singleOfferCommentTextField} from '../actions/single-offer-comment-textbox-action'
import {singleOfferComments} from '../actions/single-offer-comments-action'
import cookie from 'react-cookie';

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

const sendComment = (socket, commentContent, OfferID, singleOfferCommentsUpdate, router) => {
    console.log("current nick: ");
    socket.emit('SEND_COMMENT',{UserNick: cookie.load("nick"), OfferID: OfferID, Content: commentContent});
    socket.on('SEND_COMMENT_RESPONSE', function(data){
        if(data.res === "SEND_COMMENT_SUCCESSFUL"){
            singleOfferCommentsUpdate(data.data);
        }
        else{
            router.push("/failure");
        }
    });
};


const updateTextFieldsState = (newValue, singleOfferCommentTextFieldUpdate) => {
    singleOfferCommentTextFieldUpdate(newValue);
};


const SingleOffer = ({socket, offerDisplayInfo, UserLogged, singleOfferComment, singleOfferCommentTextFieldUpdate, singleOfferCommentsUpdate, router, commentTextField}) => {
    return (
        <div>
            <Row>
                <font style={codeStyle}>Single Offer Displaying</font>
            </Row>
            <Row>
                <SingleOfferImage withDescription={false} image="no-image3.png"/>
                <Col md={2}>
                    </Col>
                <Col md={14}>
                    <font style={categoryStyle}>Product Name: </font>
                    <font style={infoStyle}>{offerDisplayInfo.ProductName}</font>
                    <br/>
                    <font style={categoryStyle}>Category: </font>
                    <font style={infoStyle}>{offerDisplayInfo.Category}</font>
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
            {
                UserLogged ? <div>
                    <Row>
                    <HorizontalLinearStepper socket={socket}/>
                        </Row>
                    <br/>
                    <br/>
                    <Row>
                        <font style={codeStyle}>Product Comments</font>
                    </Row>
                    <Row>
                        <Col md={16}>
                        <TextField
                            hintText="Write a comment"
                            fullWidth={true}
                            floatingLabelText="Write a comment"
                            onChange={(event, newValue) => updateTextFieldsState(newValue, singleOfferCommentTextFieldUpdate)}
                        />
                            </Col>
                        <Col md={8}>
                            <Button style={buttonStyle} onClick={() => sendComment(socket, commentTextField, offerDisplayInfo.OfferID, singleOfferCommentsUpdate, router)}>Send</Button>
                            </Col>
                    </Row>
                    <Row>
                    </Row>
                    {singleOfferComment.map(key => {
                        return (
                            <Row key={Math.random()}>
                                <font style={categoryStyle}>{key.Date + ", "}</font>
                                <font style={categoryStyle}>{key.Nick + ": "}</font>
                                <font style={infoStyle}>{key.Content}</font>
                                <br/>
                            </Row>
                        )
                    })}
                </div> : <br/>
            }

        </div>)
};

function mapStateToProps(state) {
    return {
        offerDisplayInfo: state.display.singleOfferDisplayInfo,
        UserLogged: state.display.UserLogged,
        singleOfferComment: state.display.singleOfferComment,
        commentTextField: state.display.singleOfferCommentTextField
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addOfferTextFieldContentUpdate: addOfferTextFieldContent,
        singleOfferCommentTextFieldUpdate: singleOfferCommentTextField,
        singleOfferCommentsUpdate: singleOfferComments}, dispatch);
}

export default withRouter (connect(mapStateToProps, matchDispatchToProps)(SingleOffer));



// <font style={categoryStyle}>{singleOfferComment.Nick}</font>
// <font style={infoStyle}>{singleOfferComment.Content}</font>
// <br/>