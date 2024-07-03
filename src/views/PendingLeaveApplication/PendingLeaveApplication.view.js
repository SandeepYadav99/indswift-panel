import React, { useCallback, useMemo } from "react";

import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Styled.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import usePendingLeaveApplication from "./PendingLeaveApplication.hook";
import StatusPill from "../../components/Status/StatusPill.component";
import { IconButton } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";

import { removeUnderScore } from "../../helper/helper";

const PendingLeaveApplication = () => {
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
    handleRowSize
  } = usePendingLeaveApplication({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.LeaveModule);


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
        render: (value, all) => <div style={{display:"flex",flexDirection:"column"}}><span>{all?.leave?.employee?.name}</span><span>{all?.leave?.employee?.emp_code}</span></div>,
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
        render: (temp, all) => <div>{removeUnderScore(all?.leave?.type)}</div>,
      },
      {
        key: "overrall_status",
        label: "CURRENT STATUS/ OVERALL STATUS",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.statusMarking}>
             <span className={styles.marginGap}>{<StatusPill status={all?.status} />}</span>
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
          <IconButton
            className={"tableActionBtn"}
            color="secondary"
            disabled={isCalling}
            onClick={() => handleViewDetails(all)}
          >
            <InfoOutlined fontSize={"small"} />
          </IconButton>
        ),
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
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
