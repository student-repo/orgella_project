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

const style = {
    'border': '1px solid #d9d9d9',
    'maxWidth': '100%',
    'cursor': 'pointer'
};


const cookieSignIn = (socket, usrlog,fff) => {
    if(_.isUndefined(cookie.load("nick")) || _.isUndefined(cookie.load('password'))){
        if(fff !== false){
            usrlog(false);
        }
    }
    else{
        socket.emit('CHECK_COOKIE_IDENTITY_DATA2', {nick: cookie.load("nick"),
            password: cookie.load("password")});
        socket.on('CHECK_COOKIE_IDENTITY_DATA_RESPONSE2', function(data){
            if(data.res === "SIGN_IN_SUCCESSFULLY"){
                if(fff !== true){
                    usrlog(true);
                }
            }
            else{
                if(fff !== false){
                    usrlog(false);
                }
            }
        });
    }
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

const singleOfferDiaplayUpdate = (singleOfferDisplayInfoUpdate, router, offerInfo, UserLogged, socket, UserLoggedUpdate) => {
    cookieSignIn(socket, UserLoggedUpdate, UserLogged);
    singleOfferDisplayInfoUpdate(offerInfo);
    router.push('/single-offer');
};
// image="no-image3.png"

const SingleOfferImage = ({socket, router, withDescription, singleOfferDisplayInfoUpdate, offerInfo, UserLogged, UserLoggedUpdate, image}) => (
    <Col md={8}>
            <img className="entryImage" onClick={withDescription ?
                () => singleOfferDiaplayUpdate(singleOfferDisplayInfoUpdate, router, offerInfo, UserLogged, socket, UserLoggedUpdate): () => console.log()}
                 src={image} alt="Unable to load image" style={style}/>
        {
            withDescription ? <div><a style={aTagStyle} onClick={() => singleOfferDiaplayUpdate(singleOfferDisplayInfoUpdate, router, offerInfo, UserLogged, socket, UserLoggedUpdate)}>
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
        UserLoggedUpdate: UserLogged}, dispatch);
}
export default withRouter (connect(mapStateToProps, matchDispatchToProps)(SingleOfferImage));

// export default SingleOfferImage;