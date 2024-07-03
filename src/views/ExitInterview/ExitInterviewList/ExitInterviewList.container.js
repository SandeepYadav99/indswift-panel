import React, { Component, useCallback, useEffect, useMemo } from "react";
import { ButtonBase, IconButton, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { InfoOutlined, Telegram } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useExitInterviewList from "./ExitInterviewListHook";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import StatusPill from "../../../components/Status/StatusPill.component";
import SendIcon from "@material-ui/icons/Send";
import CommentDialog from "./components/CommentDialog/CommentDialog.view";

const ExitInterviewList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleResend,
    commentDialog,
    toggleCommentDialog,
    empId,
  } = useExitInterviewList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.exit_interview);

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
            <span className={styles.productName}>
              <strong>{obj?.employee?.name}</strong>
            </span>
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
        label: "EMPLOYEE",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade",
        label: "Grade/Cadre",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.grade?.code} / {all?.employee?.cadre?.code}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.location?.name}
          </div>
        ),
      },
      {
        key: "designation",
        label: "Designation",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.designation?.name}
          </div>
        ),
      },
      {
        key: "dept",
        label: "Dept & Sub Dept.",
        sortable: false,
        style: { width: "12%" },
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.employee?.department?.name}/
            {all?.employee?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "contact",
        label: "Contact",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => (
          <div>{all?.employee?.contact?.official_contact}</div>
        ),
      },
      {
        key: "submitted",
        label: "submitted on",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => <div>{all?.submittedOnText}</div>,
      },
      {
        key: "Last",
        label: "Last working day",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => (
          <div>{all?.employee?.resign_data?.last_working_date}</div>
        ),
      },
      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all?.status)}</div>,
      },
      {
        key: "hr_status",
        label: "HR Comment Status",
        sortable: true,
        render: (temp, all) => <div>{all?.hr_status ? renderStatus(all?.hr_status) : "-"}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.btnWrap}>
            {all?.status === "PENDING" ? (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  handleResend(all);
                }}
              >
                <SendIcon style={{ color: "#161616" }} fontSize={"small"} />
              </IconButton>
            ) : (
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
            )}
            {all?.status === "SUBMITTED" && all?.hr_status === "PENDING" && (
              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  toggleCommentDialog(all?.id);
                }}
              >
                <CommentOutlinedIcon fontSize={"small"} />
              </IconButton>
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
      <CommentDialog
        candidateId={empId}
        isOpen={commentDialog}
        handleToggle={toggleCommentDialog}
      />
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Exit Interview List</span>
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

export default ExitInterviewList;
