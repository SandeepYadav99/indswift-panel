/* eslint-disable indent,linebreak-style */
/**
 * Created by charnjeetelectrovese@gmail.com on 9/15/2017.
 */
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
// import UserReducer from './users.reducers';
import AuthReducer from "./Auth.reducer";
import User from "./User.reducer";
import Customers from "./Customers.reducer";
import Industry from "./Industry.reducer";
import Category from "./Category.reducer";
import DashboardReducer from "./Dashboard.reducer";
import Subcategory from "./SubCategory.reducer";
import AppSettingReducer from "./AppSettings.reducer";
import QuotesReducer from "./Quotes.reducer";
import ProviderUser from "./ProviderUser.reducer";
import CurrencyReducer from "./Currency.reducer";
import Countries from "./CountriesInfo.reducer";
import Cities from "./CitiesInfo.reducer";
import Region from "./RegionInfo.reducer";
import Services from "./Service.reducer";
import LeadReducer from "./Lead.reducer";
import EmployeeReducer from "./Employee.reducer";
import JobRolesReducer from "./JobRoles.reducer";
import JobOpeningsReducer from "./JobOpenings.reducer";
import LocationReducer from "./Location.reducer";
import DepartmentReducer from "./Department.reducer";
import SubDepartmentReducer from "./SubDepartment.reducer";
import GradeReducer from "./Grade.reducer";
import CadreReducer from "./Cadre.reducer";
import CandidateReducer from "./Candidate.reducer";
import InterviewScheduleReducer from "./InterviewSchedule.reducer";
import AnnualReducer from "./Annual.reducer";
import ManpowerReducer from "./Manpower.reducer";
import HRPolicyReducer from "./HRPolicy.reducer";
import CircularReducer from "./Circular.reducer";
import DesignationReducer from "./Designation.reducer";
import JobOpeningDetailReducer from "./JobOpeningDetail.reducer";
import HRFacility from "./HRFacility.reducer";
import HRFacilityItem from "./HRFacilityItem.reducer";
import HRKnowledgeReducer from "./HRKnowledge.reducer";
import HRAnnouncementReducer from "./HRAnnouncement.reducer";

import HRUtsavReducer from "./HRUtsav.reducer";
import HRUtsavItemsReducer from "./HRUtsavItems.reducer";
import EmployeeDashboard from "./EmployeeDashboard.reducer";
import EmployeeVersions from "./EmployeeEditVersion.reducer";
import CVReviewReducer from "./CVReview.reducer";
import CVShortlistReducer from "./CVShortlist.reducer";
import ReviewOLRReducer from "./ReviewOLR.reducer";
import ClaimsReducer from "./Claims.reducer";
import EmployeeClaimListReducer from "./EmployeeClaimList.reducer";
import PmsBatchReducer from "./PmsBatch.reducer";
import PmsReviewReducer from "./PmsReview.reducer";
import PmsPendingReducer from "./PmsPending.reducer";
import PmsPlannerReducer from "./PmsPlanner.reducer";
import BudgetPendingReducer from "./BudgetPending.reducer";
import PmsPendingReviewReducer from "./PmsPendingReview.reducer";
import EmployeeReportReducer from "./EmployeeReport.reducer";
import InterviewClaimsReducer from "./InterviewClaims.reducer";
import PmsNormalizeReducer from "./PmsNormalize.reducer";
import PmsHodReducer from "./PmsHod.reducer";
import PmsHodReviewReducer from "./PmsHodReview.reducer";
import TravelReducer from "./Travel.reducer";
import TravelAuthReducer from "./TravelAuth.reducer";
import ImprestReducer from "./Imprest.reducer";
import ClaimsReportReducer from "./ClaimsReport.reducer";
import ClaimCarReportReducer from "./ClaimCarReport.reducer";
import PmsSiteReviewReducer from "./PmsSiteReview.reducer";
import PMSSitePendingReviewReducer from "./PMSSitePendingReview.reducer";
import EmployeeImprestReducer from "./EmployeeImprest.reducer";
import ImprestApprovalReducer from "./ImprestApproval.reducer";
import ImprestApprovalDetailReducer from "./ImprestApprovalDetail.reducer";
import PmsOverallHodReducer from "./PmsOverallHod.reducer";
import PmsOverallHodReviewReducer from "./PmsOverallHodReview.reducer";
import EmployeeLoanListReducer from "./EmployeeLoanList.reducer";
import LoanListReducer from "./LoanList.reducer";
import NewEmployeeListReducer from "./NewEmployeeList.reducer";
import OngoingLoansReducer from "./OngoingLoans.reducer";
import LeaveReducer from "./LeaveModule.reducer";
import ExpirOfferLetterReducer from "./ExpirOfferLetter.reducer";
import NAPS_TraningReducer from "./NAPS_Traning.reducer";
import PendingBGVReducer from "./PendingBGV.reducer";
import ExitInterviewReducer from "./ExitInterview.reducer";
import C3MLetterReducer from "./C3MLetter.reducer";
import AppointmentLetterReducer from "./AppointmentLetter.reducer";
import RelievingExpLetterReducer from "./RelievingExpLetter.reducer";

