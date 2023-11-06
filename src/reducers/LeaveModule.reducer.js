/**
 * Created by charnjeetelectrovese@gmail.com on 6/29/2020.
 */

import { COUNT_LEAVE, CREATE_LEAVE, LIST_LEAVE,LEAVES_DATA } from "../actions/LeaveModule.action";
import {
  FETCH_INIT,
  FETCHED,
  SET_SORTING,
  CHANGE_STATUS,
  CREATE_DATA,
  UPDATE_DATA,
} from "../actions/LeaveModule.action";
import Constants from '../config/constants';


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


function mapPresetPRequest(all, pageId) {
  return all.filter((val, index) => {
      if (index >= (((pageId + 1) * Constants.DEFAULT_PAGE_VALUE) - Constants.DEFAULT_PAGE_VALUE) && index < (((pageId + 1) * Constants.DEFAULT_PAGE_VALUE))) {
          return val;
      }
  });
}

export default function (
  state = JSON.parse(JSON.stringify(initialState)),
  action
) {
  switch (action.type) {
    case FETCH_INIT: {
      return {...state, is_fetching: true};
  }
  case FETCHED: {
      const newData = (action.payload).data;
      const page = action.payload.page;
      let newAll = [];
      if (page == 1) {
          newAll = [...newData];
      } else {
          newAll = [...state.all, ...newData];
      }
      const tableData = mapPresetPRequest(newAll, state.currentPage);
      return {...state, all: newAll, data: tableData, is_fetching: false}; // { ...state , all: newAll, data: tableData, serverPage: 1, currentPage: 1 };
  }
  case SET_SORTING: {
      return {...state, sorting_data: action.payload};
  }
  case CHANGE_STATUS: {
      if (action.payload) {
          const prevState = state.all;
          prevState.forEach((val) => {
              if (val.id == action.payload.id) {
                  val.status = action.payload.status == 'SUSPEND' ? 'SUSPEND' : 'ACTIVE';
                  return true;
              }
          });
          // const newState = state.all.map((val) => {
          //     if (val.id == action.payload.id) {
          //         return { ...val, status: action.payload.status == 'SUSPEND' ? 'SUSPEND' : 'ACTIVE' };
          //     } return { ...val };
          // });
          const tableData = mapPresetPRequest(prevState, state.currentPage);
          return {...state, all: prevState, data: tableData};
      }
      return state;
  }
  case CREATE_DATA: {
      if (action.payload) {
          const prevState = state.all;
          prevState.unshift(action.payload);
          const tableData = mapPresetPRequest(prevState, state.currentPage);
          return {...state, all: prevState, data: tableData};
      }
      return state;
  }
  case UPDATE_DATA: {
      if (action.payload) {
          const prevState = state.all;
          let tIndex = null;
          prevState.some((val, index) => {
              if (val.id == action.payload.id) {
                  tIndex = index;
                  return true;
              }
          });
          if (tIndex != null) {
              prevState[tIndex] = action.payload;
          }
          const tableData = mapPresetPRequest(prevState, state.currentPage);
          return {...state, all: prevState, data: tableData};
      }
      return state;
  }
    case LIST_LEAVE: {
      return { ...state, data: action.payload };
    }
    case COUNT_LEAVE:{
      return { ...state, count: action.payload };
    }
    case LEAVES_DATA:{
      return { ...state, list: action.payload };
    }
    default: {
      return state;
    }
  }
}
