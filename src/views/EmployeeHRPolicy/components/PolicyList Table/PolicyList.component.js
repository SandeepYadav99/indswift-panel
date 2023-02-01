import React, { Component, useCallback, useMemo } from "react";
import { Button, ButtonBase, IconButton, withStyles } from "@material-ui/core";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ReduxDatePicker from "../../../../components/ReduxDatePicker/ReduxDatePicker.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { Add, CachedOutlined } from "@material-ui/icons";
import StatusPill from "../../../../components/Status/StatusPill.component";
import FilterComponent from "../../../../components/Filter/Filter.component";
import usePolicyList from "./PolicyListHook";

const PolicyRecordTable = ({ jobId, filterWidth }) => {
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
    currentData,
    data,
    currentPage,
  } = usePolicyList({ jobId });

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
          {/*<div>*/}
          {/*    <img src={user.image} alt=""/>*/}
          {/*</div>*/}
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span>
              <strong></strong>
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
      // {
      //   key: "name",
      //   label: "Sr. No",
      //   sortable: false,
      //   render: (value, all, index) => <div>{index + 1}</div>,
      // },
      {
        key: "name",
        label: "Name",
        sortable: false,
        render: (temp, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "PNR",
        label: "Contact",
        sortable: false,
        render: (temp, all) => <div>{all?.candidate?.contact}</div>,
      },

      {
        key: "rewards",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div>
            <StatusPill
              status={Constants.JOB_CANDIDATE_STATUS_TEXT[all?.status]}
            />
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
    currentPage,
    currentData,
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
              filterWidth={filterWidth}
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
};

export default PolicyRecordTable;
