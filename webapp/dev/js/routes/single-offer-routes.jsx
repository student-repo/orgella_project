import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import SingleOffer from '../components/single-offer'

const SinglePageRoutes = (
    <Route path="single-offer">
        <IndexRoute component={() => <SingleOffer />}/>
    </Route>
);

export default SinglePageRoutes