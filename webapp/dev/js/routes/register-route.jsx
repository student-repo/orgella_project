import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import Registration from '../components/registration'

const RegisterRoutes = (
    <Route path="register">
        <IndexRoute component={Registration}/>
    </Route>
);

export default RegisterRoutes
