
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { actionFetchC3MLetterList, actionSetPageC3MLetterList } from "../../actions/C3MLetters_action";
import { serviceGetList } from "../../services/Common.service";
import constants from "../../config/constants";
import { actionFetchEmployee } from "../../actions/Employee.action";
import RolesUtils from "../../libs/Roles.utils";
import Constants from "../../config/constants";

const useC3MLetters_Hook = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
    DEPARTMENTS: [],
    LOCATIONS: [],
  });
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.C3MLetter);

  useEffect(() => {
    dispatch(
      actionFetchC3MLetterList(1, sortingData, {
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
    serviceGetList(["LOCATIONS",  "DEPARTMENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const handlePageChange = useCallback((type) => {

    dispatch(actionSetPageC3MLetterList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchC3MLetterList(1, sortingData, {
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
      console.log(`handleSortOrderChange key:${row} order: ${order}`);
      dispatch(
        actionFetchC3MLetterList(
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

  const openPDFInNewTab = useCallback((pdfUrl) => {
  if (pdfUrl) {
      window.open(pdfUrl?.joining_letter, "_blank")

    }
  }, []);

    const isCorporateHr = useMemo(() => {
        return RolesUtils.canAccess([Constants.ROLES.CORPORATE_HR], role);
    }, [role]);

  const configFilter = useMemo(() => {
    return [
      ...(isCorporateHr
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
    ];
  }, [listData, isCorporateHr]);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    openPDFInNewTab,
    isCalling,
    editData,
    configFilter,
  };
};

export default useC3MLetters_Hook;
