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
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import CreateView from "./ImprestApproval.view";
import StatusPill from "../../../components/Status/StatusPill.component";
import useImprestApproval from "./ImprestApprovalHook";
import { Edit, InfoOutlined } from "@material-ui/icons";

const ImprestApproval = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    configFilter,
    warehouses,
    handleCsvDownload,
  } = useImprestApproval({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.imprestApproval);

  const { user } = useSelector((state) => state.auth);
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}><strong>{obj?.employee?.name}</strong></span>{" "}
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
        key: "id",
        label: "IMP ID",
        sortable: false,
        render: (temp, all) => <div>{all?.imprest?.code}</div>,
      },
      {
        key: "name",
        label: "EMPLOYEE",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.contact}
            <br />
            {`${all?.employee?.grade?.code}/${all?.employee?.cadre?.code}`}
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
        key: "type",
        label: "TYPE",
        sortable: false,
        render: (temp, all) => <div>{all?.imprest?.imprestTypeText}</div>,
      },
      {
        key: "tap",
        label: "ASSOCIATED TAP",
        sortable: false,
        render: (temp, all) => <div>{all?.imprest?.travelPlanner?.code} <br/>{all?.imprest?.travelPlanner?.status}</div>,
      },
      {
        key: "date",
        label: "DATE",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.imprest?.createdAtText}</div>
        ),
      },
      {
        key: "imprest",
        label: "IMPREST AMOUNT",
        sortable: false,
        render: (temp, all) => (
          <div style={{ whiteSpace: "nowrap" }}>
             {all?.imprest?.amount}
          </div>
        ),
      },
      {
        key: "balance",
        label: "IMPREST STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>{<StatusPill status={all?.imprest?.status} />}</div>
        ),
      },

      {
        key: "issue",
        label: "ISSUE DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.imprest?.issueDateText}</div>,
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
            <span className={styles.title}>Imprest Approval Requests</span>
            <div className={styles.newLine} />
          </div>
          {/* <div className={styles.rightFlex}>
            <ButtonBase className={styles.download} onClick={handleCsvDownload}>
              DOWNLOAD
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

export default ImprestApproval;
