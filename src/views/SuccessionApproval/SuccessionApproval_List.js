import React, { Component, useCallback, useEffect, useMemo } from "react";
import { ButtonBase, IconButton, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { InfoOutlined, Telegram } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import useSuccessionApprovalHook from "./SuccessionApproval_hook";

const SuccessionApproval_List = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    handleViewForm,
    isCalling,
    configFilter,
    handleResend,
  } = useSuccessionApprovalHook({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.succession_approval);

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
        key: "employee",
        label: "EMPLOYEE",
        sortable: true,
        render: (value, all) => (
          <div>
            {all?.employee?.name}
            <br />
            {all?.employee?.emp_code}
          </div>
        ),
      },
      {
        key: "doj",
        label: "D.O.J",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.doj}</div>,
      },
      {
        key: "dob",
        label: "D.O.B",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.dob}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.designation}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.department}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.location}</div>,
      },
      {
        key: "age",
        label: "AGE",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.age}</div>,
      },
      {
        key: "date of retirment",
        label: "DATE OF Retirement",
        sortable: false,
        render: (temp, all) => <div>{all?.expectedDorText}</div>,
      },
      {
        key: "annual salary",
        label: "ANNUAL SALARY",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.application?.ctc && `₹ ${all?.application?.ctc}`}</div>
        ),
      },
      {
        key: "nature",
        label: "NATURE OF ASSOCIATION",
        sortable: false,
        render: (temp, all) => <div>{all?.application?.extension_status}</div>,
      },

      {
        key: "current_status",
        label: "CURRENT STATUR/OVERALL STATUS",
        sortable: true,
        render: (temp, all) => (
          <div>
            {<StatusPill status={all?.status} />} <br />
            <br />
            <StatusPill status={all?.application?.status} />
          </div>
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
              onClick={() => handleViewDetails(all)}
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
            <span className={styles.title}>Successions Approval</span>
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

export default SuccessionApproval_List;
