import {getRequest, postRequest} from "../libs/AxiosService.util";

/**
 * Created by charnjeetelectrovese@gmail.com on 4/30/2020.
 */
export async function serviceGetDashboard(params) {
    return await postRequest('dashboard', params);
}

export async function serviceGetDashboardCirculars(params) {
    return await getRequest('dashboard/circulars', params);
}

export async function serviceGetDateReminders(params) {
    return await getRequest('dashboard/date/reminders', params);
}

export async function serviceGetAdminTiles(params) {
    return await getRequest('dashboard/admin/tiles', params);
}

export async function serviceGetEmployeeTiles (params) {
    return await getRequest('dashboard/employee/tiles', params);
}

export async function serviceGetUpcomingJoinings (params) {
    return await getRequest('dashboard/upcoming/joinings', params);
}

export async function serviceGetPendingOL (params) {
    return await getRequest('dashboard/pending/ol', params);
}

