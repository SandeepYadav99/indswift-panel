import React from "react";
import classNames from "classnames";
import { Button, ButtonBase, IconButton } from "@material-ui/core";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../../Datatables/Datatable.table";
import Constants from "../../../../../config/constants";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import { useMemo } from "react";
import { useCallback } from "react";
import useUSCHook from "./USCHook";
import { Edit } from "@material-ui/icons";
import ConfirmationDialog from "../../../../EmployeeEdit/components/ConfirmationDialog/ConfirmationDialogDialog.view";

function USCView() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    UscData,
    handleViewUpdate,
    isUpdateDialog,
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    toggleStatusDialog,
  } = useUSCHook({});

  const tableStructure = useMemo(() => {
    return [
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "basic",
        label: "BASIC SALARY",
        sortable: false,
        render: (value, all) => <div>{all?.basic_salary}</div>,
      },
      {
        key: "annual",
        label: "ANNUAL BONUS",
        sortable: false,
        render: (value, all) => <div>{all?.annual_bonus}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.btnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewUpdate(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
            <div className={styles.rightFlex}>
              <ButtonBase
                className={styles.download}
                onClick={() => {
                  toggleStatusDialog(all);
                }}
              >
                Run Script
              </ButtonBase>
            </div>
          </div>
        ),
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
      data: UscData,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    UscData,
  ]);
  return (
    <div className={styles.EmployeeCircularWrapper}>
      <ConfirmationDialog
        isOpen={isUpdateDialog}
        handleToggle={toggleStatusDialog}
        form={form}
        errorData={errorData}
        changeTextData={changeTextData}
        onBlurHandler={onBlurHandler}
        handleSubmit={handleSubmit}
      />
      <PageBox>
        <div className={styles.headerContainer}>
          <span className={styles.title}>Universal Salary Calculator</span>
          <div className={styles.newLine} />
        </div>

        <div style={{ width: "100%", marginTop: "40px" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </PageBox>
    </div>
  );
}

export default USCView;
