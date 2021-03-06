import React from "react";
import {Col} from "pui-react-grids";
import SingleOfferImage from "./single-image";
import * as Colors from 'material-ui/styles/colors';


const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '30px'
};


export const CategoryExample = ({category}) => {
    return (
        <Col>
            <div>
                <br/>
                <br/>
                <font style={codeStyle}>{category}</font>
                <br/>
            </div>

            <SingleOfferImage price="100" description="some description some description some description some description" withDescription={true} image="no-image3.png"/>
            <SingleOfferImage price="120" description="some description some description some description some description" withDescription={true} image="no-image3.png"/>
            <SingleOfferImage price="140" description="some description some description some description some description" withDescription={true} image="no-image3.png"/>

        </Col>
    )
};

export default CategoryExample;
