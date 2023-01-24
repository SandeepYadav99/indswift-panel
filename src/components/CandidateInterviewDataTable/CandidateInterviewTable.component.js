/**
 * Created by charnjeetelectrovese@gmail.com on 6/26/2020.
 */
import React, { Component, useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  IconButton,
  MenuItem,
  Slide,
  withStyles,
} from "@material-ui/core";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import StatusPill from "../Status/StatusPill.component";
import Constants from "../../config/constants";
import { useSelector } from "react-redux";
import FilterComponent from "../Filter/Filter.component";
import useCandidateInterviewTable from "./CandidateInterviewTable.hook";
import { Close } from "@material-ui/icons";
import CustomTextField from "../FormFields/TextField/TextField.component";
import CustomSelectField from "../FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../FormFields/DatePicker/CustomDatePicker";

const CandidateInterviewTable = ({}) => {
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
    toggleProductDialog,
    handleCheckbox,
    selected,
  } = useCandidateInterviewTable({});
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.candidate);
  const closeSchedulePopUp = () => {
    setIsOpenPopUp(false);
  };
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback(
    (data) => {
      const selectedIndex = selected.findIndex((sel) => sel.id === data.id);
      return (
        <div className={styles.flex}>
          <Checkbox
            disabled={false}
            onChange={() => handleCheckbox(data)}
            checked={selectedIndex >= 0}
            value="secondary"
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
      );
    },
    [handleCheckbox, selected]
  );

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "SKU Code",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "name",
        label: "Candidate",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.name} <br />
            {all?.email}
          </div>
        ),
      },
      {
        key: "createdAt",
        label: "Added Date",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAtText}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div>
            <StatusPill status={all?.status} />
          </div>
        ),
      },
      {
        key: "resume",
        label: "Resume",
        sortable: false,
        render: (temp, all) => (
          <div>
            <a href={all.resume} target={"_blank"}>
              Resume
            </a>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
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
    data,
    currentPage,
    data,
  ]); // allData,

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderWrapperContainer}>
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={[]}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <br />
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>

        <div className={styles.stickBottom}>
          <div className={styles.RequestShortlistWrapper}>
            <div>
              <p className={styles.heading3}>2 Candidate Selected</p>
            </div>
            <div className={styles.SlidebtnWrapper2}>
              <ButtonBase
                onClick={() => {
                  console.log("insisde");
                  setIsOpenPopUp(true);
                }}
                className={styles.createBtn}
              >
                SCHEDULE INTERVIEW
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      {isOpenPopUp && (
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          keepMounted
          TransitionComponent={Transition}
          open={isOpenPopUp}
          onClose={closeSchedulePopUp}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // classes={{paper: classes.dialog}}
        >
          <div className={styles.InterviewPopUpWrapper}>
            <div className={styles.closeWrap}>
              <Close
                style={{ cursor: "pointer" }}
                onClick={closeSchedulePopUp}
              ></Close>
            </div>

            <div className={styles.loginSignupText}>
              <h1 className={styles.headingText}>Schedule Interview</h1>
              <div className={styles.newLine} />
            </div>
            <div>
              <p>Please fill the below details to schedule the interview</p>
            </div>
            <div className={"formFlex2"}>
              <div className={"formGroup1"}>
                <CustomDatePicker
                  clearable
                  label={"Date"}
                  // minDate={new Date()}
                  // onChange={(date) => {
                  //   changeTextData(date, "effective_date");
                  // }}
                  // value={form?.effective_date}
                  // isError={errorData?.effective_date}
                />
              </div>
              <div className={"formGroup1"}>
                <CustomDatePicker
                  clearable
                  label={"D.O.B"}
                  // minDate={new Date()}
                  // onChange={(date) => {
                  //   changeTextData(date, "effective_date");
                  // }}
                  // value={form?.effective_date}
                  // isError={errorData?.effective_date}
                />
              </div>
            </div >
            <div className={"formFlex2"}>
              <div className={"formGroup1"}>
                <CustomSelectField
                  // isError={errorData?.vacancy_type}
                  // errorText={errorData?.vacancy_type}
                  label={"Sequence Rounds"}
                  // value={form?.vacancy_type}
                  // handleChange={(value) => {
                  //   changeTextData(value, "vacancy_type");
                  // }}
                >
                  <MenuItem value="male">1,2,3</MenuItem>
                  <MenuItem value="female">2</MenuItem>
                </CustomSelectField>
              </div>
              <div className={"formGroup1"}>
                <CustomSelectField
                  // isError={errorData?.vacancy_type}
                  // errorText={errorData?.vacancy_type}
                  label={"Mode"}
                  // value={form?.vacancy_type}
                  // handleChange={(value) => {
                  //   changeTextData(value, "vacancy_type");
                  // }}
                >
                  <MenuItem value="male">abc</MenuItem>
                  <MenuItem value="female">xyz</MenuItem>
                </CustomSelectField>
              </div>
            </div>
            <div style={{width:'100%'}}>
            <div className={"formGroup file_Wrapper"}>
              <CustomTextField
                // isError={errorData?.name}
                // errorText={errorData?.name}
                label={"Residence Number (with STD code)"}
                // value={form?.name}
                // onTextChange={(text) => {
                //   changeTextData(text, "name");
                // }}
                // onBlur={() => {
                //   onBlurHandler("name");
                // }}
              />
            </div>
            </div>
            
            <div className={styles.cleckboxWrapper}>
              <div className={styles.checkBox}>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />{" "}
                <label htmlFor="vehicle1"> Send Email Invite to Candidates</label>
                <br />
              </div>
              <div className={styles.checkBox}>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />{" "}
                <label htmlFor="vehicle1"> Send Email Invite to Interview Panalist</label>
                <br />
              </div>
            </div>

            <div className={styles.confirmedWrapper}>
              <ButtonBase className={styles.createBtn}>SCHEDULE</ButtonBase>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CandidateInterviewTable;
