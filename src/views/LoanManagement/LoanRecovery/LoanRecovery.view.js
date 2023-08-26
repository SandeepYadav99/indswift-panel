import React, { useMemo } from "react";
import useLoanRecovery from "./LoanRecovery.hook";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DataTables from "../../../Datatables/Datatable.table";
import constants from "../../../config/constants";

function LoanRecovery({ location }) {
  const { loanData, handleSortOrderChange, handleRowSize, handlePageChange } =
    useLoanRecovery({ location });

  const tableStructure = useMemo(() => {
    return [
      {
        key: "no",
        label: "SR. NO.",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.squareDiv}>{all?.SR_No}</div>
        ),
      },
      {
        key: "amount",
        label: "LOAN AMOUNT",
        sortable: false,
        render: (value, all) => <div>{all.amountRemaining && `₹ ${all.amountRemaining}` }</div>,
      },
      {
        key: "emi",
        label: "EMI",
        sortable: false,
        render: (value, all) => <div>{all.EMI && `₹ ${all.EMI}` }</div>,
      },
      {
        key: "interest",
        label: "INTEREST",
        sortable: false,
        render: (value, all) => <div>{all.Interest && `${all.Interest} %` }</div>,
      },
      {
        key: "principal",
        label: "PRINCIPAL",
        sortable: false,
        render: (value, all) => <div>{all.Principal && `₹ ${all.Principal}` }</div>,
      },
      {
        key: "out",
        label: "OUTSTATION",
        sortable: false,
        render: (value, all) => <div>{all.Outstation && `₹ ${all.Outstation}` }</div>,
      },
      {
        key: "date",
        label: "DATE",
        sortable: false,
        render: (value, all) => <div>{all.loanSubmissionDate}</div>,
      },
    ];
  }, []);
  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...constants.DATATABLE_PROPERTIES,
      hidePagination: true,
      columns: tableStructure,
      data: loanData?.loanEmi ? loanData?.loanEmi : [],
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    loanData?.loanEmi,
  ]);
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
                    ₹ {loanData?.total?.totalRepaybleAmmount && 
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
                    {loanData?.interest && `${loanData?.interest} %`}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Tenure of Loan:</span>
                    {loanData?.totalTenureYear &&
                      `${loanData?.totalTenureYear.toFixed(2)} yr`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headWrap}>
            <div className={styles.heading}>Loan EMI</div>
          </div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Loan Amount:</span>
                    {loanData?.total_applied_loan && `₹ ${loanData?.total_applied_loan}`}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Rate of Interest:</span>

                    {loanData?.interest && `${loanData?.interest} %`}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Months:</span>
                    {loanData?.totalTenureMounth}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Loan A/C-:</span>
                    {/* {loanData?.loanType} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.TableWrapper}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </div>
    </div>
  );
}

export default LoanRecovery;
