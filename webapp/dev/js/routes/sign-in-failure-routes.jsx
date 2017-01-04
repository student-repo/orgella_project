import React from "react";
import {Route, IndexRoute, Link} from "react-router";
import SimpleInfoPage from '../components/simple-info-page'

const SignInFailuteRoutes = (
    <Route path="sign-in-failure">
        <IndexRoute component={() => <SimpleInfoPage headerLabel="Something goes wrong!"
                                                     label="Try sign in again or register to Orgella."
                                                     buttonLabel="Try again" buttonRedirectPath="/sign-in"
        secondButton={true} secButtonLabel="Register" secButtonRedirectPath="/register"/>}/>
    </Route>
);

export default SignInFailuteRoutes
