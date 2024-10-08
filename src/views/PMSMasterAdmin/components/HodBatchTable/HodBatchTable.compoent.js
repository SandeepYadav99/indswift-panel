import React, { useCallback, useMemo } from "react";
import styles from "./Style.module.css";
import Constants from "../../../../config/constants";
import Datatables from "../../../../components/Datatables/datatables";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import useHodBatchTable from "./HodBatchTableHook";

function HodBatchTable({ Renderdata, getPmsList,currentBatch }) {
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
    isFrezzing,
    isLoading
  } = useHodBatchTable({ Renderdata, getPmsList });

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
        render: (temp, all) => <div>{all?.hod_batch?.startDateText}</div>,
      },
      {
        key: "end",
        label: "end date",
        sortable: false,
        render: (temp, all) => <div>{all?.hod_batch?.endDateText}</div>,
      },
      {
        key: "freezed_on",
        label: "FREEZED ON",
        sortable: false,
        render: (temp, all) => (
          <div> {all?.hod_batch?.freezedAtText ? all?.hod_batch?.freezedAtText : "-"}</div>
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
        minDate={new Date()}
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
        minDate={new Date()}
        label={"End Date"}
        onChange={(date) => {
          setEndDate(date);
        }}
        value={endDate}
      />
    );
  }, [endDate, setEndDate]);
  const isFreeze = useMemo(()=>{
    if(Renderdata?.length > 0){
      return Renderdata[0]?.hod_batch?.is_created
    }
    return false
  },[Renderdata])
  return (
    <div className={styles.plainPaper}>
      <div className={styles.headerContainer}>
        <div>
          <span className={styles.title}>HOD Batch - {currentBatch}</span>
          {/* <div className={styles.newLine} /> */}
        </div>
      </div>
      <div className={styles.decs}>
        Please choose the start date (email will be sent) and end date (review
        submission last date) by reviewers.
      </div>
      <div className={styles.subDes}>
        Note: Once batch is created, reviewers for employees cannot be changed.
      </div>
      <div className={styles.yearFlex}>
        <div className={styles.UpperWrap}>
          <div className={styles.down}>{renderStartDate}</div>
          <div className={styles.down}>{renderEndDate}</div>
        </div>
        <div className={styles.btnWrap}>
          <ButtonBase onClick={handleCreateBatch} className={"createBtn"} disabled={isLoading}>
          {isLoading ? <CircularProgress color="success" size="20px" /> :"CREATE BATCH"}
          </ButtonBase>
          <ButtonBase
           onClick={handleFreeze}
          disabled={!isFreeze || isFrezzing}
            className={isFreeze ? styles.freeze : styles.disabledBtn}>
           {isFrezzing ? <CircularProgress color="success" size="20px" /> :"Freeze"}
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

export default HodBatchTable;
