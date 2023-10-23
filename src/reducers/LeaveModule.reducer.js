/**
 * Created by charnjeetelectrovese@gmail.com on 6/29/2020.
 */

import {
    CREATE_LEAVE
} from '../actions/LeaveModule.action';




const initialState = {
    all: [],
    present: [], //
    currentPage: 0,
    serverPage: 0,
    query: null, // search text data
    query_data: null, // popover filter data change
    sorting_data: {row: null, order: null},
    is_fetching: false,
    batch_id: null,
    is_lead_detail: false,
    lead_detail: null,
    is_lead_requests: false,
    lead_requests: [],
    is_lead_notes: false,
    lead_notes: [],
    type: 'ALL',
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
       case CREATE_LEAVE:{
        return({...state})
       }
        default: {
            return state;
        }
    }
}
