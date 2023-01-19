/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2018.
 */
import React from 'react';
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from '../views/Login/Login.view';
// import Signup from '../views/Signup/Signup.view';
import ForgotPassword from '../views/ForgotPassword/ForgotPassword.view';
import ResetPassword from '../views/ForgotPassword/ResetPassword.view';
import { Route, Switch } from 'react-router-dom';
import ForgetPasswordHelp from '../views/ForgotPassword/ForgetPasswordHelp.view.js';
import ResetPassordFirst from '../views/ForgotPassword/ResetPassordFirst.view.js';

const indexRoutes = [{ path: "/", component: Dashboard }];

const RouteComponent =  () => (
    <Switch>
        <Route path={'/login'} component={Login} />
        {/*<Route path={'/signup'} component={Signup} />*/}
        <Route path={'/forgot/password'} component={ForgotPassword} />
        <Route path={'/forget/help'} component={ForgetPasswordHelp} />
        <Route path={'/reset/password'} component={ResetPassword} />
        <Route path={'/first'} component={ResetPassordFirst} />
        <Route path={'/'} component={Dashboard} />
    </Switch>
)
export default RouteComponent;
