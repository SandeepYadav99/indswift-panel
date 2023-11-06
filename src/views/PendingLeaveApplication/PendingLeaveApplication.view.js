import React, { useCallback, useMemo } from "react";

import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

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
import { IconButton } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  actionLeaveList,
  actionLeavesListData,
} from "../../actions/LeaveModule.action";

const PendingLeaveApplication = () => {
  const dispatch = useDispatch();
  const {
    handleSortOrderChange,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    isSidePanel,
    isCalling,
    configFilter,
    isExtendDialog,
    toggleExtendDialog,
    isTraineeDialog,
    toggleTraineeDialog,
    listData,
  } = usePendingLeaveApplication({});

  let LeaveParameters = {
    index: 1,
    row: "createdAt",
    order: "desc",
    query: "",
    query_data: null,
  };

  useEffect(() => {
    dispatch(actionLeavesListData(LeaveParameters));
    dispatch(actionLeaveList(LeaveParameters));
  }, []);

  const {
    list,
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.LeaveModule);

  useEffect(() => {
    if (!list?.data) {
    }
  }, [list?.data]);

  const transformData = (data) => {
    return data === "PATERNITY_LEAVE"
      ? "PATERNITY LEAVE"
      : data === "OCCASION_LEAVE"
      ? "OCCASION LEAVE"
      : data === "FACILITATION_LEAVE"
      ? "FACILITATION LEAVE"
      : "BEREAVEMENT LEAVE";
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
        render: (value, all) => <div>{all?.leave?.employee?.name}</div>,
      },
      {
        key: "grade_cadre",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.leave?.employee?.grade?.code}/
            {all?.leave?.employee?.cadre?.name}
          </div>
        ),
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.leave?.employee?.location?.name}</div>
        ),
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.leave?.employee?.designation?.name}</div>
        ),
      },
      {
        key: "dept_sub_dept",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.leave?.employee?.department?.name}/
            {all?.leave?.employee?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "contact",
        label: "CONTACT",
        sortable: true,
        render: (value, all) => (
          <div>
            {" "}
            {all?.leave?.employee?.contact?.official_contact}-
            {all?.leave?.employee?.contact?.personal_contact}
          </div>
        ),
      },
      {
        key: "leave_type",
        label: "LEAVE TYPE",
        sortable: false,
        render: (temp, all) => <div>{transformData(all?.leave?.type)}</div>,
      },
      {
        key: "overrall_status",
        label: "CURRENT STATUS/ OVERALL STATUS",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.statusMarking}>
            <span>{<StatusPill status={all?.status} />}</span>
            <span>{<StatusPill status={all?.leave?.status} />}</span>
          </div>
        ),
      },
      {
        key: "leaves_dates",
        label: "LEAVE DATES",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.leave?.startDateText !== all?.leave?.endDateText
              ? `${all?.leave?.startDateText}-
          ${all?.leave?.endDateText}`
              : `${all?.leave?.startDateText}`}
          </div>
        ),
      },
      {
        key: "leave_applied_on",
        label: "APPLIED ON",
        sortable: false,
        render: (temp, all) => <div>{all?.leave?.createdAtText}</div>,
      },
      {
        key: "actions",
        label: "ACTION",
        sortable: false,
        render: (temp, all) => (
          <Link to={"list" + "/" + all.id}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
          </Link>
        ),
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling, list?.data]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: list?.data ? list?.data : [],
      count: list?.data?.length ? list?.data?.length : 0,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    data,
    currentPage,
    list?.data,
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

export default PendingLeaveApplication;
