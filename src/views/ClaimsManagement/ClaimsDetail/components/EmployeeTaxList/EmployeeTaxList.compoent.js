import React, { useCallback, useMemo } from "react";
import DataTables from "../../../../../Datatables/Datatable.table";
import styles from "./Style.module.css";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import Constants from "../../../../../config/constants";
import useEmployeeTaxList from "./TaxTableHook";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import { Edit, InfoOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function TaxTable() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    data,
    currentData,
    currentPage,
    handleViewUpdate
  } = useEmployeeTaxList({});

  const renderStatus = useCallback((status) => {
    if (status) {
      return <StatusPill status={status} />;
    }
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "type",
        label: "CLAIM TYPE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {console.log(">>>", all)}
            {"Tax Rebate"}
          </div>
        ),
      },
      {
        key: "date",
        label: "CLAIM DATE",
        sortable: false,
        render: (temp, all) => <div>{all?.claimDateText}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.status)}</div>,
      },

      {
        key: "fy",
        label: "Fy Year",
        sortable: false,
        render: (temp, all) => <div>{all?.fy_year}</div>,
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
              <InfoOutlined fontSize={"small"} style={{ color: "#2896E9" }} />
              <div className={styles.textStyles}>View information</div>
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewUpdate();
              }}
            >
              <Edit fontSize={"small"} style={{ color: "#2896E9" }}/>
              <span className={styles.textStyles}>Edit Information</span>
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderStatus, handleViewDetails, handleEdit, isCalling]);

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
    data,
  ]); // allData, data, currentPage

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Tax Rebate Claim</span>
            <div className={styles.newLine} />
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </PageBox>
    </div>
  );
}

export default TaxTable;
