import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Paper,
  Checkbox,
  IconButton,
  MenuItem,
  ButtonBase,
} from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../../../Datatables/Datatable.table";
import Constants from "../../../../../config/constants";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import useEmployeeClaimList from "./EmployeeClaimListHook";

const EmployeeClaimList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    warehouses,
  } = useEmployeeClaimList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.emp_claimList);

  const renderStatus = useCallback((status) => {
    if (status) {
      return <StatusPill status={status.replace(/_/g, " ")} />;
    }
  }, []);
  const renderDate = useCallback((value) => {
    if (value?.claim_type === "MARRAIGE") {
      return <div>{value?.domText}</div>;
    } else if (value?.claim_type === "PHC") {
      return <div>{value?.phcDateText}</div>;
    } else {
      return <div>{value?.billDateText}</div>;
    }
  });
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>
              {removeUnderScore(obj?.claimTypeText)}
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);
  const renderAttachCell = useCallback((obj) => {
    if (obj) {
      if (obj?.claim_type === "LOCAL_TRAVEL") {
        return (
          <a href={obj?.od_ss} target="_blank">
            <div className={styles.hyperlinkText}>
              <div>View Attachment</div>
            </div>
          </a>
        );
      } else if (obj?.claim_type === "TRAVEL" || obj?.claim_type === "FOREIGN_TRAVEL") {
        return <div> N/A </div>;
      } else {
        return (
          <a href={obj?.document} target="_blank">
            <div className={styles.hyperlinkText}>
              <div>View Attachment</div>
            </div>
          </a>
        );
      }
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "type",
        label: "CLAIM TYPE",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "date",
        label: "CLAIM DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.claimDate}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },
      {
        key: "bill_date",
        label: "BILL DATE",
        sortable: false,
        render: (temp, all) => <div>{renderDate(all)}</div>,
      },
      {
        key: "value",
        label: "VALUE",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.claim_amount && `₹ ${all?.claim_amount}`}</div>
        ),
      },
      {
        key: "attachment",
        label: "ATTACHMENT",
        sortable: false,
        render: (temp, all) => <div>{renderAttachCell(all)}</div>,
      },
      {
        key: "claim_id",
        label: "Claim ID",
        sortable: false,
        render: (temp, all) => <div>{all?.code}</div>,
      },
      {
        key: "year",
        label: "FY YEAR",
        sortable: false,
        render: (temp, all) => <div>{all?.fy_year}</div>,
      },
      // {
      //   key: "user_id",
      //   label: "Action",
      //   render: (temp, all) => (
      //     <div>
      //       <IconButton
      //         className={"tableActionBtn"}
      //         color="secondary"
      //         disabled={isCalling}
      //         onClick={() => {
      //           handleViewDetails(all);
      //         }}
      //       >
      //         <InfoOutlined fontSize={"small"} />
      //       </IconButton>
      //     </div>
      //   ),
      // },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling,handleViewDetails]);

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
            <span className={styles.title}>My Claims</span>
            <div className={styles.newLine} />
          </div>
        </div>

        <div>
          {/* <FilterComponent
                            is_progress={isFetching}
                            
                            handleSearchValueChange={handleSearchValueChange}
                            handleFilterDataChange={handleFilterDataChange}
                        /> */}
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

export default EmployeeClaimList;
