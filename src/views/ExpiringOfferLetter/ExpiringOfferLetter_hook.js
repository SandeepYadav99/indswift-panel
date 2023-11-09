import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Constants from "../../config/constants";
import { actionFetchExpirOfferLetterList,   actionSetPageExpirOfferLetterList } from "../../actions/ExpirOfferLetter.action";
import { serviceMarkResharedOfferLetter } from "../../services/ExpirOfferLetter.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";

const useExpiringOfferLetterHook = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isOpenResendDialog, setIsOpenResendDialog]=useState(false)
  const [letterResendId,setLetterResendId]=useState("");
  const [expireLetter,setExpireLetter]=useState("")
  const dispatch = useDispatch();
  const isMountRef = useRef(false);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.expirOfferLetter);

  useEffect(() => {
    dispatch(
      actionFetchExpirOfferLetterList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, [expireLetter]);


  const changeRoute = useCallback((data) => {

     historyUtils.push(RouteName.JOB_OPENINGS_DETAILS + data?.job?.id); //+data.id
  }, []);


  const changeEmployeeRoute = useCallback((data) => {
    console.log(data)
    historyUtils.push(`/employees/details/${data?.code}`);
  }, []);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageExpirOfferLetterList(type));
  }, []);



  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchExpirOfferLetterList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
      // dispatch(actionFetchReviewOLR(1, sortingData))
    },
    [sortingData, query, queryData]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      //  dispatch(actionFetchExpireOfferLetter(1));
      dispatch(
        actionFetchExpirOfferLetterList(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        )
      );
    },
    [query, queryData]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };


  const handleSideToggle = useCallback(() => {
    // historyUtils.push(RouteName.CANDIDATES_CREATE);
  }, [setEditData, setSidePanel]);

  const olrDetailPages = useCallback((data) => {
    // LogUtils.log("data", data);
  
    historyUtils.push(`${RouteName.CANDIDATES_OFFER_DETAILS}${data?.id}`);
  }, []);

  const configFilter = useMemo(() => {
    return [
    
      {
        label: "Offer letter status",
        name: "Offer_letter_status",
        type: "select",
        fields: ["APPROVED", "PENDING", "REJECTED"],
      },
    
    ];
  }, []);

  const toggleIsOpenDialog = useCallback(
    (data) => {
      setIsOpenDialog((e) => !e);
      setExpireLetter(data?.id)
    },
    [isOpenDialog, expireLetter]
  );


  const toggleIsOpenResendDialog = useCallback(
    (data) => {
   
      setIsOpenResendDialog((e) => !e);
      setLetterResendId(data?.id)
    },
    [isOpenDialog, letterResendId]
  );
  return {
    handlePageChange,

    handleFilterDataChange,
     handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,

    handleSideToggle,
  
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    changeRoute,
    changeEmployeeRoute,
    toggleIsOpenDialog,
    isOpenDialog,
    toggleIsOpenResendDialog,
    isOpenResendDialog,
    letterResendId,
    expireLetter,
    olrDetailPages
  };
};

export default useExpiringOfferLetterHook;

