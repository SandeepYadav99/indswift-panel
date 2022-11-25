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
    // form: formReducer,
});

export default rootReducer;
