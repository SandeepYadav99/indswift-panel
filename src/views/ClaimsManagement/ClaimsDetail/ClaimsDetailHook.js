import { useCallback } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const useClaimsDetail = ({}) => {
  const handleClaimPage = useCallback((value) => {
    if (value === 1) {
      historyUtils.push(RouteName.CLAIMS_MARRIGE + value);
    } else if (value === 2) {
      historyUtils.push(RouteName.CLAIMS_MOBILE + value);
    } else {
      historyUtils.push(RouteName.CLAIMS_CAR + value);
    }
  }, []);

  return {
    handleClaimPage,
  };
};

export default useClaimsDetail;
