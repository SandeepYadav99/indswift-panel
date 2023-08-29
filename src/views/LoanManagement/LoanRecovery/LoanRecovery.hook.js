import React, { useEffect, useState } from "react";
import { serviceGetLoanSchedule } from "../../../services/LoanList.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";

function useLoanRecovery({ location }) {
  const [loanData, setLoanData] = useState({});
  const userInfo = location?.state;

  const getUserInfo = () => {
    let req = serviceGetLoanSchedule({
      id: userInfo?.id,
      total_applied_loan: userInfo?.formValues?.total_applied_loan,
      loan_start_date: userInfo?.formValues?.loan_start_date,
      loan_end_date: userInfo?.formValues?.loan_end_date,
      interest: Number(userInfo?.formValues?.interest),
    });
    req.then((res) => {
      setLoanData(res?.data);
    });
  };
  useEffect(() => {
    if (userInfo?.id) {
      getUserInfo();
    }
  }, [userInfo?.id]);
  return {loanData};
}

export default useLoanRecovery;
