import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import LogIcon from 'material-ui/svg-icons/action/exit-to-app'
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import MenuItem from "material-ui/MenuItem";
import {Link, withRouter} from "react-router";
import {Col, Row} from "pui-react-grids";
import {HomeIcon, RegisterIcon, AddOfferIcon, MyAccountIcon} from "../utils/icons"
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as Colors from 'material-ui/styles/colors';
import Button from 'react-bootstrap/lib/Button'
import * as buttonStyle from '../../scss/simple-button-css.css'

const codeStyle = {
    fontFamily: 'Courier New',
    color: Colors.grey600,
    padding: '6px',
    borderRadius: '6px',
    // fontWeight: 'bold',
    fontSize: '40px'
};

class ApplicationBarDisplayer extends Component {

    constructor(){
        super();
        this.state = {open: false}
    }

    handleOpen(){
        this.setState({open: true});
    };

    handleClose(){
        this.setState({open: false});
    };

    render() {
        // const actions = [
        //     <FlatButton
        //         label="Ok"
        //         primary={true}
        //         keyboardFocused={true}
        //         onTouchTap={this.handleClose.bind(this)}
        //     />,
        // ];
        const actions = [
            <Button style={buttonStyle} onClick={this.handleClose.bind(this)}>Sign in</Button>
        ];

        const {content, router, children} = this.props;
        return (
            <div>
                <AppBar
                    title={<Link to="/" style={{color: 'white', textDecoration: 'none'}}>Orgella</Link>}
                    style={{marginBottom: '16px'}}
                    iconElementLeft={
                        <IconMenu
                            iconButtonElement={
                                <IconButton iconStyle={{color: 'white'}}>
                                    <NavigationMenu />
                                </IconButton>
                            }
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem
                                primaryText="Home"
                                leftIcon={<HomeIcon />}
                                onTouchTap={() => router.push('/')}

                            />
                            <MenuItem
                                primaryText="My account"
                                leftIcon={<MyAccountIcon />}
                            />
                            <MenuItem
                                primaryText="Add offer"
                                leftIcon={<AddOfferIcon />}
                            />
                            <MenuItem
                                primaryText="Register"
                                leftIcon={<RegisterIcon />}
                                onTouchTap={() => router.push('/register')}
                            />
                            <Divider />
                            <MenuItem
                                primaryText="Sign in"
                                leftIcon={<LogIcon />}
                                onTouchTap={this.handleOpen.bind(this)}
                            />
                        </IconMenu>
                    }
                />

                <Dialog
                    title="Sign in to Orgella"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                >
                    <Row>
                    <TextField
                        floatingLabelText="Orgella nick"
                        hintText="Orgella Nick Field"
                    />
                        </Row>
                    <Row>
                    <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                    />
                        </Row>
                </Dialog>


                <Col md={1}/>
                <Col md={22} style={{maxWidth: '70vw', float: 'none', margin: '0 auto'}}>
                    {children}
                </Col>
                <Col md={1}/>

            </div>
        );
    }
}

export default withRouter(ApplicationBarDisplayer);

