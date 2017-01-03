import React from "react";
import ApplicationBarDisplayer from './app-bar-displayer'

const ApplicationBar = ({children, alibaba}) => {
    console.log(alibaba);
    return (
            <ApplicationBarDisplayer >
                {children}
            </ApplicationBarDisplayer>
    )
};


export default ApplicationBar;