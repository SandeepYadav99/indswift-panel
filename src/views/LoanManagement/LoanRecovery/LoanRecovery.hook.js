import React, { useEffect, useState } from "react";
import {
  serviceGetLoanListDetails,
  serviceGetLoanSchedule,
} from "../../../services/LoanList.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import LogUtils from "../../../libs/LogUtils";
import { serviceGetEmployeeLoanDetails } from "../../../services/EmployeeLoanList.service";

function useLoanRecovery({ location }) {
  const [loanData, setLoanData] = useState({});
  const userInfo = location?.state;

  const getUserInfo = () => {
    LogUtils.log('run Time')
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
    if (userInfo?.detailId) {
      LogUtils.log('detail')
      let req = serviceGetLoanListDetails({ id: userInfo?.detailId });
      req.then((data) => {
        const empData = data?.data?.details?.loan;
        setLoanData(empData?.loanSchedule);
      });
    }else if(userInfo?.onGoing){
      let req = serviceGetEmployeeLoanDetails({ id: userInfo?.onGoing });
      req.then((data) => {
        const empData = data?.data?.details;
        setLoanData(empData?.loanSchedule);
      });
    } else {
      if (userInfo?.id) {
        getUserInfo();
      }
    }
  }, [userInfo?.id]);
  return { loanData };
}

export default useLoanRecovery;
