import React from "react";
import SearchTextFields from './search-text-fields'


const ApplicationIndex = ({socket}) => {
    return (
       <SearchTextFields socket={socket}/>
    );
};
export default ApplicationIndex;

// <CategoryExample category="Category I"/>
