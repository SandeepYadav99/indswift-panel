/**
 * Created by charnjeetelectrovese@gmail.com on 6/26/2020.
 */
import React, { Component, useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  withStyles,
} from "@material-ui/core";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import StatusPill from "../Status/StatusPill.component";
import Constants from "../../config/constants";
import { useSelector } from "react-redux";
import FilterComponent from "../Filter/Filter.component";
import useCandidateShortlistTable from "./CandidateTable.hook";
import { Close } from "@material-ui/icons";

const CandidateShortlistTable = ({}) => {
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
  } = useCandidateShortlistTable({});
  const [isOpen, setIsOpen] = useState(false);

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.candidate);
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
  const handleInterviewClosePop = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div className={"plainPaper"}>
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

        <div className={styles.stickbottom}>
          <div className={styles.RequestShortlistWrapper}>
            <div>
              <p className={styles.heading3}>2 Candidate Selected</p>
            </div>
            <div className={styles.SlidebtnWrapper2}>
              <div className={styles.editBtn2}>
                <ButtonBase
                  className={styles.edit}
                  onClick={() => {
                    console.log("insisde");
                    setIsOpen(true);
                  }}
                >
                  REJECTED
                </ButtonBase>
                <ButtonBase className={styles.edit}>SHORTLIST</ButtonBase>
              </div>
              <div>
                <ButtonBase className={styles.createBtn}>
                  REQUEST SHORTLIST
                </ButtonBase>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Dialog
          keepMounted
          TransitionComponent={Transition}
          open={isOpen}
          onClose={handleInterviewClosePop}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // classes={{paper: classes.dialog}}
        >
          <div className={styles.InterviewPopUpWrapper}>
            <div className={styles.closeWrap}>
              <Close
                style={{ cursor: "pointer" }}
                onClick={handleInterviewClosePop}
              ></Close>
            </div>

            <div className={styles.loginSignupText}>
              <h1 className={styles.headingText}>Confirm Action</h1>
              <div className={styles.newLine} />
            </div>
            <div>
              <p>Please confirm your action on the platform.</p>
            </div>
            <div className={styles.descriptionStrong}>
              <p>
                Are you sure you want to{" "}
                <strong>REJECT CANDIDATES - 20 CANDIDATES</strong>. The
                candidates once rejected will be sent automatic email regarding
                rejection.
              </p>
            </div>
            <div className={styles.confirmedWrapper}>
              <ButtonBase className={styles.createBtn}>CONFIRMED</ButtonBase>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CandidateShortlistTable;
