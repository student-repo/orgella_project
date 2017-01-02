import React from "react";
import ApplicationBarDisplayer from './app-bar-displayer'

const ApplicationBar = ({children}) => {
    return (
            <ApplicationBarDisplayer >
                {children}
            </ApplicationBarDisplayer>
    )
};


export default ApplicationBar;