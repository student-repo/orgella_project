import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import PageApp from './components/page-app'
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()} >
        <PageApp />
    </MuiThemeProvider>,
    document.getElementById('root')
);
