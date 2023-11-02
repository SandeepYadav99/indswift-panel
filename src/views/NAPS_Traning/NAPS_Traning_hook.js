import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ReactDOM from "react-dom";

import {
  actionFetchNapsTraningList,
  actionSetPageNapsTraningList,
} from "../../actions/NAPS_Traning.action";
import constants from "../../config/constants";
import { serviceGetList } from "../../services/Common.service";
import { actionFetchEmployee } from "../../actions/Employee.action";

const useNapsTraning_Hook = () => {
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
  } = useSelector((state) => state?.napsTraning);

  useEffect(() => {
    dispatch(
      actionFetchNapsTraningList(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  console.log("list", listData);
  const handlePageChange = useCallback((type) => {
    console.log("_handlePageChange", type);
    dispatch(actionSetPageNapsTraningList(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      console.log("_queryFilter", key, value);
      dispatch(
        actionFetchNapsTraningList(1, sortingData, {
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
        actionFetchNapsTraningList(
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

  const handleNapsCertificatePage = useCallback((pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl?.naps?.letter_pdf, "_blank");
      // ReactDOM.render(<a href={pdfUrl} target="_blank"/>, newWindow.document.body);
    } else {
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
    serviceGetList(["LOCATIONS", "DEPARTMENTS"]).then((res) => {
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
    ];
  }, [listData]);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleNapsCertificatePage,
    isCalling,
    editData,
    configFilter,
  };
};

export default useNapsTraning_Hook;
