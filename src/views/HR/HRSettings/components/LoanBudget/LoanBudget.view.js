import React from "react";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../../Datatables/Datatable.table";
import Constants from "../../../../../config/constants";
import { useMemo } from "react";
import LoanBudgetHook from "./LoanBudget.hook";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import { ButtonBase } from "@material-ui/core";

function LoanBudget() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    employeeCircularData,
    currentYear,
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    errorData,
    data,
  } = LoanBudgetHook({});

  const tableStructure = useMemo(() => {
    return [
      {
        key: "year",
        label: "FY YEAR",
        sortable: false,
        render: (temp, all) => <div>{all?.fy_year}</div>,
      },
      {
        key: "budget",
        label: "LOAN BUDGET AMOUNT",
        sortable: false,
        render: (value, all) => <div>{all?.budget}</div>,
      },
      {
        key: "allocated",
        label: "ALLOCATED AMOUNT",
        sortable: false,
        render: (value, all) => <div>{all?.allocated}</div>,
      },
      {
        key: "inprocess",
        label: "INPROCESS AMOUNT",
        sortable: false,
        render: (value, all) => <div>{all?.progress}</div>,
      },
      {
        key: "remaining",
        label: "REMAINING AMOUNT",
        sortable: false,
        render: (value, all) => <div>{all?.remaining}</div>,
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling]);
  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
      hidePagination: true,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: employeeCircularData,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    employeeCircularData,
  ]);
  return (
    <div className={styles.EmployeeCircularWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.title}>Loan Budget</div>
        <div className={styles.formWrap}>
          <div className={styles.title}>Current Financial Year:</div>
          <div className={styles.year}>{`${
            currentYear
          } - ${currentYear + 1}`}</div>
          <div className={styles.formInner}>
            <div className={styles.amountWrap}>
              <CustomTextField
                disabled={data?.budget ? true : false}
                type="number"
                isError={errorData?.budget}
                errorText={errorData?.budget}
                label={"Loan Budget Amount"}
                value={data?.budget ? data?.budget : form?.budget}
                onTextChange={(text) => {
                  changeTextData(text, "budget");
                }}
                onBlur={() => {
                  onBlurHandler("budget");
                }}
              />
            </div>
            {data?.budget ? (
              <div className={styles.fieldWrapp}>
                <div className={styles.amountWrapper}>
                  Allocated Amount:
                  <span className={styles.year}>{data?.allocated}</span>
                </div>
                <div className={styles.amountWrapper}>
                  InProcess Amount:
                  <span className={styles.year}>{data?.progress}</span>
                </div>
                <div className={styles.amountWrapper}>
                  Remaining Amount:
                  <span className={styles.year}>{data?.remaining}</span>
                </div>
              </div>
            ) : (
              <div className={styles.btnWrap}>
                <ButtonBase
                  disabled={isSubmitting}
                  aria-haspopup="true"
                  onClick={handleSubmit}
                  className={"createBtn"}
                >
                  Freeze
                </ButtonBase>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <DataTables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </div>
  );
}

export default LoanBudget;
