import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  ButtonBase,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import {
  InfoOutlined,
} from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import useTravelAuthSpec from "./TravelAuthSpecHook";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const TravelAuthSpec = ({}) => {
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
    handleCsvDownload,
    handleViewSpecDetails,
    ValidUser
  } = useTravelAuthSpec({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.travelAuthSpec);

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
            <span className={styles.productName}>{obj?.travelPlanner?.code}</span>{" "}
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
            <span className={styles.productName21}>{obj?.exception_required ? 'Yes' : "No"}</span>
            <br />
            <span className={styles.productName21}>{obj?.exception?.expense_value && `₹ ${obj?.exception?.expense_value}`}</span>
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
        label: "TAP NO.",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "employee",
        label: "Employee",
        sortable: false,
        render: (temp, all) => <div><b>{all?.employee?.name}</b><br/>{all?.employee?.designation?.name}<br/>{all?.employee?.emp_code}</div>,
      },
      {
        key: "grade",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.contact}
            <br />
            {`${all?.employee?.grade?.code}/${all?.employee?.cadre?.code}`}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.location?.name}</div>,
      },
      {
        key: "department",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.department?.name} / {all?.employee?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "date",
        label: "TOUR DATES",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.travelPlanner?.startDateText}
            <br />
            {all?.travelPlanner?.endDateText}
          </div>
        ),
      },
      {
        key: "type",
        label: "TOUR TYPE",
        sortable: false,
        render: (temp, all) => <div>{all?.travelPlanner?.tour_type}</div>,
      },
      {
        key: "nature",
        label: "NATURE",
        sortable: false,
        render: (temp, all) => <div>{all?.travelPlanner?.tour_nature}</div>,
      },
      {
        key: "status",
        label: " status",
        sortable: true,
        render: (temp, all) => (
          <div>
          <div>{renderStatus(removeUnderScore(all?.status))} </div><br/><div>{renderStatus(removeUnderScore(all?.travelPlanner?.status))}</div>

          </div>
        ),
      },
      {
        key: "Updatedate",
        label: "DATE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.createdAtText}
          </div>
        ),
      },
      // {
      //   key: "imprest",
      //   label: "IMPREST",
      //   sortable: false,
      //   render: (temp, all) => <div>{all?.contact}</div>,
      // },
      {
        key: "exception",
        label: "EXCEPTION",
        sortable: false,
        render: (temp, all) => <div>{renderexception(all?.travelPlanner)}</div>,
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
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>            <span className={styles.title}>View Travel Authorization & Planner</span></b>
            </span>
          </ButtonBase>
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

export default TravelAuthSpec;
