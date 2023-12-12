import { useEffect, useRef, useState } from "react";
import { serviceGetList } from "../../services/Common.service";

const useSuccessionPlanner_hook = () => {
  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
  });

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
