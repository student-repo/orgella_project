import React from "react";
import {Col} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import {singleOfferDisplayInfo} from '../actions/single-offer-display-info-action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router";
import {UserLogged} from '../actions/user-logged-action';
import _ from 'underscore';
import cookie from 'react-cookie';
import {clearOrderState} from '../actions/clear-order-action'
import {singleOfferShipmentPossibilities} from '../actions/single-offer-shipment-possibilities'
import {singleOfferComments} from '../actions/single-offer-comments-action'
import {clearSingleOfferCommentTextField} from '../actions/clear-single-offer-comment-text-field'

const style = {
    'border': '1px solid #d9d9d9',
    'maxWidth': '100%',
    'cursor': 'pointer'
};

const getSingleOfferShipmentPossibilities = (socket, singleOfferShipmentPossibilities, data) => {
        socket.emit('GET_SINGLE_OFFER_SHIPMENT_POSSIBILITIES',data);
    socket.on('GET_SINGLE_OFFER_SHIPMENT_POSSIBILITIES_RESPONSE', function(data){
        if(data.res === "GET_SINGLE_OFFER_SHIPMENT_POSSIBILITIES_SUCCESSFUL"){
            singleOfferShipmentPossibilities(data.data);
        }
        else{
            console.log("get shipment possibilities not succesfull !!!");
        }
    });
};

const getSingleOfferComments = (socket, singleOfferComments, data) => {
    socket.emit('GET_SINGLE_OFFER_COMMENTS',data);
    socket.on('GET_SINGLE_OFFER_COMMENTS_RESPONSE', function(data){
        if(data.res === "GET_SINGLE_OFFER_COMMENTS_SUCCESSFUL"){
            singleOfferComments(data.data);
        }
        else{
            console.log("get shipment possibilities not succesfull !!!");
        }
    });
};

const priceStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '20px'
};

const descriptionStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '20px'
};

const aTagStyle = {
    cursor: "pointer"
};

    const singleOfferDiaplayUpdate = (singleOfferDisplayInfoUpdate, router, offerInfo, UserLogged, socket, UserLoggedUpdate,
                                      singleOfferShipmentPossibilities, clearOrderState, singleOfferComments, clearSingleOfferCommentTextField) => {
    getSingleOfferShipmentPossibilities(socket, singleOfferShipmentPossibilities, offerInfo.OfferID);
        getSingleOfferComments(socket, singleOfferComments, offerInfo.OfferID);
    singleOfferDisplayInfoUpdate(offerInfo);
    clearOrderState();
        clearSingleOfferCommentTextField();

    router.push('/single-offer');
};
// image="no-image3.png"

const SingleOfferImage = ({socket, router, withDescription, singleOfferDisplayInfoUpdate, offerInfo, UserLogged,
    UserLoggedUpdate, image, singleOfferShipmentPossibilities, clearOrderState, singleOfferComments, clearSingleOfferCommentTextField}) => (
    <Col md={8}>
            <img className="entryImage" onClick={withDescription ?
                () => singleOfferDiaplayUpdate(singleOfferDisplayInfoUpdate, router, offerInfo, UserLogged, socket, UserLoggedUpdate,
                    singleOfferShipmentPossibilities, clearOrderState, singleOfferComments, clearSingleOfferCommentTextField): () => console.log()}
                 src={image} alt="Unable to load image" style={style}/>
        {
            withDescription ? <div><a style={aTagStyle}
                                      onClick={() => singleOfferDiaplayUpdate(singleOfferDisplayInfoUpdate, router, offerInfo, UserLogged,
                                          socket, UserLoggedUpdate, singleOfferShipmentPossibilities, clearOrderState, singleOfferComments, clearSingleOfferCommentTextField)}>
                <font style={priceStyle}>{'$' + offerInfo.Price}</font>
                <font style={descriptionStyle}>{offerInfo.ProductName}</font></a></div> : <br/>
        }
        <br/>
        <br/>

    </Col>
);


function mapStateToProps(state) {
    return {
        TextFieldsContent: state.display.SearchTextFieldsContent,
        currentSearch: state.display.currentSearch,
        UserLogged: state.display.UserLogged
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({singleOfferDisplayInfoUpdate: singleOfferDisplayInfo,
        UserLoggedUpdate: UserLogged, singleOfferShipmentPossibilities: singleOfferShipmentPossibilities,
        clearOrderState: clearOrderState,
        singleOfferComments: singleOfferComments,
        clearSingleOfferCommentTextField: clearSingleOfferCommentTextField}, dispatch);
}
export default withRouter (connect(mapStateToProps, matchDispatchToProps)(SingleOfferImage));