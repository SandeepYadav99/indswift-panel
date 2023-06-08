import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import {
  Add,
  CloudDownload,
  InfoOutlined,
  PrintOutlined,
} from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import useInterviewClaimsList from "./InterviewClaimsListHook";

const InterviewClaimsList = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
  } = useInterviewClaimsList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.interview_claims);

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
        key: "name",
        label: "CANDIDATE NAME",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "prc",
        label: "CANDIDATE PRC",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.job?.code}
          </div>
        ),
      },
      {
        key: "recruiter",
        label: "RECRUITER",
        sortable: false,
        render: (temp, all) => <div>{all?.job?.assigned_person?.name}<br/>{all?.job?.assigned_person?.emp_code}</div>,
      },
      {
        key: "status",
        label: "CANDIDATE STATUS",
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.candidate?.status))}</div>
        ),
      },
      {
        key: "date",
        label: "DATE OF INTERVIEW",
        sortable: false,
        render: (temp, all) => <div>{all?.interviewDateText}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.job?.designation?.name}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.job?.location?.name}</div>,
      },
      {
        key: "grade",
        label: "GRADE",
        sortable: false,
        render: (temp, all) => (
          <div>{removeUnderScore(all?.job?.grade?.code)}</div>
        ),
      },
      {
        key: "status",
        label: "Current status/Overall status",
        sortable: true,
        render: (temp, all) => (
          <div>
            {renderStatus(removeUnderScore(all?.status))}
            <br /> <br />
            {renderStatus(removeUnderScore(all?.claim?.status))}
          </div>
        ),
      },
      {
        key: "claim_id",
        label: "Claim Id",
        sortable: false,
        render: (temp, all) => <div>{all?.claim?.code}</div>,
      },
      {
        key: "amount",
        label: "AMOUNT",
        sortable: false,
        render: (temp, all) => <div>{all?.claim?.bill_amount && `₹ ${all?.claim?.bill_amount}`}</div>,
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
            <span className={styles.title}>Interview Claims List</span>
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

export default InterviewClaimsList;
