import React, { Component, useCallback, useEffect, useMemo } from "react";
import { ButtonBase, IconButton, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import useLeaveList from "./LeaveApplication.hook";

const LeaveApplication = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleLeaveApplicationForm
  } = useLeaveList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.leave_list);

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
            <span className={styles.productName}>{obj?.candidate?.name}</span>{" "}
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
        label: "Leave Type",
        sortable: true,
        render: (value, all) => <div>{removeUnderScore(all?.type)}</div>,
      },
      {
        key: "leave_dates",
        label: "Leave Dates",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.startDateText !== all?.endDateText
              ? `${all?.startDateText} - ${all?.endDateText}`
              : `${all?.startDateText}`}
          </div>
        ),
      },
      {
        key: "status",
        label: "status",
        sortable: false,
        render: (temp, all) => <div>{<StatusPill status={all?.status} />}</div>,
      },
      {
        key: "applied_on",
        label: "Applied On",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "attachments",
        label: "Attachments",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.document && (
              <div className={styles.key}>
                <a href={all?.document} target="_blank">
                  <div className={styles.hyperlinkText}>View Attachment</div>
                </a>
              </div>
            )}
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, isCalling]);

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
            <span className={styles.title}>Leave Application</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.btnWrapperGap}>
            <ButtonBase
              onClick={handleViewDetails}
              className={"createBtn"}
            >
              APPLY LEAVE
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

export default LeaveApplication;
