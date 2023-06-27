/**
 * Created by charnjeetelectrovese@gmail.com on 6/26/2020.
 */
import React, { Component, useCallback, useEffect, useMemo } from "react";
import DataTables from "../../../../../Datatables/Datatable.table";
import styles from "./Style.module.css";
import classNames from "classnames";
import useInterviewerList from "./TravelTableHook";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import constants from "../../../../../config/constants";

const TravelTable = ({
  jobId,Claimtype
}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    currentData,
    currentPage,
    data,
  } = useInterviewerList({ jobId ,Claimtype});
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
          <div>
            <img src={product.image} alt="" />
          </div>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span>{product?.name} </span> <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "date",
        label: "DATE",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
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
        key: "step sequence",
        label: "STEP SEQUENCE",
        sortable: false,
        render: (temp, all) => <div>{all?.step}</div>,
      },
      {
        key: "shortlist approval",
        label: "SHORTLIST APPROVAL",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.is_shortlist_approval ? "Yes" : "No"}</div>
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
      ...constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: currentData,
      count: data.length,
      page: currentPage,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
    currentData,
  ]);

  return (
    <div>
      <div>
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
    </div>
  );
};

export default TravelTable;
