import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { actionFetchAppointmentLetterList, actionFilterAppointmentLetterList } from "../../actions/AppointmentLetter.action";
import constants from "../../config/constants";
import { actionFetchEmployee } from "../../actions/Employee.action";
import { serviceGetList } from "../../services/Common.service";

const useAppointemntLetter_Hook = () => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState({
    GRADES: [],
    DEPARTMENTS: [],
    LOCATIONS: [],
  });

  const { role } = useSelector((state) => state.auth);
  const isMountRef = useRef(false);
  
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.AppointmentLetter);

  useEffect(() => {
    dispatch(
      actionFetchAppointmentLetterList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);


  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionFilterAppointmentLetterList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchAppointmentLetterList(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
    },
    [sortingData, query, queryData]
  );

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

  const handleSortOrderChange = useCallback(
    (row, order) => {
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(
        actionFetchAppointmentLetterList(
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

  const handleViewDetails = useCallback((pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl?.letter, "_blank")
   
    }
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
    serviceGetList(["LOCATIONS", "DEPARTMENTS", "GRADES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const configFilter = useMemo(() => {
    return [
      ...(role === constants.ROLES.CORPORATE_HR
        ? [
            {
              label: "Location",
              name: "location_id",
              type: "selectObject",
              custom: { extract: { id: "id", title: "name" } },
              fields: listData?.LOCATIONS,
            },
          ]
        : []),
      {
        label: "Department",
        name: "department_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "name" } },
        fields: listData?.DEPARTMENTS,
      },
      {
        label: "Grade",
        name: "grade_id",
        type: "selectObject",
        custom: { extract: { id: "id", title: "label" } },
        fields: listData?.GRADES,
      },
    ];
  }, [listData]);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleViewDetails,
    configFilter,
  };
};

export default useAppointemntLetter_Hook;
