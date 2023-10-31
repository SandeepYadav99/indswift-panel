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
import useFullFinal from "./FullFinal.hook";
import StatusPill from "../../components/Status/StatusPill.component";
import OnBoardDialog from "../EmployeeList/components/OnBoardPopUp/OnBoardDialog.view";
import TraineeDialog from "../EmployeeList/components/TraineePopUp copy/TraineeDialog.view";
import { InfoOutlined } from "@material-ui/icons";

const FullFinal = ({}) => {
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
  } = useFullFinal({});

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
        key: "employee",
        label: "EMPLOYEE",
        sortable: true,
        render: (value, all) => <div>{removeUnderScore(all?.type)}</div>,
      },
      {
        key: "grades",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.contact}
            <br />
            {`${all?.startDateText} - ${all?.endDateText}`}
          </div>
        ),
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "dept",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.contact}
            <br />
            {`${all?.startDateText} - ${all?.endDateText}`}
          </div>
        ),
      },
      {
        key: "contact",
        label: "CONTACT",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "employee-status",
        label: "EMPLOYEE STATUS",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "f&f status",
        label: "F&F STATUS",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "action",
        label: "ACTION",
        sortable: false,
        render: (temp, all) => (
          <a
            href="javascript:void(0);"
            target="_blank"
          >
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
          </a>
        ),
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
      data: data?.data ? [] : [],
      count: data?.data?.length ? [] : [],
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
            <span className={styles.title}>Full & Final Form List</span>
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

export default FullFinal;
