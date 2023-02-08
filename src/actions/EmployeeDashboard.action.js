import {
    serviceGetDashboard,
    serviceGetDashboardCirculars,
    serviceGetDateReminders, serviceGetEmployeeTiles
} from "../services/Dashboard.service";


export const EMPLOYEE_DASHBOARD_INIT = 'EMPLOYEE_DASHBOARD_INIT';
export const DASHBOARD_CIRCULAR_INIT = 'DASHBOARD_CIRCULAR_INIT';
export const DASHBOARD_CIRCULAR_DONE = 'DASHBOARD_CIRCULAR_DONE';

export const DASHBOARD_DATE_REMINDER_INIT = 'DASHBOARD_DATE_REMINDER_INIT';
export const DASHBOARD_DATE_REMINDER_DONE = 'DASHBOARD_DATE_REMINDER_DONE';
export const EMP_DASHBOARD_TILES_INIT = 'EMP_DASHBOARD_TILES_INIT';
export const EMP_DASHBOARD_TILES_DONE = 'EMP_DASHBOARD_TILES_DONE';

export function actionInitiateEmployeeDashboard(data) {
    return (dispatch) => {
        dispatch(actionGetCircularAndPolicies());
        dispatch(actionGetDateReminders());
        dispatch(actionGetEmployeeTiles());
        return ({type: EMPLOYEE_DASHBOARD_INIT, payload: null});
    };
}

export function actionGetCircularAndPolicies() {
    const req = serviceGetDashboardCirculars();
    return (dispatch) => {
        dispatch({ type: DASHBOARD_CIRCULAR_INIT, payload: null });
        req.then((res)=> {
            if (!res.error) {
                dispatch({ type: DASHBOARD_CIRCULAR_DONE, payload: res.data });
            } else {
                dispatch({ type: DASHBOARD_CIRCULAR_DONE, payload: [] });
            }
        })
    }
}


export function actionGetDateReminders() {
    const req = serviceGetDateReminders();
    return (dispatch) => {
        dispatch({ type: DASHBOARD_DATE_REMINDER_INIT, payload: null });
        req.then((res)=> {
            if (!res.error) {
                dispatch({ type: DASHBOARD_DATE_REMINDER_DONE, payload: res.data });
            } else {
                dispatch({ type: DASHBOARD_DATE_REMINDER_DONE, payload: {} });
            }
        })
    }
}


export function actionGetEmployeeTiles() {
    const req = serviceGetEmployeeTiles();
    return (dispatch) => {
        dispatch({ type: EMP_DASHBOARD_TILES_INIT, payload: null });
        req.then((res)=> {
            if (!res.error) {
                dispatch({ type: EMP_DASHBOARD_TILES_DONE, payload: res.data });
            } else {
                dispatch({ type: EMP_DASHBOARD_TILES_DONE, payload: {} });
            }
        })
    }
}
