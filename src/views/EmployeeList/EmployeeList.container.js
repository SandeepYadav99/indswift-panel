import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase, Menu } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, CloudUpload, InfoOutlined, CloudDownload, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import FilterComponent from "../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import useEmployeeList from "./EmployeeListHook";
import StatusPill from "../../components/Status/StatusPill.component";
import CreateView from "./Employee.view";
import UploadCsvDialog from "./components/UploadCsv/UploadCsvDialog.view";
import CPCDialogView from "./components/CPCDialog/CPCDialog.view";
import OnBoardDialog from "./components/OnBoardPopUp/OnBoardDialog.view";
import TraineeDialog from "./components/TraineePopUp copy/TraineeDialog.view";

const EmployeeList = ({}) => {

  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    handleViewUpdate,
    editData,
    isSidePanel,
    isCalling,
    configFilter,
    toggleCsvDialog,
    isCsvDialog,
    handleCsvUpload,
    handleCreate,
    isCPCDialog,
    toggleCPCDialog,
    handleCPCUpload,
    handleAddCandidate,
    createDD,
    handleClosedownloadCL,
    handleCandidateMenu,
    handleCsvDownload,
    isExtendDialog,
    toggleExtendDialog,
    isTraineeDialog,
    toggleTraineeDialog,
    listData
  } = useEmployeeList({});

  const {
    data,
    all: allData,
    currentPage,
      total,
    is_fetching: isFetching,
  } = useSelector((state) => state.employee);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
            <span>{obj?.emp_code}</span>
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const renderContact = useCallback((obj) => {
    return (
      <div>
        {obj?.contact?.official_contact && (
          <div>
            <strong>(O)</strong> {obj?.contact?.official_contact}
          </div>
        )}
        {obj?.contact?.personal_contact && (
          <div>
            <strong>(P)</strong> {obj?.contact?.personal_contact}
          </div>
        )}
        {obj?.contact?.official_email && (
          <div>
            <strong>(O)</strong> {obj?.contact?.official_email}
          </div>
        )}
        {obj?.contact?.personal_email && (
          <div>
            <strong>(P)</strong> {obj?.contact?.personal_email}
          </div>
        )}
      </div>
    );
  }, []);

  const renderCreateForm = useMemo(() => {
    return (
      <CreateView
        handleDataSave={handleDataSave}
        data={editData}
        handleDelete={handleDelete}
      />
    );
  }, [handleDataSave, editData, handleDelete]);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "Employee Name",
        sortable: true,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "grade",
        label: "Grade/Cadre",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>{all?.grade?.code} / {all?.cadre?.code}</div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>{all?.location.name}</div>
        ),
      },
      {
        key: "designation",
        label: "Designation",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.captialize}>{all?.designation?.name}</div>
        ),
      },
      {
        key: "dept",
        label: "Dept & Sub Dept.",
        sortable: false,
        style: { width: "12%" },
        render: (temp, all) => (
          <div className={styles.captialize}>
            {all?.department?.name}/{all?.sub_department?.name}
          </div>
        ),
      },
      {
        key: "contact",
        label: "Contact",
        sortable: false,
        style: { width: "18%" },
        render: (temp, all) => <div>{renderContact(all)}</div>,
      },
      {
        key: "hod",
        label: "HOD",
        sortable: false,
        render: (temp, all) => <div className={styles.HODUpperCase}>{all?.hod?.hod_name}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        style: { width: "15%" },
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
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={
                ()=>{
                  handleViewUpdate(all)
                }
              }
            >
              <Edit fontSize={"small"} />
            </IconButton>
            {/* onClick={() => { handleEdit(all) }} */}
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
            <span className={styles.title}>Total Employee Records: {total}</span>
            <div className={styles.newLine} />
          </div>
          <div className={styles.btnWrapperGap}>

            <ButtonBase onClick={handleCsvDownload} className={"createBtn"}>
              Download
              <CloudDownload
                  fontSize={"small"}
                  className={"plusIcon"}
              ></CloudDownload>
            </ButtonBase>

            <ButtonBase onClick={toggleCsvDialog} className={"createBtn"}>
              Upload
              <CloudUpload
                fontSize={"small"}
                className={"plusIcon"}
              ></CloudUpload>
            </ButtonBase>
           <div>
            <ButtonBase
              aria-owns={createDD ? "createDD" : undefined}
              aria-haspopup="true"
              onClick={handleAddCandidate}
              className={"createBtn"}
            >
              Create
              <Add fontSize={"small"} className={'plusIcon'}></Add>
            </ButtonBase>
            <Menu
              id="createDD"
              anchorEl={createDD}
              open={Boolean(createDD)}
              onClose={handleClosedownloadCL}
            >
                <MenuItem
                onClick={() => {
                  handleCandidateMenu("NEW");
                }}
              >
                New Employee
              </MenuItem>
              <MenuItem
                onClick={() => {
                  toggleExtendDialog();
                }}
              >
                Onboard Candidate
              </MenuItem>
              <MenuItem
                onClick={() => {
                  toggleTraineeDialog();
                }}
              >
                NAPS Trainee
              </MenuItem>
            </Menu>
          </div>
          </div>
        </div>
        <OnBoardDialog
          listData={listData}
          // candidateId={id}
          isOpen={isExtendDialog}
          handleToggle={toggleExtendDialog}
        />
        <TraineeDialog
        listData={listData}
        isOpen={isTraineeDialog}
        handleToggle={toggleTraineeDialog}/>
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
        handleToggle={handleSideToggle}
        title={"New Employee"}
        open={isSidePanel}
        side={"right"}
      >
        {renderCreateForm}
      </SidePanelComponent>
      <UploadCsvDialog
        isOpen={isCsvDialog}
        handleToggle={toggleCsvDialog}
        handleCsvUpload={handleCsvUpload}
      />
      <CPCDialogView
          isOpen={isCPCDialog}
          handleToggle={toggleCPCDialog}
          handleCsvUpload={handleCPCUpload}
      />
    </div>
  );
};
{/*<ButtonBase onClick={toggleCPCDialog} className={"createBtn"}>*/}
{/*  Upload{" "}*/}
{/*  <CloudUpload*/}
{/*      fontSize={"small"}*/}
{/*      className={"plusIcon"}*/}
{/*  ></CloudUpload>*/}
{/*</ButtonBase>*/}
export default EmployeeList;
