import { useCallback, useEffect, useRef, useState } from "react";
import { serviceGetList } from "../../services/Common.service";

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
      setRetireDialog((e) => !e);
      if (typeof data === "string") {
        setEmpId(data);
      } else {
        setEmpId(null);
      }
    },
    [retireDialog]
  );

  return { listData, retireDialog, toggleRetireDialog, empId };
};

export default useSuccessionPlanner_hook;
