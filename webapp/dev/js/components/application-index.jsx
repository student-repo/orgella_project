import React from "react";
import {Row, Col} from "pui-react-grids";
import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router'
import * as Colors from 'material-ui/styles/colors';
import {VeryNarrowLayout, CenteredDiv, JustifiedDiv} from "../utils/styling";
import RaisedButton from 'material-ui/RaisedButton';
import TextFieldExampleSimple from './search-text-fields'
import CategoryExample from './category-example';


const ApplicationIndex = ({userLogged, handler}) => {
    return (
        <div>
       <TextFieldExampleSimple />
    <CategoryExample category="Category I"/>
            </div>
    );
};

export default ApplicationIndex;
