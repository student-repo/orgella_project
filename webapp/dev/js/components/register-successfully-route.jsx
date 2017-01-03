import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import RegistrationSuccessfully from '../components/registration-successfully'

const RegisterSuccessFullyRoutes = (
    <Route path="register-successful">
        <IndexRoute component={RegistrationSuccessfully}/>
    </Route>
);

export default RegisterSuccessFullyRoutes
