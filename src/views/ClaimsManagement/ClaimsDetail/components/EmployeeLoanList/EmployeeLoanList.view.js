import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { InfoOutlined } from "@material-ui/icons";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../../Datatables/Datatable.table";
import Constants from "../../../../../config/constants";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import useEmployeeLoanList from "./EmployeeLoanList.hook";
import { removeUnderScore } from "../../../../../helper/helper";
const EmployeeLoanList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleViewDetails,
    isCalling,
  } = useEmployeeLoanList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.emp_loanList);

  const renderStatus = useCallback((status) => {
    return (
      <StatusPill
        status={status}
        style={status === "PROCESSED" && { background: "#ceece2" }}
      />
    );
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "id",
        label: "LOAN ID",
        sortable: true,
        render: (value, all) => <div>{all?.code}</div>,
      },
      {
        key: "date",
        label: "APPLICATION DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.requestDateText} </div>,
      },
      {
        key: "amount",
        label: "PRINCIPLE AMOUNT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.eligibility_calculations?.total_applied_loan ||
            all?.eligibility_calculations?.total_applied_loan === 0
              ? `₹ ${all?.eligibility_calculations?.total_applied_loan}`
              : ""}
          </div>
        ),
      },
      {
        key: "issue",
        label: "ISSUE DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.issueDateText}</div>,
      },
      {
        key: "status",
        label: " status",
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.status))}</div>
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
  }, [renderStatus, handleViewDetails, isCalling]);

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
            <span className={styles.title}>My Loan</span>
            <div className={styles.newLine} />
          </div>
        </div>

        <div>
          <br />
          <div style={{ width: "100%" }}>
            <DataTables
              {...tableData.datatable}
              {...tableData.datatableFunctions}
            />
          </div>
        </div>
      </PageBox>
    </div>
  );
};

export default EmployeeLoanList;
