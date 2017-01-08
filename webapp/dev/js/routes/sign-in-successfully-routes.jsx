import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import SimpleInfoPage from '../components/simple-info-page'

const SignInSuccessfullyRoutes = (
    <Route path="sign-in-successfully">
        <IndexRoute component={() => <SimpleInfoPage headerLabel="You have successfully logged!"
                                                     label="Now you can go back to main page, and use our website without any restrictions."
                                                     buttonLabel="Back to main page" buttonRedirectPath="/"
                                                    secondButton={false}/>}/>
    </Route>
);

export default SignInSuccessfullyRoutes
