import React from "react";
import ApplicationBarDisplayer from './app-bar-displayer'

const ApplicationBar = ({children, alibaba, socket}) => {
    console.log(alibaba);
    return (
            <ApplicationBarDisplayer socket={socket}>
                {children}
            </ApplicationBarDisplayer>
    )
};


export default ApplicationBar;