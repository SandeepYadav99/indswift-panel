import { useCallback, useEffect, useRef, useState } from "react";
import { serviceGetList } from "../../services/Common.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";

const useSuccessionPlanner_hook = () => {
  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
  });
  const [retireDialog, setRetireDialog] = useState(false);
  const [empId, setEmpId] = useState(null);
  

  useEffect(() => {
    serviceGetList(["LOCATIONS", "GRADES", "DEPARTMENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const toggleRetireDialog = useCallback(
    (data) => {
      // console.log(RouteName.SUCCESSION_DETAIL + data)
      historyUtils.push(RouteName.SUCCESSION_DETAIL + data);
      // setRetireDialog((e) => !e);
      // if (typeof data === "string") {
      //   setEmpId(data);
      // } else {
      //   setEmpId(null);
      // }
    },
    [retireDialog]
  );

  return { listData, retireDialog, toggleRetireDialog, empId };
};

export default useSuccessionPlanner_hook;
