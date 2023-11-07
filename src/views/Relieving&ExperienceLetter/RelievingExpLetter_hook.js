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

const useRelievingExpLetter_hook = () => {
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
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

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
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

  const configFilter = useMemo(() => {
    return [
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: [
          "ACTIVE",
          "RESIGNED",
          "TERMINATED",
          "RETIRED",
          "EXPIRED",
          "ABSCONDED",
          "INACTIVE",
        ],
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
    handleSendDetails,
    editData,
    configFilter,
    handleRelievingExpLetter,
  };
};

export default useRelievingExpLetter_hook;
