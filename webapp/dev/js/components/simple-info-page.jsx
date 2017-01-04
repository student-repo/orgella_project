import React from "react";
import {Row} from "pui-react-grids";
import * as Colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/bigger-button-css.css'
import {browserHistory, Link} from 'react-router'


const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '40px'
};

const codeStyleSmaller = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '15px'
};

// const foo = (aaa) => {
//     browserHistory.push(aaa);
//     browserHistory.push(aaa);
// };

const SimpleInfoPage = ({headerLabel, label, buttonLabel, buttonRedirectPath, secondButton, secButtonLabel, secButtonRedirectPath}) => (
    <div>
    <Row>
        <font style={codeStyle}>{headerLabel}</font>
    </Row>
        <Row>
            <br/>
            <font style={codeStyleSmaller}>{label}</font>
        </Row>
    <Row>
    <br/>
        <Link to={buttonRedirectPath}>
        <Button style={buttonStyle}>{buttonLabel}</Button>
            </Link>
        {
            secButtonLabel ? <Link to={secButtonRedirectPath}>
                <Button style={buttonStyle}>{secButtonLabel}</Button>
            </Link> : <br/>
        }
    </Row>
    </div>
);

export default SimpleInfoPage
//
// <Button style={buttonStyle} onClick={() => browserHistory.push({buttonRedirectPath})}>{buttonLabel}</Button>
//
// <Button style={buttonStyle} onClick={() => foo(buttonRedirectPath)}>{buttonLabel}</Button>