/**
 * Created by sandeepelectrovese@gmail.com on 11/6/2023.
 */
import React, { useCallback, useMemo } from "react";
import { IconButton } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Visibility } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";

import StatusPill from "../../components/Status/StatusPill.component";
import useEmployeeRecordApprovals from "./EmployeeRecordApprovalHook";
import RecordDetailView from "./component/RecordDetail";

const EmployeeRecordApprovals = () => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    isCalling,
    configFilter,
    changeEmployeeRoute,
  } = useEmployeeRecordApprovals();

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state?.employeRecordApproval );

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div
            className={classNames(styles.firstCellInfo, "openSans")}
            onClick={() => changeEmployeeRoute(obj?.employee)}
          >
            <span className={styles.productName}>{obj?.employee?.name}</span>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "emp.name",
        label: "Employee Name",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "emp.emp_code",
        label: "Employee id",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.emp_code}</div>,
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.location?.name}</div>,
      },
      {
        key: "updated_by",
        label: "UPDATED BY",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.editedBy?.name} <br />
            {all?.createdAtText}
          </div>
        ),
      },
      {
        key: "type",
        label: "Type",
        sortable: false,
        render: (temp, all) => <div>{all?.record_type}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div>
            <StatusPill status={all?.status} />{" "}
          </div>
        ),
      },
      {
        key: "verified_by",
        label: "VERIFIED BY",
        sortable: true,
        render: (temp, all) => (
          <div>
            {all?.verifiedAt ? (
              <div>
                {all?.verifiedBy?.name} <br /> {all?.verifiedAtText}{" "}
              </div>
            ) : (
              "-"
            )}
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
              onClick={() => handleSideToggle(all)}
            >
              <Visibility fontSize={"small"} />
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
      count: allData?.length,
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
            <span className={styles.title}>Employee Record Approvals</span>
            <div className={styles.newLine} />
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
        <SidePanelComponent
          handleToggle={handleSideToggle}
          title={" Employee Record Approval"}
          open={isSidePanel}
          side={"right"}
        >
          <RecordDetailView
            handleClose={handleSideToggle}
            id={editData}
            isOpen={isSidePanel}
          />
        </SidePanelComponent>
      </PageBox>
    </div>
  );
};

export default EmployeeRecordApprovals;
