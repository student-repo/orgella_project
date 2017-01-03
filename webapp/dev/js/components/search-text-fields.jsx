import React from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/simple-button-css.css'


const style = {
    margin: 12,
};
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
                floatingLabelText="Product Name"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={colors}
                style={style}
                hintText="Product Name Filed"
            />
            <AutoComplete
                floatingLabelText="Category"
                hintText="Category Field"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={colors}
                style={style}
            />
        <TextField
            floatingLabelText="Price From"
            hintText="Price From Filed"
            style={style}
        />
        <TextField
            floatingLabelText="Price to"
            hintText="Price To Filed"
            style={style}
        />
        <Button style={buttonStyle} onClick={() => console.log("it works")}>Search</Button>
    </div>
);

export default TextFieldExampleSimple;

// <Button bsStyle="success">Primary</Button>
