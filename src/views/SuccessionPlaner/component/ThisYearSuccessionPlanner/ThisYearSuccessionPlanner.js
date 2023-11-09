/**
 * Created by sandeep.electrovese@gmail.com on 11/02/2020.
 */
import React, { Component, useCallback, useMemo } from "react";
import { Button, ButtonBase, IconButton, withStyles } from "@material-ui/core";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";
import { Add, CachedOutlined, Edit, InfoOutlined } from "@material-ui/icons";
import StatusPill from "../../../../components/Status/StatusPill.component";

import FilterComponent from "../../../../components/Filter/Filter.component";
import useThisYearSuccessionPlaner from "./ThisYearSuccessionPlannerHook";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import SuccessionHistory from "./SuccessionHistory/SuccessionHistory";
import SuccessionPlannerDetailform from "./SuccessionPlannerDetailform/SuccessionPlannerDetailform";

const ThisYearSuccessionPlanner = ({
  jobId,
  filterWidth,
  handleCandidateMen,
  handleInterviewSidepanel,
  handleShortlistSidepanel,
  status,
}) => {
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
    isFetching,
    configFilter,

    isSidePanel,
    handleToggleSidePannel,
    isSidePanelForm,
    handleToggleSidePannelForm,
    isCandidatesFetching,
  } = useThisYearSuccessionPlaner({ jobId });

  const UpperInfo = useCallback(
    (obj) => {
      if (obj) {
        return (
          <div className={styles.headerContainer}>
            <div className={styles.InfoWrap}>
              <div>{"Succession History"} </div>
              <div className={styles.newLine}></div>
            </div>

            <div className={styles.addButton}>
              <ButtonBase
                onClick={() => {
                  handleToggleSidePannelForm();
                  handleToggleSidePannel();
                }}
                className={"createBtn"}
              >
                Add
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            </div>
          </div>
        );
      }
      return null;
    },
    [editData]
  );

  const UpperDetailFormInfo = useCallback(
    (obj) => {
      if (obj) {
        return (
          <div className={styles.headerContainer}>
            <div className={styles.InfoWrap}>
              <div>{"Add Details"} </div>
              <div className={styles.newLine}></div>
            </div>
          </div>
        );
      }
      return null;
    },
    [editData]
  );

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
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
      {
        key: "employee",
        label: "EMPLOYEE",
        sortable: false,
        render: (temp, all) => <div>{all?.candidate?.name}</div>,
      },
      {
        key: "doj",
        label: "D.O.J",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "dob",
        label: "D.O.B",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
        //  candidate?.applied_date
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "age",
        label: "AGE",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "date_of_retirment",
        label: "DATE OF RETIREMENT",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "annual_salary",
        label: "ANNUAL SALARY",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "succession_cost_wrt_emp",
        label: "SUCCESSION'S COST WRT EMPLOYEE",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "nature_of_succession",
        label: "NATURE OF SUCCESSION",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "revert_by_date",
        label: "REVERT BY DATE",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "succession_status",
        label: "SUCCESSION STATUS",
        sortable: false,
        render: (temp, all) => <div>{}</div>,
      },
      {
        key: "action_key",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              // disabled={isCalling}
              onClick={() => {
                // handleViewDetails(all);
                handleToggleSidePannel();
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleEdit(all);
              }}
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
      // onCellClick: this.handleCellClick,
      // onCellDoubleClick: this.handleCellDoubleClick,
      // onFilterValueChange: this._handleSearchValueChange.bind(this),
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      // onRowSelection: this.handleRowSelection,
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
  ]); // allData, data, currentPage

  return (
    <div>
      <div>
        <div>
          <div>
            <FilterComponent
              is_progress={isFetching}
              filters={configFilter}
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

        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          <SuccessionHistory
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={editData}
          />
        </SidePanelComponent>

        <SidePanelComponent
          handleToggle={handleToggleSidePannelForm}
          title={<UpperDetailFormInfo />}
          isBack={true}
          open={isSidePanelForm}
          side={"right"}
        >
          <SuccessionPlannerDetailform
            handleToggleSidePannel={handleToggleSidePannelForm}
            isSidePanel={isSidePanelForm}
            empId={editData}
          />
        </SidePanelComponent>
      </div>
    </div>
  );
};

export default ThisYearSuccessionPlanner;
