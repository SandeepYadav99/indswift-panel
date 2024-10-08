/**
 * Created by charnjeetelectrovese@gmail.com on 12/5/2018.
 */
import React from "react";
import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login.view";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword.view";
import ResetPassword from "../views/ForgotPassword/ResetPassword.view";
import {Route, Switch} from "react-router-dom";
import ForgetPasswordHelp from "../views/ForgotPassword/ForgetPasswordHelp.view.js";
import ResetPasswordFirst from "../views/ResetPassword/ResetPasswordFirst/ResetPassordFirst.view";
import EmployeeLogin from "../views/EmployeeApplicationForm/Login/CandidateLogin";
import EmployementHistory from "../views/EmployeeApplicationForm/EmploymentHistoryForm/EmployementHistory.view";
import EmployeeFormSubmit from "../views/EmployeeApplicationForm/EmployeeFormSubmit.js";
import EmployeePersonalForm from "../views/EmployeeApplicationForm/EmployeePersonalForm/EmployeePersonalForm";
import QualificationPage from "../views/EmployeeApplicationForm/QualificationForm/QualificationForm.js";
import RouteName from "./Route.name";
import SubmitEvaluationForm
    from "../views/CandidateFeedbackForm/component/SubmitEvaluationForm/SubmitEvaluationForm.js";
import CustomRouter from "../libs/CustomRouter.utils";
import CandidateFeedbackForm from "../views/CandidateFeedbackForm/CandidateFeedbackForm.view";
import CandidateFeedbackFormDetail from "../views/CandidateFeedbackFormView/CandidateFeedbackFormView.js";
import OfferConfirmation from "../views/Candidates/OfferConfirmation/OfferConfirmation.view.js";
import ShareSuccess from "../views/Candidates/CandidateDetails/components/ShareSuccess/ShareSuccess.js";
import CandidateOfferLogin from "../views/Candidates/OfferConfirmation/components/OfferLogin/CandidateOfferLogin.js";
import SubmittedResponse from "../views/Candidates/OfferConfirmation/components/SubmittedResponse/SubmittedResponse.js";
import CustomDataGrid from "../views/Pms/PmsForm/PmsForm.view.js";
import PmsFormDetail from "../views/Pms/PmsFormDetail/PmsFormDetail.view.js";
import Pms4BFormView from "../views/Pms/PMS4BForm/Pms4BForm.view";
import Pms4BFormDetailView from "../views/Pms/Pms4BFormDetail/Pms4BFormDetail.view";
import IrfForm from "../views/IRFForm/IrfForm.view.js";
import CandidateIrfLogin from "../views/IRFLogin/CandidateIrfLogin.js";
import PmsHodForm from "../views/Pms/PMSHodForm/PmsHodForm.view";
import PMSSiteForm from "../views/Pms/PMSSiteForm/PMSSiteForm.view.js";
import PmsSiteFormDetailView from "../views/Pms/PmsSiteFormDetail/PmsSiteFormDetail.view";
import PmsGraph from "../views/Pms/PmsGraph/PmsGraph.view.js";
import PmsOverallHodForm from "../views/Pms/OverallHOD/PMSOverallHodForm/PmsOverallHodForm.view";
import AwardSheetView from "../views/PmsIncrements/AwardSheet/AwardSheet.view";
import GuarantorLogin from "../views/LoanManagement/GuarantorLogin/GuarantorLogin.js";
import LoanConfirmation from "../views/LoanManagement/LoanConfirmation/LoanConfirmation.view.js";
import LoanSubmittedResponse from "../views/LoanManagement/LoanConfirmation/component/LoanSubmittedResponse/LoanSubmittedResponse.js";
import ExitForm from "../views/ExitInterview/ExitForm/ExitForm.view.js";
import ExitLogin from "../views/ExitInterview/ExitLogin/ExitLogin.js";
import ExitDetail from "../views/ExitInterview/ExitDetail/ExitDetail.view.js";
import ExitResponse from "../views/ExitInterview/ExitResponse/ExitResponse.js";
import SuccessionApplicationForm from "../views/SuccessionApplicationForm/SuccessionApplicationForm.js";
import HREscalationMatrixView from "../views/HREscalationMatrixView/HREscalationMatrixView.js";
import SuccessionForm from "../views/SuccessionApplicationForm/SuccessionDetail/SuccessionDetail.view.js";
import ExitResponseSub from "../views/SuccessionApplicationForm/ExitResponse/ExitResponse.js";