import LeaveListReducer from "./LeaveList.reducer";
import FinalFormReducer from "./FinalForm.reducer";
import FinalFormApprovalReducer from "./FinalFormApproval.reducer";
import EmpRecordApprovalReducer from "./EmpRecordApproval.reducer";
import SuccessionAReducer from "./SuccessionA.reducer";
import NextSuccessionPlanerReducer from "./NextSuccessionPlaner.reducer";
import AfterNextSuccessionPlanerReducer from "./AfterNextSuccessionPlaner.reducer";
import SuccessionPlanerReducer from "./SuccessionPlaner.reducer";
const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  app_setting: AppSettingReducer,
  dashboard: DashboardReducer,
  user: User,
  auth: AuthReducer,
  industry: Industry,
  category: Category,
  subcategory: Subcategory,
  provider_user: ProviderUser,
  quotes: QuotesReducer,
  customers: Customers,
  countries: Countries,
  region: Region,
  cities: Cities,
  services: Services,
  lead: LeadReducer,
  employee: EmployeeReducer,
  currency: CurrencyReducer,
  job_roles: JobRolesReducer,
  job_openings: JobOpeningsReducer,
  location: LocationReducer,
  department: DepartmentReducer,
  designation: DesignationReducer,
  hrpolicy: HRPolicyReducer,
  hrknowledge: HRKnowledgeReducer,
  hr_announcement: HRAnnouncementReducer,
  circular: CircularReducer,
  subdepartment: SubDepartmentReducer,
  grade: GradeReducer,
  cadre: CadreReducer,
  candidate: CandidateReducer,
  claims: ClaimsReducer,
  emp_claimList: EmployeeClaimListReducer,
  interviewSchedule: InterviewScheduleReducer,
  annual: AnnualReducer,
  manpower: ManpowerReducer,
  job_opening_detail: JobOpeningDetailReducer,
  hr_facility: HRFacility,
  hr_facilities_item: HRFacilityItem,
  hr_utsav: HRUtsavReducer,
  hr_utsav_item: HRUtsavItemsReducer,
  cvReview: CVReviewReducer,
  cvShortlist: CVShortlistReducer,
  employeeDashboard: EmployeeDashboard,
  employee_versions: EmployeeVersions,
  review_olr: ReviewOLRReducer,
  pmsBatch: PmsBatchReducer,
  pmsReview: PmsReviewReducer,
  pmsPlanner: PmsPlannerReducer,
  pmsPending: PmsPendingReducer,
  budget_pending: BudgetPendingReducer,
  pmsPendingReview: PmsPendingReviewReducer,
  employeeReport: EmployeeReportReducer,
  interview_claims: InterviewClaimsReducer,
  PmsNormalize: PmsNormalizeReducer,
  travel: TravelReducer,
  travelAuth: TravelAuthReducer,
  pmsHodBatches: PmsHodReducer,
  pmsHodMyReviews: PmsHodReviewReducer,
  imprest: ImprestReducer,
  claimsReport: ClaimsReportReducer,
  claimCarReport: ClaimCarReportReducer,
  pmsSiteReview: PmsSiteReviewReducer,
  pmsSiteMyReviews: PMSSitePendingReviewReducer,
  employeeImprest: EmployeeImprestReducer,
  imprestApproval: ImprestApprovalReducer,
  imprest_detail: ImprestApprovalDetailReducer,
  pmsOverallHodBatches: PmsOverallHodReducer,
  pmsOverallHodMyReviews: PmsOverallHodReviewReducer,
  emp_loanList: EmployeeLoanListReducer,
  loanList: LoanListReducer,
  newEmployee: NewEmployeeListReducer,
  expirOfferLetter: ExpirOfferLetterReducer,
  napsTraning: NAPS_TraningReducer,
  pendingBGV: PendingBGVReducer,
  OngoingLoans: OngoingLoansReducer,
  LeaveModule: LeaveReducer,
  exit_interview: ExitInterviewReducer,
  leave_list: LeaveListReducer,
  final_form: FinalFormReducer,
  C3MLetter: C3MLetterReducer,
  AppointmentLetter: AppointmentLetterReducer,
  RelievingExpLetter: RelievingExpLetterReducer,
  successionPlaner: SuccessionPlanerReducer,
  next_year: NextSuccessionPlanerReducer,
  next_next_year:AfterNextSuccessionPlanerReducer,
  final_form_approval: FinalFormApprovalReducer,
  succession_approval:SuccessionAReducer
  // form: formReducer,
});

export default rootReducer;
