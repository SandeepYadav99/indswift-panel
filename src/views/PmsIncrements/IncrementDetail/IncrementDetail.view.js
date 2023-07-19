import React, { useMemo } from "react";
import styles from "./Style.module.css";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import useIncrementDetail from "./IncrementDetail.hook";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import SlabTable from "./component/SlabTable/SlabTable.view";
import { useEffect } from "react";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import SlabGraph from "./component/SlabGraph.view";

function IncrementDetail({location}) {
  const {
    handlePageChange,
    handleRowSize,
    handleSortOrderChange,
    isCalling,
    currentData,
    data,
    currentPage,
    listType,
    listData,
    type,
    setType,
    initialApiCall,

    setListType,
  } = useIncrementDetail({location});

  const tableStructure = useMemo(() => {
    return [
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.department}</div>
        ),
      },
      {
        key: "count",
        label: "EMPLOYEE Count",
        sortable: false,
        render: (temp, all) => <div className={styles.noWrap}>{all?.name}</div>,
      },

      {
        key: "final",
        label: "FINAL RATING BY HOD",
        sortable: false,
        render: (temp, all) => <div className={styles.noWrap}>{all?.type}</div>,
      },

      {
        key: "current",
        label: "CURRENT SALARY (TOTAL SALARY)",
        sortable: false,
        render: (temp, all) => <div className={styles.noWrap}>{all?.type}</div>,
      },
      {
        key: "increment",
        label: "INCREMENT SALARY",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>
            {<input className={styles.InputWrap} value={all?.name} />}
          </div>
        ),
      },

      {
        key: "difference",
        label: "SALARY DIFFERENCE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.noWrap}>{all?.reviewer?.name}</div>
        ),
      },
      {
        key: "% AVG INCREMENT",
        label: "avg",
        sortable: false,
        render: (temp, all) => <div className={styles.noWrap}>{all?.type}</div>,
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
      count: data?.length,
      page: currentPage - 1,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);
  useEffect(() => {
    if (type) {
      setListType("");
    }
  }, [type]);

  const renderDropDown = useMemo(() => {
    return (
      <CustomSelectField
        label={"Filter By"}
        value={type}
        handleChange={(value) => {
          setType(value);
        }}
      >
        <MenuItem value={"LOCATION"}>LOCATION</MenuItem>
        <MenuItem value={"DEPARTMENT"}>DEPARTMENT</MenuItem>
      </CustomSelectField>
    );
  }, [type, setType]);

  const renderLocation = useMemo(() => {
    return (
      <CustomAutoComplete
        autoCompleteProps={{
          freeSolo: false,
          getOptionLabel: (option) => option?.label,
        }}
        dataset={listData?.LOCATIONS}
        datasetKey={"label"}
        onTextChange={(text) => {
          setListType(text);
        }}
        variant={"outlined"}
        label={"Select Location"}
        value={listType}
      />
    );
  }, [listType, listData, type]);

  const renderDepartment = useMemo(() => {
    return (
      <CustomAutoComplete
        autoCompleteProps={{
          freeSolo: false,
          getOptionLabel: (option) => option?.label,
        }}
        dataset={listData?.DEPARTMENTS}
        datasetKey={"label"}
        onTextChange={(text) => {
          setListType(text);
        }}
        variant={"outlined"}
        label={"Select Department"}
        value={listType}
      />
    );
  }, [listType, listData, type]);

  return (
    <div className={styles.incrementWrappper}>
      <div className={styles.plainPaper}>
        <div className={styles.upperWrap}>
          <div style={{ marginBottom: "20px" }}>
            <ButtonBase onClick={() => history.goBack()}>
              <ArrowBackIosIcon fontSize={"small"} />{" "}
              <span className={"capitalize"}>
                <b>Increment Planner Details</b>
                <div className={styles.newLine} />
              </span>
            </ButtonBase>
          </div>
          <div className={styles.rightFlex}>
            <ButtonBase
              className={styles.download}
              //  onClick={handleDownload}
            >
              DOWNLOAD
            </ButtonBase>
          </div>
        </div>
        <div className={styles.yearFlex}>
          <div className={styles.down}>{renderDropDown}</div>
          {type && (
            <div className={styles.down}>
              {type === "LOCATION" ? renderLocation : renderDepartment}
            </div>
          )}
          <div className={styles.rightFlex}>
            <ButtonBase
              className={styles.downloadrun}
              // onClick={() => initialApiCall()}
            >
              Update
            </ButtonBase>
          </div>
        </div>
        <div>
          <div style={{ width: "100%", marginTop: "20px" }}>
            <DataTables
              {...tableData.datatable}
              {...tableData.datatableFunctions}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div>
          <span className={"capitalize"}>
            <b>Increment Planner Garph</b>
            <div className={styles.newLine} />
          </span>
        </div>
        <div  className={styles.TableWrap}>
          <SlabTable title={"Slab"} />
          {/* <SlabGraph/> */}
        </div>
      </div>
    </div>
  );
}

export default IncrementDetail;
