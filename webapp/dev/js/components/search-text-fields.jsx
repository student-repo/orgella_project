import React from 'react';
import TextField from 'material-ui/TextField';

var style = {"marginRight": "20px" };
const TextFieldExampleSimple = () => (
    <div>
        <TextField
            floatingLabelText="Product name"
            style={style}
        />
        <TextField
            floatingLabelText="Category"
            style={style}
        />
        <TextField
            floatingLabelText="Price from"
            style={style}
        />
        <TextField
            floatingLabelText="Price to"
        />
    </div>
);

export default TextFieldExampleSimple;