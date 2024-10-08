import React, { Component, useCallback, useEffect, useMemo } from "react";
import { ButtonBase, IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { InfoOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import useLoanList from "./LoanList.hook";
import Datatables from "../../../components/Datatables/datatables";
import RolesUtils from "../../../libs/Roles.utils";

const LoanList = () => {
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
    handleViewDetails2,
    handleBankSheetDownload,
  } = useLoanList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.loanList);

  const { role } = useSelector((state) => state.auth);

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
            <span className={styles.productName}>
              <b>{obj?.loan?.employee?.name}</b>
            </span>
            <br />
            <span className={styles.productName}>
              {obj?.loan?.employee?.emp_code}
            </span>
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
        key: "id",
        label: "Loan id",
        sortable: false,
        render: (temp, all) => <div className={styles.statusWrap}>{all?.loan?.code}</div>,
      },
      {
        key: "name",
        label: "EMPLOYEE",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.contact}
            <br />
            {`${all?.loan?.employee?.grade?.code}/${all?.loan?.employee?.cadre?.code}`}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div className={styles.statusWrap}>{all?.loan?.employee?.location?.name}</div>,
      },
      {
        key: "desigination",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.statusWrap}>{all?.loan?.employee?.designation?.name}</div>
        ),
      },
      {
        key: "department",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.statusWrap}>
            {all?.loan?.employee?.department?.name} /{" "}
            {all?.loan?.employee?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "contact",
        label: "CONTACT",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.loan?.employee?.contact?.official_contact}</div>
        ),
      },
      {
        key: "loan_type",
        label: "Loan TYPE",
        sortable: false,
        render: (temp, all) => (
          <div style={{ whiteSpace: "nowrap" }}>
            {removeUnderScore(all?.loan?.loan_type)}
          </div>
        ),
      },
      {
        key: "date",
        label: "APPLICATION DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.loan?.requestDateText}</div>,
      },
      {
        key: "amount",
        label: "PRINCIPLE AMOUNT",
        sortable: false,
        render: (temp, all) => (
          <div style={{ whiteSpace: "nowrap" }}>
            {all?.loan?.amount || all?.loan?.amount === 0
              ? `₹ ${all?.loan?.amount}`
              : ""}
          </div>
        ),
      },
      {
        key: "issue",
        label: "ISSUE DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.loan?.issueDateText}</div>,
      },
      {
        key: "status",
        label: "Current status/Overall status",
        sortable: true,
        render: (temp, all) => (
          <div className={styles.statusWrap}>
            {renderStatus(removeUnderScore(all?.status))}
            <br /> <br />
            {renderStatus(removeUnderScore(all?.loan?.status))}
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
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} style={{color: "#2896E9"}} />
              <div className={styles.textStyles}>View information</div>
            </IconButton>
            {/* <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails2(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton> */}
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
  const isCorporateAccountant = useMemo(() => {
    return RolesUtils.canAccess([Constants.ROLES.CORPORATE_HR,Constants.ROLES.ACCOUNTANT], role);
  }, [role]);
  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Loan Application Management</span>
            <div className={styles.newLine} />
          </div>
          {isCorporateAccountant && (
            <div className={styles.btnHide}>
            <ButtonBase
              aria-haspopup="true"
              // onClick={handleAddCandidate}
              onClick={handleBankSheetDownload}
              className={"createBtn"}
            >
              Loan Bank Transfer Sheet
            </ButtonBase>
            </div>
          )}
        </div>
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
        </div>
      </PageBox>
      <div style={{ width: "100%" }}>
              <Datatables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
    </div>
  );
};

export default LoanList;
