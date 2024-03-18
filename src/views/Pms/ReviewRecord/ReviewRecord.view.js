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
import useReviewRecord from "./ReviewRecord.hook";
import RolesUtils from "../../../libs/Roles.utils";

const ReviewRecord = ({ location }) => {
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
    handleViewGraph,
    role,
      handleCsvDownload
  } = useReviewRecord({ location });

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
        render: (temp, all) => <div>{all?.employee?.grade?.code}</div>,
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
            {all?.employee?.department?.name} /{" "}
            {all?.employee?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "hod",
        label: "HOD",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.hod?.hod_name} <br />
            {all?.hod?.hod_code}
          </div>
        ),
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.status))}</div>
        ),
      },
      {
        key: "batch",
        label: "BATCH",
        sortable: false,
        render: (temp, all) => <div>{all?.batch}</div>,
      },
      {
        key: "overall_hod_rating",
        label: "Overall HOD RATING",
        sortable: true,
        render: (temp, all) => <div>{all?.overall_hod_rating}</div>,
      },
      {
        key: "overall_hod_is_recommended",
        label: "Overall HOD Recommended",
        sortable: false,
        render: (temp, all) => <div>{all?.overall_hod_is_recommended}</div>,
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

  const isCorporateHr = useMemo(() => {
    return RolesUtils.canAccess([Constants.ROLES.CORPORATE_HR], role);
  }, [role]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Review Increment Records</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            { isCorporateHr  && <ButtonBase onClick={handleCsvDownload} className={"createBtn"}>
              Download
              <CloudDownload
                  fontSize={"small"}
                  className={"plusIcon"}
              ></CloudDownload>
            </ButtonBase>}
            &nbsp; &nbsp; &nbsp;
         { isCorporateHr &&  <ButtonBase
            className={styles.edit}
            onClick={() => {
              handleViewGraph();
            }}
          >
            VIEW GRAPH
          </ButtonBase>}


        </div>
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

export default ReviewRecord;
