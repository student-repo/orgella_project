import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import SimpleInfoPage from '../components/simple-info-page'

const FailureRoutes = (
    <Route path="failure">
        <IndexRoute component={() => <SimpleInfoPage headerLabel="Something goes wrong!"
                                                     buttonLabel="Go back to menu" buttonRedirectPath="/"/>}/>
    </Route>
);

export default FailureRoutes
