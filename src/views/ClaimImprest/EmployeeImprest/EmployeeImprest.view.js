import React, { useCallback, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, Edit, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";
import LogUtils from "../../../libs/LogUtils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import useEmployeeImprest from "./EmployeeImprest.hook";
import FilterComponent from "../../../components/Filter/Filter.component";
import AccountDialog from "./component/AccountDialog/AccountDialog.view";
import ReturnEmpDialog from "./component/ReturnEmpDialog/ReturnEmpDialog.view";
import { getCurrency } from "../../../helper/helper";

const EmployeeImprest = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    editData,
    isCalling,
    type,
    configFilter,
    handleFilterDataChange,
    handleSearchValueChange,
    setType,
    createDD,
    handleAddCandidate,
    handleClosedownloadCL,
    toggleExtendDialog,
    toggleTraineeDialog,
    isExtendDialog,
    handleCsvDownload,
    isTraineeDialog,
    listData,
  } = useEmployeeImprest({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.employeeImprest);
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "employee",
        label: "EMPLOYEE",
        sortable: false,
        render: (value, all) => (
          <div>
            {all?.employee?.name} <br />
            {all?.employee?.emp_code}
          </div>
        ),
      },

      {
        key: "LOCATION",
        label: "LOCATION",
        sortable: false,
        render: (value, all) => <div>{all?.employee?.location?.name}</div>,
      },
      {
        key: "grade",
        label: "GRADE/CADRE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.employee?.grade?.code} / {all?.employee?.cadre?.code}
          </div>
        ),
      },
      {
        key: "sub_department",
        label: "DEPT &SUB-DEPT",
        sortable: false,
        render: (value, all) => (
          <div>
            {all?.employee?.department?.name}/
            {all?.employee?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "update",
        label: "LAST UPDATE",
        sortable: false,
        render: (temp, all) => <div>{all?.updatedAtText}</div>,
      },
      {
        key: "balance",
        label: "BALANCE",
        sortable: false,
        render: (temp, all) => <div>{getCurrency(all?.currency)}{all?.balance}</div>,
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
              <InfoOutlined fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    handleViewDetails,
    handleEdit,
    isCalling,
    type,
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
    type,
  ]);

  const renderDropDownType = useMemo(() => {
    return (
      <CustomSelectField
        label={"Currency"}
        value={type}
        handleChange={(value) => {
          setType(value);
          sessionStorage.setItem("currency", value);
        }}
      >
        <MenuItem value="INR">₹</MenuItem>
        <MenuItem value="USD">$</MenuItem>
        <MenuItem value="EUR">€</MenuItem>
      </CustomSelectField>
    );
  }, [type]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Employee Imprest List</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              aria-owns={createDD ? "createDD" : undefined}
              aria-haspopup="true"
              onClick={handleAddCandidate}
              className={"createBtn"}
            >
              Add Record
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
            <Menu
              id="createDD"
              anchorEl={createDD}
              open={Boolean(createDD)}
              onClose={handleClosedownloadCL}
            >
              <MenuItem
                onClick={() => {
                  toggleExtendDialog();
                }}
              >
                Employee Return
              </MenuItem>
              <MenuItem
                onClick={() => {
                  toggleTraineeDialog();
                }}
              >
                Account Reconciliation
              </MenuItem>
            </Menu>
          </div>
        </div>
        <ReturnEmpDialog
          listData={listData}
          isOpen={isExtendDialog}
          handleToggle={toggleExtendDialog}
        />
        <AccountDialog
          listData={listData}
          isOpen={isTraineeDialog}
          handleToggle={toggleTraineeDialog}
        />
        <div className={styles.yearFlex}>
          <div className={styles.down}>{renderDropDownType}</div>
          {/* <div className={styles.rightFlex}>
            <ButtonBase className={styles.download} onClick={handleCsvDownload}>
              DOWNLOAD
            </ButtonBase>
          </div> */}
        </div>

        <div style={{ marginTop: "30px" }}>
          <div>
            <FilterComponent
              is_progress={isFetching}
              filters={configFilter}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            />
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
    </div>
  );
};

export default EmployeeImprest;
