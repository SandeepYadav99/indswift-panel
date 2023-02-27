/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2018.
 */
import React from "react";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login.view";
// import Signup from '../views/Signup/Signup.view';
import ForgotPassword from "../views/ForgotPassword/ForgotPassword.view";
import ResetPassword from "../views/ForgotPassword/ResetPassword.view";
import { Route, Switch } from "react-router-dom";
import ForgetPasswordHelp from "../views/ForgotPassword/ForgetPasswordHelp.view.js";
import ResetPasswordFirst from "../views/ResetPassword/ResetPasswordFirst/ResetPassordFirst.view";
import EmployeeLogin from "../views/EmployeeApplicationForm/Login/CandidateLogin";
import EmployementHistory from "../views/EmployeeApplicationForm/EmploymentHistoryForm/EmployementHistory.view";
import EmployeeFormSubmit from "../views/EmployeeApplicationForm/EmployeeFormSubmit.js";
import EmployeePersonalForm from "../views/EmployeeApplicationForm/EmployeePersonalForm/EmployeePersonalForm";
import QualificationPage from "../views/EmployeeApplicationForm/QualificationForm/QualificationForm.js";
import RouteName from "./Route.name";
import EvaluationForm from "../views/EvaluationForm/EvaluationForm.view.js";
import NextPageForm from "../views/EvaluationForm/component/NextPageForm/NextPageForm.js";
import SubmitEvaluationForm from "../views/EvaluationForm/component/SubmitEvaluationForm/SubmitEvaluationForm.js";
import ProfileEditCreate from "../views/ProfileEditForm/ProfileEditCreate.js";

const indexRoutes = [{ path: "/", component: Dashboard }];

const RouteComponent = () => (
  <Switch>
    <Route path={"/login"} component={Login} />
    <Route path={RouteName.EAF_LOGIN} component={EmployeeLogin} />
    <Route path={RouteName.EAF_PERSONAL_DATA} component={EmployeePersonalForm} />
    <Route path={RouteName.EAF_QUALIFICATION_FORM} component={QualificationPage} />
    <Route path={RouteName.EAF_EMPLOYMENT_FORM} component={EmployementHistory} />
    <Route path={RouteName.EAF_SUCCESS} component={EmployeeFormSubmit} />
    <Route path={"/5"} component={EvaluationForm} />
    <Route path={"/6"} component={NextPageForm} />
    <Route path={"/7"} component={SubmitEvaluationForm} />



    {/*<Route path={'/signup'} component={Signup} />*/}
    <Route path={"/forgot/password"} component={ForgotPassword} />
    <Route path={"/forget/help"} component={ForgetPasswordHelp} />
      <Route path={RouteName.RESET_PASSWORD_FIRST} component={ResetPasswordFirst} />
    <Route path={"/reset/password"} component={ResetPassword} />
    <Route path={"/"} component={Dashboard} />
  </Switch>
);
export default RouteComponent;
