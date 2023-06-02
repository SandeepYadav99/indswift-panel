import React, { useCallback, useEffect, useMemo } from "react";
import { Checkbox, IconButton, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Add, InfoOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import StatusPill from "../../../components/Status/StatusPill.component";
import usePmsPlanner from "./PmsPlanner.hook";
import BottomPanelComponent from "../../../components/BottomBar/BottomBar.component";
import BottomActionView from "./component/BottomAction/BottomAction.view";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import ReviewerPlanner from "./component/ReviewerPlanner/ReviewerPlanner.view";
import FreezeDialog from "./component/FreezeDialog/FreezeDialog";
const PmsPlanner = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    warehouses,
    handleCsvDownload,
    handleCheckbox,
    selected,
    isSending,
    handleSend,
    handleViewFormDetails,
    selectedEmps,
    isPannel,
    togglePanel,
    selectedUser,
    selectedStatus,
    toggleStatusDialog,
    approveDialog,
    handleAccept,
      isLoading,
  } = usePmsPlanner({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.pmsPlanner);

  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback(
    (obj) => {
      if (obj) {
        const selectedIndex = selected.findIndex((sel) => sel.id === obj.id);
        return (
          <div className={styles.firstCellFlex}>
            <div className={styles.flex}>
              <Checkbox
                disabled={obj?.type_four_status !== Constants?.PMS_4B_BATCH_STATUS?.PANEL_SET}
                onChange={() => {
                  handleCheckbox(obj);
                }}
                checked={selectedIndex >= 0}
                value="secondary"
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
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
    },
    [selected, handleCheckbox]
  );

  const tableStructure = useMemo(() => {
    return [
      {
        key: "employee",
        label: "EMPLOYEE",
        sortable: false,
        render: (temp, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade",
        label: "GRADE",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.grade?.code}</div>,
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.location?.name}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{all?.employee?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPT & SUB-DEPT",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.department?.name} /{" "}
            {all?.employee?.department?.name}
          </div>
        ),
      },
      {
        key: "hod",
        label: "HOD",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.hod?.hod_name} <br />
            {all?.employee?.hod?.hod_code}
          </div>
        ),
      },
      {
        key: "batch",
        label: "BATCH",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.batch} <br />
            <div style={{ whiteSpace: "nowrap" }}>
              {removeUnderScore(all?.form_type)}
            </div>
          </div>
        ),
      },
      {
        key: "efficacy",
        label: "Efficacy",
        sortable: true,
        render: (temp, all) => (
            <div>{all?.efficacy}</div>
        ),
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => (
          <div>{renderStatus(removeUnderScore(all?.type_four_status))}</div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.btnWrap}>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewDetails(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>

              <IconButton
                className={"tableActionBtn"}
                color="secondary"
                disabled={isCalling}
                onClick={() => {
                  togglePanel(all);
                }}
              >
                <RemoveRedEyeOutlinedIcon fontSize={"small"} />
              </IconButton>
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    handleViewDetails,
    handleEdit,
    handleViewFormDetails,
    isCalling,
  ]);

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
  const header=()=>{
    return <div className={styles.headerWrap}>
      <div>Review Planner</div>
      {
        selectedStatus && <div><StatusPill status={removeUnderScore(selectedStatus)} /></div>
      }
    </div>
  }
  return (
    <div>
      <FreezeDialog isOpen={approveDialog} handleToggle={toggleStatusDialog} handleConfirm={handleAccept}/>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Type 4B Form PMS Planner</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              aria-haspopup="true"
              onClick={toggleStatusDialog}
              className={"createBtn"}
            >
              freeze 
            </ButtonBase>
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
      </PageBox>
      <SidePanelComponent
        handleToggle={togglePanel}
        title={header()}
        open={isPannel}
        side={"right"}
      >
        <ReviewerPlanner isOpen={isPannel} canEdit={selectedUser?.is_editable} togglePanel={togglePanel} reviewId={selectedUser?.review_id} selectedUser={selectedUser}/>
      </SidePanelComponent>
      <BottomPanelComponent open={selected?.length > 0}>
        <BottomActionView
          reviewers={selected?.length}
          employees={selectedEmps}
          handleSend={handleSend}
          isSubmitting={isSending}
        />
      </BottomPanelComponent>
    </div>
  );
};

export default PmsPlanner;
