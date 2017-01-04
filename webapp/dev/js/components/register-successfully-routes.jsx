import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import SimpleInfoPage from './simple-info-page'

const RegisterSuccessFullyRoutes = (
    <Route path="register-successful">
        <IndexRoute component={() => <SimpleInfoPage headerLabel="You have successfully registered!"
        label="Now you can go back to main page, sign in and use our website without any restrictions."
        buttonLabel="Back to main page" buttonRedirectPath="/" secondButton={false}/>}/>
    </Route>
);

export default RegisterSuccessFullyRoutes
