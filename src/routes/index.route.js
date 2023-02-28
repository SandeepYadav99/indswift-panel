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
import SubmitEvaluationForm from "../views/CandidateFeedbackForm/component/SubmitEvaluationForm/SubmitEvaluationForm.js";
import CustomRouter from "../libs/CustomRouter.utils";
import CandidateFeedbackForm from "../views/CandidateFeedbackForm/CandidateFeedbackForm.view";

const indexRoutes = [{ path: "/", component: Dashboard }];

const RouteComponent = () => (
  <Switch>
    <Route path={"/login"} component={Login} />
    <Route path={RouteName.EAF_LOGIN} component={EmployeeLogin} />
    <Route path={RouteName.EAF_PERSONAL_DATA} component={EmployeePersonalForm} />
    <Route path={RouteName.EAF_QUALIFICATION_FORM} component={QualificationPage} />
    <Route path={RouteName.EAF_EMPLOYMENT_FORM} component={EmployementHistory} />
    <Route path={RouteName.EAF_SUCCESS} component={EmployeeFormSubmit} />
      <Route path={RouteName.CANDIDATE_FEEDBACK_SUCCESS} protect={true} component={SubmitEvaluationForm} />
    <CustomRouter path={`${RouteName.CANDIDATE_FEEDBACK}:id`} private={true} component={CandidateFeedbackForm} />




    {/*<Route path={'/signup'} component={Signup} />*/}
    <Route path={"/forgot/password"} component={ForgotPassword} />
    <Route path={"/forget/help"} component={ForgetPasswordHelp} />
      <Route path={RouteName.RESET_PASSWORD_FIRST} component={ResetPasswordFirst} />
    <Route path={"/reset/password"} component={ResetPassword} />
    <Route path={"/"} component={Dashboard} />
  </Switch>
);
export default RouteComponent;
