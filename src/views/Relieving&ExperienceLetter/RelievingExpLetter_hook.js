import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import { serviceGetList } from "../../services/Common.service";
import {
  actionFetchRelievingExpLetterList,
  actionSetPageRelievingExpLetterList,
} from "../../actions/RelievingExpLetter.action";
import { serviceSendRelievingExpLetter } from "../../services/Letters.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import constants from "../../config/constants";
import { actionFetchEmployee } from "../../actions/Employee.action";
import { serviceResendExitForm } from "../../services/ExitInterview.service";
const useRelievingExpLetter_hook = () => {
  const [editData, setEditData] = useState(null);
  const { role } = useSelector((state) => state.auth);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
  });
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.RelievingExpLetter);

  useEffect(() => {
    dispatch(
      actionFetchRelievingExpLetterList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  const initData = useCallback(() => {
    dispatch(
      actionFetchEmployee(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
  }, []);

  useEffect(() => {
    initData();
    isMountRef.current = true;
    serviceGetList(["LOCATIONS", "GRADES", "DEPARTMENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageRelievingExpLetterList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchRelievingExpLetterList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
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
      dispatch(
        actionFetchRelievingExpLetterList(
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

  const handleViewDetails = useCallback((data) => {
    historyUtils.push(
      `${RouteName.RELIEVING_EXPERIENCE_LETTER_DETAIL}${data?.id}`
    ); //+data.id
  }, []);

  const handleSendDetails = useCallback((data) => {
    serviceSendRelievingExpLetter({ id: data?.id }).then((res) => {
      if (!res?.error) {
        SnackbarUtils.success("Succesfully Send");
      } else {
        SnackbarUtils.error(res?.error);
      }
    });
  }, []);

  const handleRelievingExpLetter = useCallback((document) => {
    if (document) {
      window.open(document?.experienceLetter?.document, "_blank");
    }
  }, []);

  const handleResend = useCallback((data) => {

    serviceResendExitForm({
      id: data?.exitInterview?.id,
    }).then((res) => {
      if (!res.error) {
        SnackbarUtils?.success("Resend Successfully")
        window.location.reload();
      }
    });
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Location",
        name: "location_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.LOCATIONS,
      },

      {
        label: "Grade",
        name: "employeesObj.grade_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "label" } },
        fields: listData?.GRADES,
      },
      {
        label: "Department",
        name: "employeesObj.department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
    ];
  }, [listData, role]);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleViewDetails,
    handleSendDetails,
    editData,
    configFilter,
    handleRelievingExpLetter,
    handleResend
  };
};

export default useRelievingExpLetter_hook;
