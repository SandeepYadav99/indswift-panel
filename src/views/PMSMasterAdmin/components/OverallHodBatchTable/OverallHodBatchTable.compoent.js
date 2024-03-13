import React, { useCallback, useMemo } from "react";
import styles from "./Style.module.css";
import Constants from "../../../../config/constants";
import Datatables from "../../../../components/Datatables/datatables";
import { ButtonBase, MenuItem } from "@material-ui/core";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import useOverallHodBatchTable from "./OverallHodBatchTableHook";

function OverallHodBatchTable({ Renderdata, getPmsList }) {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    data,
    currentData,
    currentPage,
    endDate,
    startDate,
    setStartDate,
    setEndDate,
    handleCreateBatch,
    handleFreeze,
  } = useOverallHodBatchTable({ Renderdata, getPmsList });

  const tableStructure = useMemo(() => {
    return [
      {
        key: "last_batch",
        label: "LAST BATCH",
        sortable: false,
        render: (temp, all) => <div>{all?.batch}</div>,
      },
      {
        key: "start",
        label: "start date",
        sortable: false,
        render: (temp, all) => <div>{all?.reviewer_batch?.start_date}</div>,
      },
      {
        key: "end",
        label: "end date",
        sortable: false,
        render: (temp, all) => <div>{all?.reviewer_batch?.end_date}</div>,
      },
      {
        key: "freezed_on",
        label: "FREEZED ON",
        sortable: false,
        render: (temp, all) => (
          <div> {all?.freezed_at ? all?.freezed_at : "-"}</div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling]);

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
      page: currentPage - 1,
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
    currentPage,
    data,
  ]); // allData, data, currentPage

  const renderStartDate = useMemo(() => {
    return (
      <CustomDatePicker
        clearable
        label={"Start Date"}
        onChange={(date) => {
          setStartDate(date);
        }}
        value={startDate}
      />
    );
  }, [startDate, setStartDate]);

  const renderEndDate = useMemo(() => {
    return (
      <CustomDatePicker
        clearable
        label={"End Date"}
        onChange={(date) => {
          setEndDate(date);
        }}
        value={endDate}
      />
    );
  }, [endDate, setEndDate]);
  return (
    <div className={styles.plainPaper}>
      <div className={styles.headerContainer}>
        <div>
          <span className={styles.title}>Overall HOD Batch - APMS</span>
          {/* <div className={styles.newLine} /> */}
        </div>
      </div>
      <div className={styles.yearFlex}>
        <div className={styles.UpperWrap}>
          <div className={styles.down}>{renderStartDate}</div>
          <div className={styles.down}>{renderEndDate}</div>
        </div>
        <div className={styles.btnWrap}>
          <ButtonBase onClick={handleCreateBatch} className={"createBtn"}>
            CREATE BATCH
          </ButtonBase>
          <ButtonBase onClick={handleFreeze} className={styles.freeze}>
            Freeze
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

export default OverallHodBatchTable;
