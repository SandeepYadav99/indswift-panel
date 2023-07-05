import React, { useMemo } from "react";
import DataTables from "../../../../../Datatables/Datatable.table";
import Constants from "../../../../../config/constants";
import usePmsInfoTable from "./PmsInfoTable.hook";

const PmsInfoTable = ({ PmstableData }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    isCalling,
    currentData,
    data,
    currentPage,
  } = usePmsInfoTable({ PmstableData });

  const tableStructure = useMemo(() => {
    return [
      {
        key: "reviewer",
        label: "REVIEWER",
        sortable: false,
        render: (temp, all) => <div>{all?.reviewer?.name}</div>,
      },

      {
        key: "review_id",
        label: "REVIEWER ID",
        sortable: false,
        render: (temp, all) => <div>{all?.reviewer?.emp_code}</div>,
      },
      {
        key: "rating",
        label: "AVERAGE RATING",
        sortable: false,
        render: (temp, all) => <div>{all?.rating ? `${all?.rating} %`: 0}</div>,
      },
      {
        key: "normaize",
        label: "NORMALIZED RATING",
        sortable: false,
        render: (temp, all) => (
          <div>{all?.normalized_rating ? `${all?.normalized_rating} %` : 0}</div>
        ),
      },
      {
        key: "factor",
        label: "FACTOR",
        sortable: false,
        render: (temp, all) => <div>{all?.factor ? `${all?.factor} %`: 0}</div>,
      },
    ];
  }, [isCalling]);

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
      page: currentPage - 1,
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
  ]);

  return (
    <div>
      <div style={{ width: "100%" }}>
        <DataTables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </div>
  );
};

export default PmsInfoTable;
