import React from "react";
import {Row, Col} from "pui-react-grids";
import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router'
import * as Colors from 'material-ui/styles/colors';
import {VeryNarrowLayout, CenteredDiv, JustifiedDiv} from "../utils/styling";
import RaisedButton from 'material-ui/RaisedButton';
import TextFieldExampleSimple from './search-text-fields'

const style = {
    width: '100%'
};

const codeStyle = {
    fontFamily: 'monospace',
    background: Colors.grey300,
    padding: '6px',
    borderRadius: '6px'
};

const Code = ({children}) => (<font style={codeStyle}>{children}</font>);

const ApplicationIndex = ({userLogged, handler}) => {
    return (
       <TextFieldExampleSimple />
    );
};

const UserLoggedButtons = () => (
    <div>
        <SingleLinkButton link="/configs" text="Configs" />
        <SingleLinkButton link="/jobs" text="Jobs" />
        <SingleLinkButton link="/snapshots" text="Snapshots" />
        <SingleLinkButton link="/compare" text="Diffs" />
        <SingleLinkButton link="/info" text="About me" />
    </div>
);


const SingleLinkButton = ({link, text}) => (
    <Col md={8} style={{marginTop: '12px', marginBottom: '12px', minWidth: '150px'}}>
        <Link to={link}>
            <RaisedButton label={text} primary={true} style={style} />
        </Link>
    </Col>
);

export default ApplicationIndex;


//
// <VeryNarrowLayout>
//     <CenteredDiv>
//         <h1 style={{fontSize: '136px'}}><b>Hi!</b></h1>
//         <h2 style={{fontSize: '36px'}}>My name is <b>Regreslav</b> and I am here to help you.</h2>
//     </CenteredDiv>
//
//     <JustifiedDiv>
//         <p style={{textAlign: 'justify'}}>
//             I specialize in <b>Regression Testing</b> and I can assist you with this task if you need it.
//             We all know how mundane and boring it can be to manually <b>crawl</b> through tens, hundreds
//             or possibly even thousands of pages and look for any changes between them.
//             Moreover, this process is extremely susceptible to human error -
//             some changes may be left unnoticed. <i>There must be a better way!</i>
//         </p>
//         <p style={{textAlign: 'justify'}}>
//             And now there is! All I need is a little configuration, nothing scary though!
//             A <Code>page url</Code> and <Code>resolutions</Code> I should use.
//             Oh, and a <Code>config name</Code>. You know them already! How cool is that?
//         </p>
//         <p style={{textAlign: 'justify'}}>
//             We need no further introduction, we need some action!
//             Have a look at my offerings and feel free to use them.
//         </p>
//     </JustifiedDiv>
// </VeryNarrowLayout>