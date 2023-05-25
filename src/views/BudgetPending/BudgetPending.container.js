import React, { useCallback, useEffect, useMemo } from "react";
import { IconButton } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { AssignmentOutlined, PeopleOutlined } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import StatusPill from "../../components/Status/StatusPill.component";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import useBudgetPending from "./BudgetPendingHook";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import BudgetDetail from "./BudgetDetail.view";

const BudgetPending = ({ location }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    isCalling,
    isInfoPanel,
    handleSideInfo,
    selectedAnnualId,
    setSelectedAnnualId,
    configFilter,
    requestRaisedApi
  } = useBudgetPending({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.budget_pending);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.candidate?.name}</span>{" "}
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
        key: "location",
        label: "Location",
        sortable: true,
        render: (value, all) => <div>{all?.location?.name}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => <div>{all?.department?.name}</div>,
      },
      {
        key: "sub_dept",
        label: "SUB DEPARTMENT",
        sortable: false,
        render: (temp, all) => <div>{all?.sub_department?.name}</div>,
      },
      {
        key: "updated",
        label: "Updated By",
        sortable: true,
        render: (temp, all) => (
          <div>
            {all?.editedBy?.name}
            <br />
            {all?.updatedAtText}
          </div>
        ),
      },
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (temp, all) => (
          <div>
            <StatusPill status={all?.status} />
          </div>
        ),
      },

      {
        key: "approved",
        label: "Approved By",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.btnWrapContainer}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleSideInfo(all);
              }}
            >
              <RemoveRedEyeOutlinedIcon fontSize={"small"} />
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

  const renderDetailInfo = useMemo(() => {
    return (
      <BudgetDetail
        closeSidePanel={handleSideInfo}
        annualId={selectedAnnualId}
        requestRaisedApi={requestRaisedApi}
      />
    );
  }, [selectedAnnualId]);
  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Pending Budget Approvals</span>
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
          <SidePanelComponent
            handleToggle={handleSideInfo}
            title={"Budget Approval Details"}
            open={isInfoPanel}
            side={"right"}
          >
            {renderDetailInfo}
          </SidePanelComponent>
        </div>
      </PageBox>
    </div>
  );
};

export default BudgetPending;
