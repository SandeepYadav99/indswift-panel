import React, { Component, useCallback, useEffect, useMemo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";
import usePmsHodReview from "./PmsHodReview.hook";
import { IconButton } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import DateUtilsLib from "../../../libs/DateUtils.lib";

const PmsHodReview = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    enableAction
  } = usePmsHodReview({ location });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.pmsHodMyReviews);

  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.employee?.name}</span>{" "}
            <br />
            <span className={styles.productName}>
              {obj?.employee?.code}
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
        key: "batch",
        label: "BATCH",
        sortable: false,
        render: (temp, all) => <div>{all?.batch}</div>,
      },

      {
        key: "reviews",
        label: "NO. OF REVIEWS",
        sortable: false,
        render: (temp, all) => (
          <div style={{ whiteSpace: "nowrap" }}>{all?.total_employees}</div>
        ),
      },
      {
        key: "date",
        label: "Date Shared",
        sortable: false,
        render: (temp, all) => <div>{all?.alignedAtText}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.status))}</div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            {enableAction && all?.status === "HOD_PENDING" && (
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
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling,enableAction]);

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
      data,
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
            <span className={styles.title}>HOD Pending Reviews List</span>
            <div className={styles.newLine} />
          </div>
        </div>
      </PageBox>
      <div>
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
    </div>
  );
};

export default PmsHodReview;
