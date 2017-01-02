import React from "react";
import {Col} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';

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

const SingleOfferImage = ({price, description}) => (
    <Col md={8}>
            <img className="entryImage" src="no-image3.png" alt="Unable to load image" style={style}/>
            <a style={aTagStyle}><font style={priceStyle}>{'$' + price}</font>
            <font style={descriptionStyle}>{description}</font></a>
    </Col>
);

export default SingleOfferImage;