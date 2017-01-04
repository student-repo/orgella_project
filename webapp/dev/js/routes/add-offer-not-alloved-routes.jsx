import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import SimpleInfoPage from '../components/simple-info-page'

const AddOfferNotAllowedRoutes = (
    <Route path="add-offer-not-allowed">
        <IndexRoute component={() => <SimpleInfoPage headerLabel="Adding Offer Is Impossible!"
                                                     label="To add a offer, first sign in or register."
                                                     buttonLabel="Sign In" buttonRedirectPath="/sign-in"
                                                     secondButton={true} secButtonLabel="Register" secButtonRedirectPath="/register"/>}/>
    </Route>
);

export default AddOfferNotAllowedRoutes
