import React from "react";
import {Col} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import {singleOfferDisplayInfo} from '../actions/single-offer-display-info-action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router";

const style = {
    'border': '1px solid #d9d9d9',
    'maxWidth': '100%',
    'cursor': 'pointer'
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

const singleOfferDiaplayUpdate = (singleOfferDisplayInfoUpdate, router, offerInfo) => {
    singleOfferDisplayInfoUpdate(offerInfo);
    router.push('/single-offer');
};

const SingleOfferImage = ({router, withDescription, singleOfferDisplayInfoUpdate, offerInfo}) => (
    <Col md={8}>
            <img className="entryImage" onClick={() => singleOfferDiaplayUpdate(singleOfferDisplayInfoUpdate, router, offerInfo)} src="no-image3.png" alt="Unable to load image" style={style}/>
        {
            withDescription ? <div><a style={aTagStyle} onClick={() => singleOfferDiaplayUpdate(singleOfferDisplayInfoUpdate, router, offerInfo)}><font style={priceStyle}>{'$' + offerInfo.Price}</font>
                <font style={descriptionStyle}>{offerInfo.ProductName}</font></a></div> : <br/>
        }
        <br/>
        <br/>

    </Col>
);


function mapStateToProps(state) {
    return {
        TextFieldsContent: state.display.SearchTextFieldsContent,
        currentSearch: state.display.currentSearch
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({singleOfferDisplayInfoUpdate: singleOfferDisplayInfo}, dispatch);
}
export default withRouter (connect(mapStateToProps, matchDispatchToProps)(SingleOfferImage));

// export default SingleOfferImage;