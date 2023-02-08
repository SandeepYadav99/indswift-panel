/**
 * Created by charnjeetelectrovese@gmail.com on 4/30/2020.
 */
import {
    DASHBOARD_CIRCULAR_INIT,
    DASHBOARD_CIRCULAR_DONE,
    EMPLOYEE_DASHBOARD_INIT,
    DASHBOARD_DATE_REMINDER_INIT, DASHBOARD_DATE_REMINDER_DONE, EMP_DASHBOARD_TILES_INIT, EMP_DASHBOARD_TILES_DONE
} from "../actions/EmployeeDashboard.action";

const initialState = {
    error: false,
    is_calling: true,
    isCircularCalling: false,
    circulars: [],
    isDateReminderCalling: false,
    reminders: { birthdays: [],
        workAnniversaries: [],
        marriageAnniversaries: []
    },
    isTilesCalling: false,
    tiles: {
        theme: null,
    }
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        case EMPLOYEE_DASHBOARD_INIT: {
            return {...state };
        }
        case DASHBOARD_CIRCULAR_INIT: {
            return {
                ...state,
                isCircularCalling: true,
            }
        }
        case DASHBOARD_CIRCULAR_DONE: {
            return {
                ...state,
                isCircularCalling: false,
                circulars: action.payload,
            }
        }
        case DASHBOARD_DATE_REMINDER_INIT: {
            return {
                ...state,
                isDateReminderCalling: true,
            }
        }
        case DASHBOARD_DATE_REMINDER_DONE: {
            return {
                ...state,
                isDateReminderCalling: false,
                reminders: {
                    ...state.reminders,
                    ...action.payload
                }
            }
        }
        case EMP_DASHBOARD_TILES_INIT: {
            return {
                ...state,
                isTilesCalling: true,
            }
        }
        case EMP_DASHBOARD_TILES_DONE: {
            return {
                ...state,
                isTilesCalling: false,
                tiles: {
                    ...state.tiles,
                    ...action.payload
                }
            }
        }
        default: {
            return state;
        }
    }
    return state;
}
