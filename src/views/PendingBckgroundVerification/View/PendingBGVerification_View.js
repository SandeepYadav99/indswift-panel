import React, { useCallback, useEffect, useMemo } from "react";
import { ButtonBase, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";

import StatusPill from "../../../components/Status/StatusPill.component";

import {
  AssignmentOutlined,
  InfoOutlined,
  VisibilityOffOutlined,
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

  const button_VerificationHandler = (all) => {
    if (all?.status === "SENT_FOR_VERIFICATION") {
      if (all?.bgv_result === "CLEAR" || all?.bgv_result === "FAILED" || all?.bgv_result === "Unable to Verify") {
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
  };
  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (value, all) => <div>{all?.name}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.location?.name}</div>,
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
        render: (temp, all) => <div>{all?.department?.name}</div>,
      },
      {
        key: "offer_accepted",
        label: "OFFER ACCEPTED",
        sortable: false,
        render: (temp, all) => (
          <div>
            (O) {all?.contact?.personal_contact}
            <br />
            {all?.createdBy?.code} <br />
            {all?.createdAtText}
          </div>
        ),
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
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(all?.status)}</div>
        ),
      },
      {
        key: "bgv-result",
        label: "BGV RESULT",
        sortable: true,
        render: (temp, all) => (
          <div>
            {all?.bgv_result ? <StatusPill status={all?.bgv_result} /> : <>-</>}
          </div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            {all?.status === "PENDING_VERIFICATION" && (
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
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

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
                // handleViewGraph();
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
