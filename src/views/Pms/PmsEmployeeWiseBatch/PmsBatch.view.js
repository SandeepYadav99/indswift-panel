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
import usePmsBatch from "./PmsBatch.hook";

const PmsBatch = ({ location }) => {
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
      pmsSiteId,
      hodBatchId,
      overallHodBatchId
  } = usePmsBatch({location});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.pmsBatch);

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
            <span className={styles.productName}>{obj?.name}</span>{" "}
            <br />
            <span className={styles.productName}>
              {obj?.emp_code}
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const formType = useCallback((data) => {
    if (pmsSiteId) {
      return 'Type 5';
    } else if (hodBatchId) {
      return 'HOD';
    } else if (overallHodBatchId) {
      return 'Overall HOD';
    } else {
     return removeUnderScore(data?.pms_form_type);
    }
  }, [pmsSiteId, hodBatchId, overallHodBatchId]);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "EMPLOYEE",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade",
        label: "GRADE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.grade?.code}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.location.name}</div>,
      },
      {
        key: "desigination",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.department?.name} / {all?.department?.name}
          </div>
        ),
      },
      {
        key: "reviewer",
        label: "REVIEWER",
        sortable: false,
        render: (temp, all) => <div>{all?.pms?.name} <br/>
          {all?.pms?.code}</div>,
      },
      {
        key: "hod",
        label: "HOD",
        sortable: false,
        render: (temp, all) => <div>{all?.hod?.hod_name} <br/>
          {all?.hod?.hod_code}</div>,
      },
      {
        key: "doj",
        label: "DOJ",
        sortable: false,
        render: (temp, all) => <div>{all?.dojText}</div>,
      },
      {
        key: "batch",
        label: "BATCH",
        sortable: false,
        render: (temp, all) => <div>{all?.pms_batch}</div>,
      },
      {
        key: "pms_form_type",
        label: "TYPE",
        sortable: false,
        render: (temp, all) => <div style={{whiteSpace:'nowrap'}}>
          {formType(all)}
        </div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => (
          <div>
            {renderStatus(removeUnderScore(all?.pms_status))}
          </div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
          </div>
        ),
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
            <span className={styles.title}>PMS Planner</span>
            <div className={styles.newLine} />
          </div>
          <div>
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

export default PmsBatch;
