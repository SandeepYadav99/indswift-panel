import React, { useCallback, useMemo } from "react";
import styles from "./Style.module.css";
import Constants from "../../../../config/constants";
import Datatables from "../../../../components/Datatables/datatables";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import NormalizeDialog from "../NormalizeDialog/NormalizeDialog.view";
import useCloseTable from "./CloseTableHook";

function CloseTable({ Renderdata, getPmsList, normalizeType, placeholder,currentBatch }) {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    isCalling,
    data,
    currentData,
    toggleNormalize,
    normalize,
    handleCloseBatch,
    isLoading
  } = useCloseTable({ Renderdata, getPmsList });

  const tableStructure = useMemo(() => {
    return [
      {
        key: "last_batch",
        label: "LAST CLOSED BATCH",
        sortable: false,
        render: (temp, all) => <div>{all?.batch}</div>,
      },
      {
        key: "date",
        label: "Date",
        sortable: false,
        render: (temp, all) => <div> {all?.closedAtText ? all?.closedAtText : "-"}</div>,
      },
    ];
  }, [isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: currentData,
      count: data.length,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
      hidePagination: true,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
  ]);

  return (
    <div className={styles.plainPaper}>
      {/* <NormalizeDialog
        isOpen={normalize}
        handleToggle={toggleNormalize}
        normalizeType={normalizeType}
        getPmsList={getPmsList}
      /> */}
      <div className={styles.headerContainer}>
        <div>
          <span className={styles.title}>Conclude PMS Cycle - {currentBatch}</span>
          {/* <div className={styles.newLine} /> */}
        </div>
      </div>
      <div className={styles.yearFlex}>
        <div className={styles.btnWrap}>
          <ButtonBase onClick={handleCloseBatch} className={"createBtn"} disabled={isLoading}>
          {isLoading ? <CircularProgress color="success" size="20px" /> :"MARK BATCH CLOSE"}
          </ButtonBase>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Datatables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </div>
  );
}

export default CloseTable;
