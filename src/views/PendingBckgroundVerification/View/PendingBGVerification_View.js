import React, { useCallback, useMemo } from "react";
import { ButtonBase, IconButton, colors } from "@material-ui/core";
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
    handleBgvAnalysisReport,
    handleBgvReportDownload,
  } = usePendingBGVerification_Hook({ location });

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.pendingBGV);

  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };

  const renderBGVStatus = useCallback((status) => {
    if (status === "PENDING" || "CLEAR" || "FAILED") {
      return (
        <StatusPill
          status={status}
          style={
            status === "INCOMPLETE"
              ? { color: "#E92828", borderColor: "#E92828" }
              : ""
          }
        />
      );
    } else {
      return <></>;
    }
  }, []);

  const renderBgvResult = useCallback((status) => {
    return <StatusPill status={status} style={getBgvStatusStyle(status)} />;
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

  const getBgvStatusStyle = (bgvResult) => {
    if (bgvResult === "IN PROCESS") {
      return { color: "#F4881B", borderColor: "#F4881B" };
    } else if (bgvResult === "UNABLE TO VERIFY") {
      return { color: "#7467F0", border: "none", textAlign: "justify" };
    } else if (bgvResult === "FAILED") {
      return { color: "#E92828", borderColor: "#E92828" };
    }

    return {};
  };

  const button_VerificationHandler = useCallback(
    (all) => {
      const isValidBgvStatus =
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
          all?.payment_status !== "");

      const isShowBgvDetails =
        isValidBgvStatus &&
        (all?.bgv_status === "PENDING" || all?.bgv_status === "COMPLETED") &&
        (all?.bgv_result === "CLEAR" || all?.bgv_result === "FAILED") &&
        all?.payment_status === "CLEAR";

      if (isValidBgvStatus) {
        return (
          <IconButton
            className={"tableActionBtn"}
            color="secondary"
            onClick={() => {
              isShowBgvDetails
                ? handleBGVDetails(all)
                : handleBGVUpdateDetails(all); // handleBGVUpdateDetails(all)
            }}
          >
            {isShowBgvDetails ? (
              <VisibilityOutlined fontSize={"small"} />
            ) : (
              <AssignmentOutlined fontSize={"small"} />
            )}
          </IconButton>
        );
      }

      return null;
    },
    [handleBGVDetails, handleBGVUpdateDetails]
  );

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (value, all) => (
          <>
            <b>{all?.emp_name}</b> <br /> {all?.emp_code}
          </>
        ),
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => (
          <>{all?.location?.name || all?.reporting_company}</>
        ),
      },
      {
        key: "month",
        label: "MONTH",
        sortable: false,
        render: (temp, all) => <>{all?.verificationText}</>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <>{all?.designation?.name}</>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => <>{all?.department?.name || "-"}</>,
      },
      {
        key: "offer_date",
        label: "OFFER DATE",
        sortable: false,
        render: (temp, all) => (
          <>{all?.offerDate !== "Invalid date" ? all?.offerDate : "-"}</>
        ),
      },
      {
        key: "offer_accepted",
        label: "OFFER ACCEPTED",
        sortable: false,
        render: (temp, all) => (
          <>
            {all?.offerAcceptedDate !== "Invalid date"
              ? all?.offerAcceptedDate
              : "-"}
          </>
        ),
      },
      {
        key: "doj",
        label: "DOJ",
        sortable: false,
        render: (temp, all) => <>{all?.dojText}</>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => (
          <div style={{ width: "8rem" }}>
            {renderBGVStatus(all?.bgv_status)}
          </div>
        ),
      },
      {
        key: "bgv-result",
        label: "BGV RESULT",
        sortable: false,

        render: (temp, all) => (
          <div style={{ width: "8rem" }}>
            {all?.bgv_result ? (
              renderBgvResult(removeUnderScore(all?.bgv_result))
            ) : (
              <>-</>
            )}
          </div>
        ),
      },
      {
        key: "payment_status",
        label: "PAYMENT STATUS",
        sortable: false,
        render: (temp, all) => (
          <div style={{ width: "8rem" }}>
            {all?.payment_status ? (
              <StatusPill
                status={removeUnderScore(all?.payment_status)}
                style={
                  all?.payment_status === "IN_PROCESS"
                    ? { color: "#F4881B", borderColor: "#F4881B" }
                    : {}
                }
              />
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
          <div style={{ display: "flex", flexDirection: "column" }}>
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
    renderBGVStatus,
    renderFirstCell,
    handleViewDetails,
    handleEdit,
    isCalling,
    button_VerificationHandler,
    renderBgvResult,
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
              className={styles.download}
              onClick={() => {
                handleBgvReportDownload();
              }}
            >
              DOWNLOAD
            </ButtonBase>
            <ButtonBase
              className={styles.edit}
              onClick={() => {
                handleBgvAnalysisReport();
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

export default PendingBGVerification_View;
