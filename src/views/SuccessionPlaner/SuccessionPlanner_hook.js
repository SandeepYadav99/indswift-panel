import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchSuccessionPlaner } from "../../actions/SuccessionPlanner.action";
import { serviceGetList } from "../../services/Common.service";

const useSuccessionPlanner_hook = ({ jobId }) => {
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
  });
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state?.successionPlaner);

  useEffect(() => {
    dispatch(
      actionFetchSuccessionPlaner(1, sortingData, {
        query: isMountRef.current ? query : null,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, []);

  useEffect(() => {
    serviceGetList(["LOCATIONS", "GRADES", "DEPARTMENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  return { listData };
};

export default useSuccessionPlanner_hook;
