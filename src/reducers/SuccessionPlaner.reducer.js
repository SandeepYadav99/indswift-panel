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
  CREATE_DATA,
  UPDATE_DATA,
  DELETE_ITEM,
  FETCHED_YEAR,
  FETCHED_NEXT_YEAR,
  FETCHED_NEXT_NEXT_YEAR,
} from "../actions/SuccessionPlanner.action";
import constants from "../config/constants";

function mapPresetPRequest(all, pageId) {
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
  allNextYear: [],
  allNextNextYear: [],
  year: [],
  nextYear: [],
  nextNextYear: [],
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
      let newNextYear = [];
      if (page === 1) {
        newNextYear = [...nextYear];
      } else {
        newNextYear = [...state.allNextYear, ...nextYear];
      }
      // 3
      let newNextNextYear = [];
      if (page === 1) {
        newNextNextYear = [...nextNextYear_];
      } else {
        newNextNextYear = [...state.allNextNextYear, ...nextNextYear_];
      }
      const tableDataThisYear = mapPresetPRequest(
        newThisYear,
        state.currentPage
      );
      const tableDataNextYear = mapPresetPRequest(
        newNextYear,
        state.currentPage
      );
      const tableDataNextNextYear = mapPresetPRequest(
        newNextNextYear,
        state.currentPage
      );

      return {
        ...state,
        allThisYear: newThisYear,
        allNextYear: newNextYear,
        allNextNextYear: newNextNextYear,
        year: tableDataThisYear,
        nextYear: tableDataNextYear,
        nextNextYear: tableDataNextNextYear,
        is_fetching: false,
      }; // { ...state , all: newAll, data: tableData, serverPage: 1, currentPage: 1 };
    }

    case SET_SORTING: {
      return { ...state, sorting_data: action.payload };
    }
    case CHANGE_STATUS: {
      if (action.payload) {
        const prevState = state.all;
        prevState.forEach((val) => {
          if (val.id == action.payload.id) {
            val.status =
              action.payload.status == "SUSPEND" ? "SUSPEND" : "ACTIVE";
            return true;
          }
        });
        // const newState = state.all.map((val) => {
        //     if (val.id == action.payload.id) {
        //         return { ...val, status: action.payload.status == 'SUSPEND' ? 'SUSPEND' : 'ACTIVE' };
        //     } return { ...val };
        // });
        const tableData = mapPresetPRequest(prevState, state.currentPage);
        return { ...state, all: prevState, data: tableData };
      }
      return state;
    }
    case CREATE_DATA: {
      if (action.payload) {
        const prevState = state.all;
        prevState.unshift(action.payload);
        const tableData = mapPresetPRequest(prevState, state.currentPage);
        return { ...state, all: prevState, data: tableData };
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
        // const newState = state.all.map((val) => {
        //     if (val.id == action.payload.id) {
        //         return { ...val, status: action.payload.status == 'SUSPEND' ? 'SUSPEND' : 'ACTIVE' };
        //     } return { ...val };
        // });
        if (tIndex != null) {
          prevState[tIndex] = action.payload;
        }
        const tableData = mapPresetPRequest(prevState, state.currentPage);
        return { ...state, all: prevState, data: tableData };
      }
      return state;
    }

    case DELETE_ITEM: {
      if (action.payload) {
        let tempIndex = null;
        const prevState = state.all;
        const id = action.payload;

        prevState.some((val, index) => {
          if (val.id == id) {
            tempIndex = index;
            return true;
          }
        });

        if (tempIndex != null) {
          prevState.splice(tempIndex, 1);
        }
        const tableData = mapPresetPRequest(prevState, state.currentPage);
        return { ...state, all: prevState, data: tableData };
      }
      return state;
    }
    // case NEX: {
    //     const tableData = mapPresetPRequest(state.all, state.currentPage + 1);
    //     return { ...state, data: tableData, currentPage: (state.currentPage + 1) };
    // }
    // case PREV_PREQUESTS: {
    //     const tableData = mapPresetPRequest(state.all, state.currentPage - 1);
    //     return { ...state, data: tableData, currentPage: (state.currentPage - 1) };
    // }
    case CHANGE_PAGE: {
      const tempPage = action.payload;
      const tableData = mapPresetPRequest(state.all, tempPage);
      return { ...state, data: tableData, currentPage: tempPage };
    }
    case FETCH_NEXT: {
      const newAll = state.all.concat(action.payload);
      return { ...state, all: newAll, serverPage: state.serverPage + 1 };
    }
    case FILTER: {
      return { ...state, data: action.payload };
    }
    case SET_FILTER: {
      return {
        ...state,
        query: action.payload.query,
        query_data: action.payload.query_data,
      };
    }
    case RESET_FILTER: {
      const tableData = mapPresetPRequest(state.all, state.currentPage);
      return { ...state, data: tableData };
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
