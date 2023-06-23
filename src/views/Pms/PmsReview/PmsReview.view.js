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
import usePmsReview from "./PmsReview.hook";
import BottomPanelComponent from "../../../components/BottomBar/BottomBar.component";
import BottomActionView from "./components/BottomAction/BottomAction.view";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import UpdateDialog from "./components/UpdateDialog/UpdateDialog.view";
import NoramlizeDialog from "./components/NoramlizePopUp/NoramlizeDialog.view";
const PmsReview = ({}) => {
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
    handleCheckbox,
    selected,
    isSending,
    handleSend,
    handleViewFormDetails,
    selectedEmps,
    toggleStatusDialog,
    approveDialog,
    toggleNormalizwDialog,
        normalizeDialog
  } = usePmsReview({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.pmsReview);

  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback(
    (obj) => {
      if (obj) {
        const selectedIndex = selected.findIndex((sel) => sel.id === obj.id);
        return (
          <div className={styles.firstCellFlex}>
            <div className={styles.flex}>
              <Checkbox
                disabled={
                  obj?.status !== Constants.PMS_BATCH_STATUS.PENDING ||
                  obj?.reviewer.status !== Constants.GENERAL_STATUS.ACTIVE
                }
                onChange={() => {
                  handleCheckbox(obj);
                }}
                checked={selectedIndex >= 0}
                value="secondary"
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
            <div className={classNames(styles.firstCellInfo, "openSans")}>
              <span className={styles.productName}>{obj?.reviewer?.name}</span>{" "}
              <br />
              <span className={styles.productName}>
                {obj?.reviewer?.emp_code}
              </span>{" "}
              <br />
            </div>
          </div>
        );
      }
      return null;
    },
    [selected, handleCheckbox]
  );

  const tableStructure = useMemo(() => {
    return [
      {
        key: "reviewer",
        label: "REVIEWER",
        sortable: false,
        render: (temp, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "name",
        label: "Reviewer Status",
        sortable: false,
        render: (value, all) => (
          <div>
            <StatusPill status={all?.reviewer?.status} />
          </div>
        ),
      },
      {
        key: "grade",
        label: "GRADE",
        sortable: false,
        render: (temp, all) => <div>{all?.reviewer?.grade?.code}</div>,
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.reviewer?.location?.name}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.reviewer?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.reviewer?.department?.name} /{" "}
            {all?.reviewer?.department?.name}
          </div>
        ),
      },

      {
        key: "total_employees",
        label: "No Of Reviews",
        sortable: true,
        render: (temp, all) => <div>{all?.total_employees}</div>,
      },
      {
        key: "hod",
        label: "HOD",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.reviewer?.hod?.hod_name} <br />
            {all?.reviewer?.hod?.hod_code}
          </div>
        ),
      },
      {
        key: "batch",
        label: "BATCH",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.batch} <br />
            <div style={{ whiteSpace: "nowrap" }}>
              {removeUnderScore(all?.form_type)}
            </div>
          </div>
        ),
      },

      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.status))}</div>
        ),
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
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            {all?.status === "REVIEW_SUBMITTED" && (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleViewFormDetails(all);
                }}
              >
                <RemoveRedEyeOutlinedIcon fontSize={"small"} />
              </IconButton>
            )}
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDetails,
    handleEdit,
    handleViewFormDetails,
    isCalling,
  ]);

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
          <div className={styles.btnWrapper}>
            {/* <ButtonBase
              // aria-owns={downloadCL ? "downloadCL" : undefined}
              aria-haspopup="true"
              onClick={toggleStatusDialog}
              className={"createBtn"}
            >
              Update Batches
            </ButtonBase> */}
            {/*<ButtonBase*/}
            {/*  // aria-owns={downloadCL ? "downloadCL" : undefined}*/}
            {/*  aria-haspopup="true"*/}
            {/*  onClick={toggleNormalizwDialog}*/}
            {/*  className={"createBtn"}*/}
            {/*>*/}
            {/*  RUN NORMALIZATION*/}
            {/*</ButtonBase>*/}
          </div>
        </div>
        <NoramlizeDialog
          isOpen={normalizeDialog}
          handleToggle={toggleNormalizwDialog}
        />
        <UpdateDialog
          handleSubmit={handleCsvDownload}
          isOpen={approveDialog}
          handleToggle={toggleStatusDialog}
        />
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
      <BottomPanelComponent open={selected?.length > 0}>
        <BottomActionView
          reviewers={selected.length}
          employees={selectedEmps}
          handleSend={handleSend}
          isSubmitting={isSending}
        />
      </BottomPanelComponent>
    </div>
  );
};

export default PmsReview;
