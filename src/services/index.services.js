/**
 * Created by charnjeetelectrovese@gmail.com on 9/13/2017.
 */
import axios from 'axios';
import Constants from '../config/constants';
import {getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceLoginUser(data) {
    return await postRequest('login', data);
}
export async function serviceGetProfile () {
    return await postRequest('profile', {});
}

export async function serviceGetListData() {
    return await getRequest('list/data', {});
}
export async function serviceForgotPassword(params) {
    return await postRequest('forgot/password', params);
}

export async function serviceResetPassword(params) {
    return await postRequest('reset/password', params);
}

export async function serviceChangePassword(params) {
    return await postRequest('change/password', params);
}

export async function serviceLoginSupport(params) {
    return await postRequest('login/support', params);
}

export async function servicePasswordVerify(params) {
    return await postRequest('password/verify', params);
}
