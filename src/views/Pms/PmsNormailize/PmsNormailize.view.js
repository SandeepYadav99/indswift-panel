import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Paper,
  Checkbox,
  IconButton,
  MenuItem,
  ButtonBase,
  Menu,
} from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import {
  Add,
  CloudDownload,
  InfoOutlined,
  PrintOutlined,
} from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import usePmsNormailize from "./PmsNormailize.hook";

const PmsNormailize = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isCalling,
    configFilter,
    warehouses,
    handleCsvDownload,
  } = usePmsNormailize({location});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.PmsNormalize);

  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.employee?.name}</span>{" "}
            <br />
            <span className={styles.productName}>
              {obj?.employee?.emp_code}
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);


  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "EMPLOYEE NAME",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.grade?.code}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.location?.name}</div>,
      },
      {
        key: "desigination",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.department?.name} / {all?.employee?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "hod",
        label: "HOD",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.hod?.hod_name} <br/>
          {all?.hod?.hod_code}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.status)}</div>,
      },
      {
        key: "batch",
        label: "BATCH",
        sortable: false,
        render: (temp, all) => <div>{all?.batch}</div>,
      },
      {
        key: "review",
        label: "REVIEWER RATING",
        sortable: false,
        render: (temp, all) => <div style={{whiteSpace:'nowrap'}}>{all?.reviewer_rating}</div>,
      },
      {
        key: "normalize",
        label: "NORMALIZED RATING",
        sortable: false,
        render: (temp, all) => <div>{all?.normalized_rating}</div>,
      },
      {
        key: "rating",
        label: "HOD RATING",
        sortable: false,
        render: (temp, all) => <div>{all?.final_rating}</div>,
      },
      {
        key: "is_recommended",
        label: "HOD Recommended",
        sortable: false,
        render: (temp, all) => <div>{all?.is_recommended}</div>,
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      // onRowSelection: this.handleRowSelection,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: allData.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Normalized Employee Records</span>
            <div className={styles.newLine} />
          </div>
          {/* <div>
            <ButtonBase
              // aria-owns={downloadCL ? "downloadCL" : undefined}
              aria-haspopup="true"
              onClick={handleCsvDownload}
              className={"createBtn"}
            >
              Download
              <CloudDownload
                fontSize={"small"}
                className={"plusIcon"}
              ></CloudDownload>
            </ButtonBase>

          </div> */}
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBox>

    </div>
  );
};

export default PmsNormailize;
