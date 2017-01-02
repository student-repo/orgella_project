import React from "react";
import {Row, Col} from "pui-react-grids";
import chroma from 'chroma-js';

const colourScale = chroma.scale(['green', 'orange', 'red']);

const colourPicker = (diff) => {
    // 0% - 10% : green through orange to red
    // > 10%    : red
    return colourScale(Number(diff * 10));
};

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex
}).join('');

const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
        .join('');


const CenteredTextDiv = (props) => (
    <div style={{textAlign: 'center'}}>
        {props.children}
    </div>
);

const CenteredLayout = ({width, children}) => {
    let middleWidth = Math.min(width, 24);
    const sideWidths = Math.floor((24 - middleWidth) / 2);
    middleWidth = middleWidth + Math.ceil(((24 - middleWidth) / 2) % 1);

    return (
        <Row>
            <Col md={sideWidths}/>
            <Col md={middleWidth}>
                {children}
            </Col>
            <Col md={sideWidths}/>
        </Row>
    )
};

// const EqualizedLayout = ({count, ...props}) => (
//     console.log("TO IMPLEMENT")
// );

const NarrowLayout = (props) => (
    <CenteredLayout width="16" {...props} />
);

const VeryNarrowLayout = (props) => (
    <CenteredLayout width="12" {...props} />
);

const CenteredDiv = ({children}) => (
    <div style={{textAlign: 'center'}}>
        {children}
    </div>
);

const JustifiedDiv = ({children}) => (
    <div style={{textAlign: 'justify'}}>
        {children}
    </div>
);
export {colourPicker, CenteredTextDiv, NarrowLayout, VeryNarrowLayout, CenteredDiv, JustifiedDiv}

