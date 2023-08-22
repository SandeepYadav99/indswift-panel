import React from "react";
import useLoanRecovery from "./LoanRecovery.hook";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function LoanRecovery({ location }) {
  const { loanData } = useLoanRecovery({ location });
  console.log("loanData", loanData);
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>Loan Recovery Schedule</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headWrap}>
            <div className={styles.heading}>Loan Information</div>
          </div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Name:</span>
                    {loanData?.employeesName}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Designation:</span>

                    {loanData?.designationsName}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Amount :</span>
                    {loanData?.total_applied_loan &&
                      `₹ ${loanData?.total_applied_loan}`}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>
                      EMI (Monthly Installment):
                    </span>
                    {loanData?.total?.totalRepaybleAmmount &&
                      Number(loanData?.total?.totalRepaybleAmmount) /
                        Number(loanData?.totalTenureMounth)}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>
                      Total Repayment Amount:
                    </span>
                    {loanData?.total?.totalRepaybleAmmount &&
                      `₹ ${loanData?.total?.totalRepaybleAmmount}`}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Department:</span>
                    {loanData?.departmentsName}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Type of Loan:</span>
                    {loanData?.loanType}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Interest Rate:</span>
                    {loanData?.interest}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Tenure of Loan:</span>
                    {loanData?.totalTenureYear &&
                      loanData?.totalTenureYear.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanRecovery;
