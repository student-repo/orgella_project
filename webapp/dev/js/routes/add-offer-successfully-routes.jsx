import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import SimpleInfoPage from '../components/simple-info-page'

const AddOfferSuccessfullyRoutes = (
    <Route path="add-offer-successfully">
        <IndexRoute component={() => <SimpleInfoPage headerLabel="Offer Added SuccessFully!"
                                                     label="Display this offer or continue using our website."
                                                     buttonLabel="Display Offer" buttonRedirectPath="/"
                                                     secondButton={true} secButtonLabel="Back To Menu" secButtonRedirectPath="/"/>}/>
    </Route>
);

export default AddOfferSuccessfullyRoutes
