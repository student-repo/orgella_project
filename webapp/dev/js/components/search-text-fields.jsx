import React from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/main.css'

const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};


const style = {
    margin: 12,
};
// var style = {"marginRight": "20px" };
const colors = [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue',
        'Purple',
        'Black',
        'White',
];




const TextFieldExampleSimple = () => (
    <div>
            <AutoComplete
                floatingLabelText="Product name"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={colors}
                style={style}
            />
            <AutoComplete
                floatingLabelText="Category"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={colors}
                style={style}
            />
        <TextField
            floatingLabelText="Price from"
            style={style}
        />
        <TextField
            floatingLabelText="Price to"
            style={style}
        />
        <Button style={buttonStyle} onClick={() => console.log("it works")}>Search</Button>
    </div>
);

export default TextFieldExampleSimple;

// <Button bsStyle="success">Primary</Button>
