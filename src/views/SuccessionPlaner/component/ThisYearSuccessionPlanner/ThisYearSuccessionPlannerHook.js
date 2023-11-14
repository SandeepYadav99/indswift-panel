import { useDispatch } from "react-redux";
import  {
  useCallback,

  useMemo,
  useState,
  useRef,
} from "react";
import historyUtils from "../../../../libs/history.utils";
import RouteName from "../../../../routes/Route.name";
import {

  actionSetPageSuccessionPlaner,
} from "../../../../actions/SuccessionPlanner.action";

const totalShow = 10;
const useThisYearSuccessionPlaner = ({ jobId }) => {
  const dispatch = useDispatch();
  const [isSidePanel, setSidePanel] = useState(false);
  const [isSidePanelForm, setSidePanelForm] = useState(false);
  const isMountRef = useRef(false);

  const [listData, setListData] = useState({
    LOCATIONS: [],
    HR: [],
    JOB_OPENINGS: [],
  });

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageSuccessionPlaner(type));
  }, []);

  const handleRowSize = (page) => {
    console.log(page);
  };

  const queryFilter = useCallback((key, value) => {
    console.log("_queryFilter", key, value);
  }, []);

  const handleFilterDataChange = useCallback(
    (value) => {
      console.log("_handleFilterDataChange", value);
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

 
  const handleEdit = useCallback((all) => {
    historyUtils.push(`${RouteName.CANDIDATES_UPDATE}${all.candidate_id}`, {
      isEdit: true,
    });
  }, []);

  const handleToggleSidePannel = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      //   setEditData(data?.id);
    },
    [setSidePanel] // setEditData
  );

  const handleToggleSidePannelForm = useCallback(
    (data) => {
      setSidePanelForm((e) => !e);
      //   setEditData(data?.id);
    },
    [setSidePanelForm] // setEditData
  );

  const handleSortOrderChange = (row, order) => {
    console.log(`handleSortOrderChange key:${row} order: ${order}`);
  };

  

  return {
    handlePageChange,
    // handleCellClick,
    handleFilterDataChange,
    handleSearchValueChange,
    // handlePreviousPageClick,
    // handleNextPageClick,
    handleRowSize,
    handleSortOrderChange,

    handleEdit,
   
    handleToggleSidePannel,
    isSidePanel,
    isSidePanelForm,
    handleToggleSidePannelForm,
  };
};

export default useThisYearSuccessionPlaner;
