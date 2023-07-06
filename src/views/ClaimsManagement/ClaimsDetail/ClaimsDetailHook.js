import { useCallback, useEffect, useState } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { serviceGetClaimDetail } from "../../../services/Claims.service";

const useClaimsDetail = ({}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    let dataValues = serviceGetClaimDetail();
    dataValues
      .then((data) => {
        console.log(data);
        setData(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClaimPage = useCallback((value) => {
    if (value === 1) {
      historyUtils.push(RouteName.CLAIMS_MARRIGE);
    } else if (value === 2) {
      historyUtils.push(RouteName.CLAIMS_MOBILE);
    } else if (value === 3) {
      historyUtils.push(RouteName.CLAIMS_CAR);
    } else if (value === 4) {
      historyUtils.push(RouteName.CLAIMS_HEALTH);
    } else if (value === 5) {
      historyUtils.push(RouteName.CLAIMS_TRAVEL);
    } else if (value ===6) {
      historyUtils.push(RouteName.CLAIMS_LOC);
    } else{
      historyUtils.push(RouteName.CLAIMS_LOAN);
    }
  }, []);

  return {
    handleClaimPage,
    data,
  };
};

export default useClaimsDetail;
