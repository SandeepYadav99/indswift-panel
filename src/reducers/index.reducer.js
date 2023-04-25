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
  claims:ClaimsReducer,
  emp_claimList:EmployeeClaimListReducer,
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
  review_olr:ReviewOLRReducer,
  pmsBatch:PmsBatchReducer
  // form: formReducer,
});

export default rootReducer;
