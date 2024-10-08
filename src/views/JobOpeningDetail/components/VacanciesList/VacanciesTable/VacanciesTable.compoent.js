import React, { useCallback, useMemo } from "react";
import {  IconButton} from "@material-ui/core";
import DataTables from "../../../../../components/Datatables/datatables";
import styles from "./Style.module.css";
import classNames from "classnames";
import {
  Chat,
  Clear,
  InfoOutlined,
} from "@material-ui/icons";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import FilterComponent from "../../../../../components/Filter/Filter.component";
import useVacancyList from "./VacanciesTableHook";
import Constants from "../../../../../config/constants";
import InactivePopUp from "../Component/InactivePopUp";
import DetailsDialog from "../Component/ReasonDetail_Dilog/VacanciesDetailDialog";

function VacanciesTable({ jobId }) {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    data,
    currentData,
    currentPage,
    toggleRejectDialog,
    rejectDialog,
    toggleIsOpenDialog,
    ids,
    isOpenDialog,
    empDetail,
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
        render: (temp, all) => (
          <div>
            {all?.type === "RAP"
              ? all?.employee?.designation
              : all?.designation}
          </div>
        ),
      },
      {
        key: "appliedDateText",
        label: "Date Added",
        sortable: false,
        render: (temp, all) => <div> {all?.createdAtText}</div>,
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
        key: "age",
        label: "Aging",
        sortable: false,
        render: (temp, all) => all?.age,
      },
      {
        key: "Replacement Status",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div style={{ display: "flex" }}>
            {(all?.status === "HIRING" || all?.status === "HIRED") &&
              all?.type === "RAP" && (
                <IconButton
                  className={"tableActionBtn"}
                  color="secondary"
                  disabled={isCalling}
                  onClick={() => handleViewDetails(all)}
                >
                  <InfoOutlined fontSize={"small"} />
                </IconButton>
              )}

            {all?.status === "HIRING" &&
              all?.type === "ADDITIONAL_REQUIREMENT" && (
                <IconButton
                  className={"tableActionBtnError"}
                  color="error"
                  style={{ padding: "1px" }}
                  disabled={isCalling}
                  onClick={() => toggleRejectDialog(all)}
                >
                  <Clear fontSize="small" />
                  <div className={styles.subText}> Mark Inactive</div>
                </IconButton>
              )}

            {all?.status === "INACTIVE" &&
              all?.type === "ADDITIONAL_REQUIREMENT" && (
                <IconButton
                  className={"tableActionBtnError"}
                  color="error"
                  onClick={() => toggleIsOpenDialog(all)}
                >
                  <Chat fontSize="small" />
                </IconButton>
              )}
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDetails,
    handleEdit,
    isCalling,
    ids,
  ]);

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
      <InactivePopUp
        jobId={jobId}
        candidateId={ids}
        isOpen={rejectDialog}
        handleToggle={toggleRejectDialog}
      />
      <DetailsDialog
        data={empDetail}
        isOpen={isOpenDialog}
        handleToggleDetail={toggleIsOpenDialog}
      />
    </div>
  );
}

export default VacanciesTable;
