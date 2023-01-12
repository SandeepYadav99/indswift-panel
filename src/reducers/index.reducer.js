/* eslint-disable indent,linebreak-style */
/**
 * Created by charnjeetelectrovese@gmail.com on 9/15/2017.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import UserReducer from './users.reducers';
import AuthReducer from './Auth.reducer';
import User from './User.reducer';
import Customers from './Customers.reducer';
import Industry from './Industry.reducer';
import Category from './Category.reducer'
import DashboardReducer from './Dashboard.reducer';
import Subcategory from './SubCategory.reducer'
import AppSettingReducer from './AppSettings.reducer';
import QuotesReducer from './Quotes.reducer';
import ProviderUser from './ProviderUser.reducer';
import CurrencyReducer from './Currency.reducer';
import Countries from './CountriesInfo.reducer';
import Cities from './CitiesInfo.reducer';
import Region from './RegionInfo.reducer';
import Services from './Service.reducer';
import LeadReducer from './Lead.reducer';
import EmployeeReducer from "./Employee.reducer";
import JobRolesReducer from "./JobRoles.reducer";
import JobOpeningsReducer from "./JobOpenings.reducer";
import LocationReducer from "./Location.reducer";
import DepartmentReducer from "./Department.reducer";
import SubDepartmentReducer from "./SubDepartment.reducer";
import GradeReducer from "./Grade.reducer";
import CadreReducer from "./Cadre.reducer";
import CandidateReducer from "./Candidate.reducer";
import AnnualReducer from "./Annual.reducer";
import ManpowerReducer from "./Manpower.reducer"
import HRPolicyReducer from './HRPolicy.reducer';
import CircularReducer from './Circular.reducer';

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
    hrpolicy:HRPolicyReducer,
    circular:CircularReducer,
    subdepartment: SubDepartmentReducer,
    grade: GradeReducer,
    cadre: CadreReducer,
    candidate: CandidateReducer,
    annual: AnnualReducer,
    manpower: ManpowerReducer,
    // form: formReducer,
});

export default rootReducer;
