import React, { Component, useCallback, useMemo } from "react";
import { Button, ButtonBase, IconButton, withStyles } from "@material-ui/core";
import DataTables from "../../../../../Datatables/Datatable.table";
import styles from "./Style.module.css";
import classNames from "classnames";
import { Add, CachedOutlined, Edit, InfoOutlined } from "@material-ui/icons";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import FilterComponent from "../../../../../components/Filter/Filter.component";
import useVacancyList from "./VacanciesTableHook";
import constants from "../../../../../config/constants";
import Constants from "../../../../../config/constants";

function VacanciesTable({ jobId }) {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    data,
    currentPage,
    isVacanciesFetching,
  } = useVacancyList({ jobId });
  const renderStatus = useCallback((status) => {
    if (status) {
      return <StatusPill status={status} />;
    }
  }, []);
  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
          {product.image && (
            <div>
              <img src={product.image} alt="" />
            </div>
          )}

          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span>{product?.name} </span> <br />
            <span>{product?.emp_code}</span>
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
        label: "Employee",
        sortable: false,
        render: (temp, all) => <div>{renderFirstCell(all?.employee)}</div>,
      },
      {
        key: "designation",
        label: "Designation",
        sortable: false,
        render: (temp, all) => <div>{all?.designation}</div>,
      },
      {
        key: "appliedDateText",
        label: "Date Added",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "status",
        label: "Employee Status",
        sortable: false,
        render: (temp, all) => renderStatus(all?.employee?.status),
      },
      {
        key: "emp_status",
        label: "REPLEACEMENT STATUS",
        sortable: false,
        render: (temp, all) => renderStatus(all?.status),
      },
      {
        key: "Replacement Status",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              // onClick={() => {
              //   handleViewDetails(all);
              // }}
            >
              <Edit fontSize={"small"} />
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
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: data.length,
      page: currentPage - 1,
      rowsPerPage: 50,
      allRowSelected: false,
      showSelection: false,
      hidePagination: true,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    currentPage,
    data,
  ]); // allData, data, currentPage

  return (
    <div>
      <div>
        <div>
          <div className={styles.FilterBtnWrapper}>
            <FilterComponent
              // is_progress={isFetching}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            />
          </div>

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
}

export default VacanciesTable;
