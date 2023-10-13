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
import useTravelList from "./TravelListHook";

const TravelList = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    handleViewCreate,
    isCalling,
    configFilter,
  } = useTravelList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.travel);

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
        <div className={styles.firstCellFlex221}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.code}</span>{" "}
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const renderexception = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>
              <StatusPill
                status={removeUnderScore(obj?.exception?.status)}
                style={{ background: "transparent", border: "none" }}
              />
            </span>
            <br />
            <span className={styles.productName21}>
              {obj?.exception_required ? "Yes" : "No"}
            </span>
            <br />
            <span className={styles.productName21}>
              {obj?.exception?.expense_value &&
                `₹ ${obj?.exception?.expense_value}`}
            </span>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const renderImprest = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          {obj?.imprest_required ? (
            <div className={classNames(styles.firstCellInfo, "openSans")}>
              <span className={styles.productName21}>
                {obj?.imprest?.amount && `₹ ${obj?.imprest?.amount}`}
              </span>
              <br />
              <span className={styles.productName21}>{obj?.imprest?.code}</span>
              <br />
              <span className={styles.productName}>
                <StatusPill
                  status={removeUnderScore(obj?.imprest?.status)}
                  style={{ background: "transparent", border: "none" }}
                />
              </span>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginLeft: "20px" }}>N.A</div>
          )}
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "TAP NO.",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "date",
        label: "TOUR DATES",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.startDateText}
            <br />
            {all?.endDateText}
          </div>
        ),
      },
      {
        key: "type",
        label: "TOUR TYPE",
        sortable: false,
        render: (temp, all) => <div>{all?.tour_type}</div>,
      },
      {
        key: "nature",
        label: "NATURE",
        sortable: false,
        render: (temp, all) => <div>{all?.tour_nature}</div>,
      },
      {
        key: "status",
        label: "status",
        sortable: true,
        render: (temp, all) => (
          <div>
            {all?.copassengerStatus?.status ? (
              <StatusPill status={removeUnderScore(all?.copassengerStatus?.status)} />
            ) : (
              "N.A"
            )}
          </div>
        ),
      },
      {
        key: "Updatedate",
        label: "DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      // {
      //   key: "imprest",
      //   label: "IMPREST",
      //   sortable: false,
      //   render: (temp, all) => <div>{renderImprest(all)}</div>,
      // },
      {
        key: "exception",
        label: "EXCEPTION",
        sortable: false,
        render: (temp, all) => <div>{renderexception(all)}</div>,
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
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

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
            <span className={styles.title}>Travel Authorization & Planner</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.btnWrap}>
            <ButtonBase
              aria-haspopup="true"
              onClick={handleViewCreate}
              className={"createBtn"}
            >
              New Request
              <Add fontSize={"small"} className={"plusIcon"}></Add>
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

export default TravelList;
