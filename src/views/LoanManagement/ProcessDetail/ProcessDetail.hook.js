import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import {
  serviceGetLoanBudgetOutstanding,
  serviceGetLoanEligiblityCalculator,
  serviceGetLoanProcessDetails,
} from "../../../services/LoanList.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useRef } from "react";

const initialForm = {
  total_applied_loan: "",
  loan_start_date: "",
  loan_end_date: "",
  interest: "",
  employee_el: "",
  employee_el_amount: "",
  gratuity_amount: "",
  total_recoverable_amount: "",
  posible_recovery_loan: "",
  comment: "",
  previous_year_loan_comment: "",
  exceptional_approval: "",
  table_amount: "",
};

function useProcessDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [loanDetail, setLoanDetail] = useState({});
  const [tabledata, setTableData] = useState([]);
  const [form, setForm] = useState({ ...initialForm });
  const [info, setInfo] = useState({});
  const travelRef = useRef(null);
  const { id } = useParams();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    if (id) {
      let req = serviceGetLoanEligiblityCalculator({
        id: id,
      });
      req.then((data) => {
        setLoanDetail(data?.data[0]);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      let req = serviceGetLoanProcessDetails({
        id: id,
      });
      req.then((data) => {
        const empdata = data?.data?.details;
        const {
          eligibility_calculations,
          proposal_recovery_plan,
          previous_loan_history,
          loan_history_comment,
          budget_positioning
        } = empdata;
        if(previous_loan_history){
          travelRef.current?.setData(previous_loan_history);
        }
        const filteredData = budget_positioning?.length > 0 ?  budget_positioning?.filter((item)=>item?.key !== "% Outstanding of issued") : [];
        setTableData([...filteredData]);
        setForm({
          ...form,
          ...eligibility_calculations,
          ...proposal_recovery_plan,
          loan_history_comment:loan_history_comment
        });
        setEmployeeDetail(data?.data?.details);
      });
    }
  }, [id]);

  // useEffect(() => {
  //   if (form?.total_applied_loan || form?.total_applied_loan === 0) {
  //     let req = serviceGetLoanBudgetOutstanding({
  //       loan_id: id,
  //       financial_year: `${currentYear}-${currentYear + 1}`,
  //       total_applied_amount: form?.total_applied_loan,
  //       current_outstanding: Number(form.table_amount),
  //     });
  //     req.then((data) => {
  //       setTableData(data?.data);
  //     });
  //   }
  // }, [id,employeeDetail]);

  return {
    id,
    employeeDetail,
    form,
    loanDetail,
    info,
    tabledata,
    travelRef,
  };
}

export default useProcessDetail;