const indexRoutes = [{path: "/", component: Dashboard}];

const RouteComponent = () => (
    <Switch>
        <Route path={"/login"} component={Login}/>
        <Route path={RouteName.EAF_LOGIN} component={EmployeeLogin}/>
        <Route path={RouteName.EAF_PERSONAL_DATA} component={EmployeePersonalForm}/>
        <Route path={RouteName.EAF_QUALIFICATION_FORM} component={QualificationPage}/>
        <Route path={RouteName.EAF_EMPLOYMENT_FORM} component={EmployementHistory}/>
        <Route path={RouteName.EAF_SUCCESS} component={EmployeeFormSubmit}/>
        <Route path={RouteName.CANDIDATE_FEEDBACK_SUCCESS} protect={true} component={SubmitEvaluationForm}/>
        <CustomRouter path={`${RouteName.CANDIDATE_FEEDBACK}:id`} private={true} component={CandidateFeedbackForm}/>
        <CustomRouter path={`${RouteName.CANDIDATE_FEEDBACK_VIEW}:id`} private={true}
                      component={CandidateFeedbackFormDetail}/>
        <Route path={RouteName.OFFER_LOGIN} component={CandidateOfferLogin}/>
        <Route path={RouteName.OFFER_LETTER} component={OfferConfirmation}/>
        <Route path={RouteName.CANDIDATES_SUCCESS} component={ShareSuccess}/>
        <Route path={RouteName.OFFER_SUCCESS} component={SubmittedResponse}/>
        <Route path={RouteName.GUARANTOR_LOGIN} component={GuarantorLogin}/>
        <Route path={RouteName.GUARANTOR_LETTER} component={LoanConfirmation}/>
        <Route path={RouteName.GUARANTOR_SUCCESS} component={LoanSubmittedResponse}/>
        <Route path={`${RouteName.PMS_REVIEW_FORM}:id`} component={CustomDataGrid}/>
        <Route path={`${RouteName.PMS_FORM_DETAIL}:id`} component={PmsFormDetail}/>
        <Route path={`${RouteName.PMS_4B_FORM}`} component={Pms4BFormView}/>
        <Route path={`${RouteName.PMS_HOD_FORM}:id`} component={PmsHodForm}/>
        <Route path={`${RouteName.PMS_OVERALL_HOD_FORM}:id`} component={PmsOverallHodForm}/>
        <Route path={`${RouteName.PMS_SITE_PLANNER_FORM}:id`} component={PMSSiteForm}/>
        <Route path={`${RouteName.PMS_SITE_SUBMISSION_DETAIL}:id`} component={PmsSiteFormDetailView}/>
        <Route path={`${RouteName.PMS_4B_REVIEW_DETAIL}:id`} component={Pms4BFormDetailView}/>
        <Route path={RouteName.IRF_LOGIN} component={CandidateIrfLogin}/>
        <Route path={RouteName.IRF_FORM} component={IrfForm}/>
        <Route path={RouteName.PERFORMANCE_GRAPH} component={PmsGraph}/>
        <Route path={RouteName.EXIT_LOGIN} component={ExitLogin}/>
        <Route path={RouteName.SUCCESSION_FORM} component={SuccessionApplicationForm}/>
        <Route path={RouteName.EXIT_INTERVIEW_FORM} component={ExitForm}/>
        <Route path={RouteName.SUCCESSION_FORM_INNER} component={SuccessionForm}/>
        <Route path={RouteName.EXIT_SUCCESS} component={ExitResponse}/>
        <Route path={RouteName.SUCCESSION_SUCCESS} component={ExitResponseSub}/>
        <Route path={`${RouteName.EXIT_DETAIL}:id`} component={ExitDetail}/>
        <Route path={RouteName.HRESCALATIONMATRIX} component={HREscalationMatrixView}/>

        {/*<Route path={'/signup'} component={Signup} />*/}
        <Route path={"/forgot/password"} component={ForgotPassword}/>
        <Route path={"/forget/help"} component={ForgetPasswordHelp}/>
        <Route path={RouteName.RESET_PASSWORD_FIRST} component={ResetPasswordFirst}/>
        <Route path={"/reset/password"} component={ResetPassword}/>
        <Route path={"/award/sheet/:id"} component={AwardSheetView}/>
        <Route path={"/"} component={Dashboard}/>
    </Switch>
);
export default RouteComponent;
