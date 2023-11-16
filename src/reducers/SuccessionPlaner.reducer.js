import {
  FETCH_NEXT,
  FETCH_INIT,
  FETCHED,
  FILTER,
  RESET_FILTER,
  SET_SORTING,
  SET_FILTER,
  SET_PAGE,
  CHANGE_PAGE,
  CHANGE_STATUS,
  SET_SERVER_PAGE,
  FETCHED_YEAR,
} from "../actions/SuccessionPlanner.action";
import constants from "../config/constants";

function mapPresetPRequest(all, pageId) {
  console.log('after',all,pageId)
  return all?.filter((val, index) => {
    if (
      index >= (pageId + 1) * constants.PAGE_VALUE - constants.PAGE_VALUE &&
      index < (pageId + 1) * constants.PAGE_VALUE
    ) {
      return val;
    }
  });
}

const initialState = {
  allThisYear: [],
  allNextYear:[],
  allNextNextYear:[],
  year: [],
  nextYear: [],
  nextNextYear:[],
  currentPage: 0,
  serverPage: 0,
  query: null, // search text data
  query_data: null, // popover filter data change
  sorting_data: { row: null, order: null },
  is_fetching: false,
};

export default function (
  state = JSON.parse(JSON.stringify(initialState)),
  action
) {
  switch (action.type) {
    case FETCH_INIT: {
      return { ...state, is_fetching: true };
    }
    case FETCHED_YEAR: {
      const thisYear = action.payload.year;
      const nextYear = action.payload.next_year;
      const nextNextYear_ = action.payload.next_next_year;

      const page = action.payload.page;
      let newThisYear = [];
      if (page == 1) {
        newThisYear = [...thisYear];
      } else {
        newThisYear = [...state.allThisYear, ...thisYear];
      }
      // 2 
      let newNextYear =[];
      if(page=== 1){
        newNextYear=[...nextYear]
      }else{
        newNextYear =[...state.allNextYear, ...nextYear]
      }
// 3
      let newNextNextYear =[];
      if(page=== 1){
        newNextNextYear=[...nextNextYear_]
      }else{
        newNextNextYear =[...state.allNextNextYear, ...nextNextYear_]
      }
      const tableDataThisYear = mapPresetPRequest(newThisYear, state.currentPage);
      const tableDataNextYear = mapPresetPRequest(newNextYear, state.currentPage);
       const tableDataNextNextYear = mapPresetPRequest(newNextNextYear, state.currentPage);
      return {
        ...state,
        allThisYear: newThisYear,
        allNextYear:newNextYear,
        allNextNextYear:newNextNextYear,
        year: tableDataThisYear,
        nextYear: tableDataNextYear,
        nextNextYear: tableDataNextNextYear,
        is_fetching: false,
       
      }; // { ...state , all: newAll, data: tableData, serverPage: 1, currentPage: 1 };
    }

    case SET_SORTING: {
      return { ...state, sorting_data: action.payload };
    }
    
    case CHANGE_PAGE: {
      const tempPage = action.payload;
      const tableData = mapPresetPRequest(state.allThisYear, tempPage);
      return { ...state, year: tableData, currentPage: tempPage };
    }
    case FETCH_NEXT: {
      const newAll = state.allThisYear.concat(action.payload);
      return { ...state, allThisYear: newAll, serverPage: state.serverPage + 1 };
    }
    case FILTER: {
      return { ...state, year: action.payload };
    }
    case SET_FILTER: {
      return {
        ...state,
        query: action.payload.query,
        query_data: action.payload.query_data,
      };
    }
    case RESET_FILTER: {
      const tableData = mapPresetPRequest(state.allThisYear, state.currentPage);
      return { ...state, year: tableData };
    }
    case SET_PAGE: {
      return { ...state, currentPage: action.payload };
    }
    case SET_SERVER_PAGE: {
      return { ...state, serverPage: action.payload };
    }
    default: {
      return state;
    }
  }
}
