/**
 * Created by charnjeetelectrovese@gmail.com on 6/29/2020.
 */

import { COUNT_LEAVE, CREATE_LEAVE, LIST_LEAVE } from "../actions/LeaveModule.action";

const initialState = {
  all: [],
  data: [],
  present: [], //
  currentPage: 0,
  serverPage: 0,
  query: null, // search text data
  query_data: null, // popover filter data change
  sorting_data: { row: null, order: null },
  is_fetching: false,
  batch_id: null,
  is_lead_detail: false,
  lead_detail: null,
  is_lead_requests: false,
  lead_requests: [],
  is_lead_notes: false,
  lead_notes: [],
  type: "ALL",
};

export default function (
  state = JSON.parse(JSON.stringify(initialState)),
  action
) {
  switch (action.type) {
    case LIST_LEAVE: {
      return { ...state, data: action.payload };
    }
    case COUNT_LEAVE:{
      return { ...state, count: action.payload };
    }
    default: {
      return state;
    }
  }
}
