import React from "react";
import ApplicationBarDisplayer from './app-bar-displayer'

const ApplicationBar = ({children, socket}) => {
    return (
            <ApplicationBarDisplayer socket={socket}>
                {children}
            </ApplicationBarDisplayer>
    )
};


export default ApplicationBar;