import React, { useCallback, useMemo } from "react";
import styles from "./Style.module.css";
import useVacancyList from "./PerformanceTableHook";
import Constants from "../../../../config/constants";
import Datatables from "../../../../components/Datatables/datatables";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";

function PerformanceTable({ Renderdata, getPmsList }) {
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
    year,
    type,
    setType,
    setYear,
    handleCreateBatch,
    isLoading
  } = useVacancyList({ Renderdata, getPmsList });

  const tableStructure = useMemo(() => {
    return [
      {
        key: "last_batch",
        label: "LAST BATCH",
        sortable: false,
        render: (temp, all) => <div>{all?.batch}</div>,
      },
      {
        key: "year",
        label: "FINANCIAL YEAR",
        sortable: false,
        render: (temp, all) => <div>{all?.year}</div>,
      },
      {
        key: "appliedDateText",
        label: "Date Added",
        sortable: false,
        render: (temp, all) => <div> {all?.createdAtText}</div>,
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

  const renderDropDown = useMemo(() => {
    return (
      <CustomSelectField
        label={"Batch"}
        value={type}
        handleChange={(value) => {
          setType(value);
        }}
      >
        <MenuItem value={"APMS"}>APMS</MenuItem>
        <MenuItem value={"DTY"}>DTY</MenuItem>
      </CustomSelectField>
    );
  }, [type, setType]);

  const renderYear = useMemo(() => {
    return (
      <CustomSelectField
        label={"Year"}
        value={year}
        handleChange={(value) => {
          setYear(value);
        }}
      >
        {/* <MenuItem value={"2023"}>2023</MenuItem> */}
        <MenuItem value={"2024"}>2024</MenuItem>
      </CustomSelectField>
    );
  }, [year]);
  const checkBatch = useMemo(()=>{
    return Renderdata?.length > 0 ? Renderdata[0]?.is_closed : true;
  },[Renderdata]);
  
  return (
    <div className={styles.plainPaper}>
      <div className={styles.headerContainer}>
        <div>
          <span className={styles.title}>PMS Master</span>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.decs}>
        To create a new batch for the new performance review cycle.
      </div>
      <div className={styles.yearFlex}>
        <div className={styles.UpperWrap}>
          <div className={styles.down}>{renderYear}</div>
          <div className={styles.down}>{renderDropDown}</div>
        </div>
        <div>
          {
            checkBatch && <ButtonBase onClick={handleCreateBatch} disabled ={isLoading} className={"createBtn"}>
            {isLoading ? <CircularProgress color="success" size="20px" /> :"CREATE BATCH"}
          </ButtonBase>
          }
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

export default PerformanceTable;
