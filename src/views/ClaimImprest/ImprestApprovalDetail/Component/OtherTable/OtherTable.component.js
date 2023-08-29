import React, { Component, useCallback, useEffect, useMemo } from "react";
import DataTables from "../../../../../Datatables/Datatable.table";
import styles from "./Style.module.css";
import classNames from "classnames";
import useInterviewerList from "./OtherTableHook";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import constants from "../../../../../config/constants";
import { IconButton } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { getCurrency, removeUnderScore } from "../../../../../helper/helper";

const OtherTable = ({ jobId, Claimtype }) => {
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
  } = useInterviewerList({ jobId, Claimtype });
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
            <span>{product?.dateText} </span> <br />
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
        key: "type",
        label: "type",
        sortable: false,
        render: (temp, all) => <div>{removeUnderScore(all?.ledger_type)}</div>,
      },
      {
        key: "desc",
        label: "DESCRIPTION",
        sortable: false,
        render: (temp, all) => <div>{all?.description}</div>,
      },
      {
        key: "credit",
        label: "AMOUNT CREDIT",
        sortable: false,
        render: (temp, all) => <div>{getCurrency(all?.currency)}{all?.credit_amount}</div>,
      },

      {
        key: "debt",
        label: "AMOUNT DEBIT",
        sortable: false,
        render: (temp, all) => <div>{getCurrency(all?.currency)}{all?.debit_amount}</div>,
      },
      {
        key: "balance",
        label: "BALANCE",
        sortable: false,
        render: (temp, all) => <div>{getCurrency(all?.currency)}{all?.updated_balance}</div>,
      },
      {
        key: "voucher",
        label: "VOUCHER NO.",
        sortable: false,
        render: (temp, all) => <div>{all?.code}</div>,
      },
      // {
      //   key: "action_key",
      //   label: "Action",
      //   sortable: false,
      //   render: (temp, all) => (
      //     <div>
      //       <IconButton
      //         className={"tableActionBtn"}
      //         color="secondary"
      //         disabled={isCalling}
      //         // onClick={() => {
      //         //   handleViewDetails(all);
      //         // }}
      //       >
      //         <InfoOutlined fontSize={"small"} />
      //       </IconButton>
      //     </div>
      //   ),
      // },
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
      page: currentPage -1,
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

export default OtherTable;
