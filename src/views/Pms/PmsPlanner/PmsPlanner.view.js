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
    togglePanel
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
                // disabled={
                //   obj?.status !== Constants?.PMS_BATCH_STATUS?.PENDING ||
                //   obj?.reviewer.status !== Constants?.GENERAL_STATUS?.ACTIVE
                // }
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
                  togglePanel();
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

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Type 4B Form PMS Planner</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              aria-haspopup="true"
              onClick={handleCsvDownload}
              className={"createBtn"}
            >
              DownLoad
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
        title={"Review Planner"}
        open={isPannel}
        side={"right"}
      >
        <ReviewerPlanner/>
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
