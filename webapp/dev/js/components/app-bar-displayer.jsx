import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import LogIcon from 'material-ui/svg-icons/action/exit-to-app'
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import MenuItem from "material-ui/MenuItem";
import {Col} from "pui-react-grids";
import {HomeIcon, ConfigsIcon, JobsIcon, SnapshotsIcon, DiffsIcon} from "../utils/icons"
import Divider from 'material-ui/Divider';


class ApplicationBarDisplayer extends Component {

    render() {
        const {children} = this.props;
        return (
            <div>
                <AppBar
                    title={"Regreslav, brightening regression testing"}
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
                            />
                            <MenuItem
                                primaryText="Configs"
                                leftIcon={<ConfigsIcon />}
                            />
                            <MenuItem
                                primaryText="Jobs"
                                leftIcon={<JobsIcon />}
                            />
                            <MenuItem
                                primaryText="Snapshots"
                                leftIcon={<SnapshotsIcon />}
                            />
                            <MenuItem
                                primaryText="Diffs"
                                leftIcon={<DiffsIcon />}
                            />
                            <Divider />
                            <MenuItem
                                primaryText="Sign out"
                                leftIcon={<LogIcon />}
                            />
                        </IconMenu>
                    }
                />
                <Col md={1}/>
                <Col md={22} style={{maxWidth: '70vw', float: 'none', margin: '0 auto'}}>
                    {children}
                </Col>
                <Col md={1}/>
            </div>
        );
    }
}

export default ApplicationBarDisplayer;
