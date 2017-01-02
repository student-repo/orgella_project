import React from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RadioButton';
import {Row, Col} from "pui-react-grids";
import FontIcon from 'material-ui/FontIcon';
import * as Colors from 'material-ui/styles/colors';
import * as C from 'react-toolbox/lib/_colors.scss';


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



var style = {"marginRight": "20px" };
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
        />


    </div>
);

export default TextFieldExampleSimple;