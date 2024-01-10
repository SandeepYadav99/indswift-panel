import React, { Component, useCallback, useEffect, useMemo } from "react";
import {
  ButtonBase,
} from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import useClaimCarReport from "./ClaimsListHook";
import Datatables from "../../components/Datatables/datatables";

const ClaimCarReport = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    configFilter,
    warehouses,
    handleCsvDownload
  } = useClaimCarReport({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.claimCarReport);

  const {user}=useSelector((state)=>state.auth)
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} style={status === 'PROCESSED' && {background:'#ceece2'}}/>;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.employee?.name}</span>{" "}
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
            {`${all?.grade?.code}/${all?.cadre?.code}`}
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "desigination",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.department?.name} / {all?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "category",
        label: "CLAIM CATEGORY",
        sortable: false,
        render: (temp, all) => <div>{all?.category}</div>,
      },
      {
        key: "amount",
        label: "CLAIM AMOUNT",
        sortable: false,
        render: (temp, all) => <div>{all?.totalValue && `₹ ${all?.totalValue}`}</div>,
      },
      {
        key: "entitled",
        label: "ENTITLED AMOUNT",
        sortable: false,
        render: (temp, all) => <div style={{whiteSpace:'nowrap'}}>{all?.entitled_amount && `₹ ${all?.entitled_amount}`}</div>,
      },
      {
        key: "balance",
        label: "BALANCE AMOUNT",
        sortable: false,
        render: (temp, all) => <div>{all?.balance_amount && `₹ ${all?.balance_amount}`}</div>,
      },
     
      {
        key: "year",
        label: "FINANCIAL YEAR",
        sortable: false,
        render: (temp, all) => <div>{all?.fy_year}</div>,
      },
    ]
      
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
            <span className={styles.title}>Car Claims Report</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.rightFlex}>
            <ButtonBase className={styles.download} onClick={handleCsvDownload}>DOWNLOAD</ButtonBase>
          </div>
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

export default ClaimCarReport;
