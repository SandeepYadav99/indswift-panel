import { useEffect, useRef } from "react";
import { serviceGetSuccessionPlanerList } from "../../services/SuccessionPlanner.service";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchSuccessionPlaner } from "../../actions/SuccessionPlanner.action";

const useSuccessionPlanner_hook = ({ jobId }) => {
  const dispatch = useDispatch();
  const isMountRef = useRef(false);

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

  return {};
};

export default useSuccessionPlanner_hook;
