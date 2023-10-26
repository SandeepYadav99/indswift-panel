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
import { useSelector } from "react-redux";

import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Styled.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import usePendingLeaveApplication from "./PendingLeaveApplication.hook";
import StatusPill from "../../components/Status/StatusPill.component";
import OnBoardDialog from "../EmployeeList/components/OnBoardPopUp/OnBoardDialog.view";
import TraineeDialog from "../EmployeeList/components/TraineePopUp copy/TraineeDialog.view";

const PendingLeaveApplication = () => {
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
    isSidePanel,
    isCalling,
    configFilter,
    handleLeaveApplicationForm,
    isExtendDialog,
    toggleExtendDialog,
    isTraineeDialog,
    toggleTraineeDialog,
    listData,
  } = usePendingLeaveApplication({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.LeaveModule);

  const { user } = useSelector((state) => state.auth);
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };

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
        key: "type",
        label: "EMPLOYEE",
        sortable: true,
        render: (value, all) => <div></div>,
      },
      {
        key: "date",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "status",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "appliedon",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "attachments",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.document && <div className={styles.key}></div>}</div>
        ),
      },
      {
        key: "type",
        label: "CONTACT",
        sortable: true,
        render: (value, all) => <div> </div>,
      },
      {
        key: "date",
        label: "LEAVE TYPE",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "status",
        label: "CURRENT STATUS/ OVERALL STATUS",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "appliedon",
        label: "LEAVE DATES",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "attachments",
        label: "APPLIED ON",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
      {
        key: "attachments",
        label: "ACTION",
        sortable: false,
        render: (temp, all) => <div></div>,
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling]);

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
      data: data?.data ? data?.data : [],
      count: data?.data?.length ? data?.data?.length : 0,
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
            <span className={styles.title}>Pending Leave Applications</span>
            <div className={styles.newLine} />
          </div>
        </div>
        <OnBoardDialog
          listData={listData}
          // candidateId={id}
          isOpen={isExtendDialog}
          handleToggle={toggleExtendDialog}
        />
        <TraineeDialog
          listData={listData}
          isOpen={isTraineeDialog}
          handleToggle={toggleTraineeDialog}
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
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={"New Candidate"}
        open={isSidePanel}
        side={"right"}
      ></SidePanelComponent>
    </div>
  );
};

export default PendingLeaveApplication;
