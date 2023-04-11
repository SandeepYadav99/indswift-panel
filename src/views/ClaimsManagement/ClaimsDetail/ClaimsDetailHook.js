import { useCallback, useEffect } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { serviceGetClaimDetail } from "../../../services/Claims.service";

const useClaimsDetail = ({}) => {
  useEffect(() => {
    let dataValues = serviceGetClaimDetail();
    dataValues
      .then((data) => {
        console.log(data)
        // setemployeeHRData(data?.data);
        // setAllData(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClaimPage = useCallback((value) => {
    if (value === 1) {
      historyUtils.push(RouteName.CLAIMS_MARRIGE);
    } else if (value === 2) {
      historyUtils.push(RouteName.CLAIMS_MOBILE);
    } else {
      historyUtils.push(RouteName.CLAIMS_CAR);
    }
  }, []);

  return {
    handleClaimPage,
  };
};

export default useClaimsDetail;
