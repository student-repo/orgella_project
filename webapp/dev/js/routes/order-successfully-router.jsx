import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import SimpleInfoPage from '../components/simple-info-page'

const orderSuccessfullyRouter = (
    <Route path="order-successfully">
        <IndexRoute component={() => <SimpleInfoPage headerLabel="Order Is Placed Successfully!"
                                                     label="Go to main page to continue."
                                                     buttonLabel="To Main Menu" buttonRedirectPath="/"
                                                     secondButton={false}/>}/>
    </Route>
);

export default orderSuccessfullyRouter