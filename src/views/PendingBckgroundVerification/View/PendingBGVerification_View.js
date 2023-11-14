import React, { useCallback, useMemo } from "react";
import { ButtonBase, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";

import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";

import StatusPill from "../../../components/Status/StatusPill.component";

import {
  AssignmentOutlined,
  InfoOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import usePendingBGVerification_Hook from "./PendingBGVerification_Hook";

const PendingBGVerification_View = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleBGVUpdateDetails,
    handleBGVDetails,
    handleBgvAnalysiReport,
  } = usePendingBGVerification_Hook({ location });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.pendingBGV);

  const renderStatus = useCallback((status) => {
    if (status === "PENDING" || "CLEAR" || "FAILED") {
      return <StatusPill status={status} />;
    } else {
      return <></>;
    }
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const button_VerificationHandler = useCallback(
    (all) => {
      if (
        (all?.bgv_status === "INCOMPLETE" ||
          all?.bgv_status === "COMPLETED" ||
          all?.bgv_status === "PENDING") &&
        (all?.bgv_result === "PENDING" ||
          all?.bgv_result === "CLEAR" ||
          all?.bgv_result === "FAILED" ||
          all?.bgv_result === "IN_PROCESS" ||
          all?.bgv_result === "UNABLE_TO_VERIFY") &&
        (all?.payment_status === "IN_PROCESS" ||
          all?.payment_status === "PENDING" ||
          all?.payment_status !== "")
      ) {
        if (
          (all?.bgv_status === "PENDING" || all?.bgv_status === "COMPLETED") &&
          (all?.bgv_result === "CLEAR" || all?.bgv_result === "FAILED") &&
          all?.payment_status === "CLEAR"
        ) {
          return (
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              // disabled={isCalling}
              onClick={() => {
                handleBGVDetails(all);
              }}
            >
              <VisibilityOutlined fontSize={"small"} />
            </IconButton>
          );
        }
        return (
          <IconButton
            className={"tableActionBtn"}
            color="secondary"
            // disabled={isCalling}
            onClick={() => {
              handleBGVUpdateDetails(all);
            }}
          >
            <AssignmentOutlined fontSize={"small"} />
          </IconButton>
        );
      }
    },
    [handleBGVDetails, handleBGVUpdateDetails]
  );

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (value, all) => <div>{all?.emp_name}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.location?.name || all?.reporting_company}</div>
        ),
      },
      {
        key: "month",
        label: "MONTH",
        sortable: false,
        render: (temp, all) => <div>{all?.verificationText}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => <div>{all?.department?.name || "-"}</div>,
      },
      {
        key: "offer_accepted",
        label: "OFFER ACCEPTED",
        sortable: false,
        render: (temp, all) => <div>{all?.offerAcceptedDate || "-"}</div>,
      },
      {
        key: "doj",
        label: "DOJ",
        sortable: false,
        render: (temp, all) => <div>{all?.dojText}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.bgv_status)}</div>,
      },
      {
        key: "bgv-result",
        label: "BGV RESULT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.bgv_result ? <StatusPill status={all?.bgv_result} /> : <>-</>}
          </div>
        ),
      },
      {
        key: "payment_status",
        label: "PAYMENT STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.payment_status ? (
              <StatusPill status={all?.payment_status} />
            ) : (
              <>-</>
            )}
          </div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            {all?.bgv_status === "PENDING" &&
              (all?.bgv_result === "PENDING" ||
                all?.bgv_result !== "" ||
                all?.bgv_result === "IN_PROCESS") &&
              all?.payment_status === "PENDING" && (
                <IconButton
                  className={"tableActionBtn"}
                  color="secondary"
                  // disabled={isCalling}
                  onClick={() => {
                    handleViewDetails(all);
                  }}
                >
                  <InfoOutlined fontSize={"small"} />
                </IconButton>
              )}

            {button_VerificationHandler(all)}
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDetails,
    handleEdit,
    isCalling,
    button_VerificationHandler,
  ]);

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
            <span className={styles.title}>
              Pending Background Verification List
            </span>
            <div className={styles.newLine} />
          </div>

          <div className={styles.rightFlex}>
            <ButtonBase
              className={styles.edit}
              onClick={() => {
                handleBgvAnalysiReport();
              }}
            >
              BGV ANALYSIS REPORT
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

export default PendingBGVerification_View;
